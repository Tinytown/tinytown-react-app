import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import config from 'tinytown/config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import CompassHeading from 'react-native-compass-heading';
import { watchLocation, stopWatchingLocation, onCameraCheck } from '../apis/geolocation'
import { storeMultiple, getMultiple } from '../apis/storage'
import { connect } from 'react-redux';
import { setLoaded, updateUserVisible  } from '../../redux/actions';
import useMapCamera from '../hooks/useMapCamera'
import R from 'res/R';

const { MapView, Camera } = MapboxGL;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const WorldMap = (props) => {
  const cameraRef = useRef(null)
  const mapRef = useRef(null)
  const [mapRendered, setMapRendered] = useState(false)
  const [heading, setHeading] = useState(0)
  const [camera, setCamera, flyTo] = useMapCamera();
  flyTo(props.goToUser, props.userLocation, cameraRef.current)

  // App launches || quits
  useEffect(() => {
    let isMounted = true;
    // Load static map and camera props
    getMultiple(['cameraCenter', 'cameraZoom', 'userVisible']).then((res) => {
      if (isMounted && res.cameraCenter) {
        setCamera({ 
          center: res.cameraCenter, 
          zoom: res.cameraZoom, 
          movedByUser: false })
        props.updateUserVisible(res.userVisible)
      }
    })

    mapLoadingHandler()
    
    return () => {
      isMounted = false;
      props.setLoaded('map', false)
    }
  }, [])

  // App is active || background
  useEffect(() => {
    if (props.appState.active) {
      // Start compass and location tracking
      props.userLocation ? watchLocation() : null
      CompassHeading.start(10, heading => {
        setHeading(heading)
      });
    }
    
    if (!props.appState.active) {
      // Store user location and camera props
      if (props.userLocation) {
        const data = [
        ['userLocation', props.userLocation],
        ['cameraCenter', camera.center],
        ['cameraZoom', camera.zoom],
        ['userVisible', props.userVisible]
        ];
        storeMultiple(data);
        // Stop compass and location tracking
        stopWatchingLocation();
      }
      CompassHeading.stop();
    }
  }, [props.appState.active])

  // Check if user is off screen
  const updateUserVisibility = (visibleBounds) => {
    if (props.isSignedIn) {
      const userVisible = onCameraCheck(props.userLocation, visibleBounds)
      userVisible !== props.userVisible ? props.updateUserVisible(userVisible) : null
    }
  }
  
  // Handle camera change
  const regionChangeHandler = async ({ properties, geometry }) => {
    if (properties.isUserInteraction) {
      setCamera({ 
        center: geometry.coordinates, 
        bounds: properties.visibleBounds, 
        zoom: properties.zoomLevel,
        movedByUser: true
      })
      updateUserVisibility(properties.visibleBounds)
    }
  }
  
  // Handle user location change
  useEffect(() => {
    mapRef.current.getVisibleBounds()
      .then((visibleBounds) => updateUserVisibility(visibleBounds))
      .catch((err) => console.log(err))
  }, [props.userLocation])

  // Extra logic to handle loading edge cases
  const mapLoadingHandler = (mapFinishedRendering) => {
    if (mapFinishedRendering) {
      setMapRendered(true)
    }

    if (mapRendered || mapFinishedRendering) {
      props.setLoaded('map', true)
    }
  }

  return (
    <>
      <MapView
        ref={mapRef}
        animated={true}
        style={styles.map}
        styleURL={'mapbox://styles/alfalcon/cka1xbje712931ipd6i5uxam8'}
        logoEnabled={false}
        compassEnabled={false}
        attributionEnabled={false}
        onRegionIsChanging={(e) => regionChangeHandler(e)}
        onDidFinishRenderingMapFully={!props.appState.loaded.map ? () => mapLoadingHandler(true) : null}
        >
          {props.userLocation ? <MapboxGL.UserLocation
            animated={true}
            visible={true}
          >
            <MapboxGL.SymbolLayer
              id={'customUserLocationIcon'}
              style={{
                iconAllowOverlap: true,
                iconIgnorePlacement: true,
                iconImage: R.images.userMarker,
                iconSize: 0.4,
                iconRotate: heading || 0
              }}
              minZoomLevel={1}
            />
          </MapboxGL.UserLocation> : null}
        <Camera
          ref={cameraRef}
          animationDuration={!props.appState.loaded.map ? 0 : 2000}
          animationMode='flyTo'
          centerCoordinate={!props.appState.loaded.map ? camera.center : undefined}
          zoomLevel={!props.appState.loaded.map ? camera.zoom : undefined}
          >
        </Camera>
      </MapView>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%'
  }
});

const mapStateToProps = (state) => ({
    userLocation: state.location.user,
    goToUser: state.location.goToUser,
    userVisible: state.location.userVisible,
    appState: state.app,
    isSignedIn: state.auth.isSignedIn,
})

export default connect(mapStateToProps, { setLoaded, updateUserVisible })(WorldMap)
