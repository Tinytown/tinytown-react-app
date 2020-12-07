import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import config from 'tinytown/config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import CompassHeading from 'react-native-compass-heading';
import { watchLocation, stopWatchingLocation, onCameraCheck } from '../apis/geolocation'
import { storeMultiple, getMultiple } from '../apis/storage'
import { connect } from 'react-redux';
import { setLoaded, updateUserVisible  } from '../../redux/actions';
import useCamera from '../hooks/useCamera'
import R from 'res/R';

const { MapView, Camera } = MapboxGL;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const WorldMap = (props) => {
  const [mapRendered, setMapRendered] = useState(false)
  const [heading, setHeading] = useState(0)
  const [camera, setCamera] = useCamera();
  const cameraRef = useRef(null)
  
  // App launches / quits
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

  // App is active / background
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

  // Move camera to user's location
  useEffect(() => {
    let isMounted = true;
    if (props.goToUser && isMounted) {
      cameraRef.current?.flyTo(props.userLocation, 1000)
      setCamera({ 
        center: props.userLocation, 
        zoom: 12, 
        movedByUser: false})
    }
    return () => {
      isMounted = false;
    }
  }, [props.goToUser])

  // Handle camera change
  const regionChangeHandler = async ({ properties, geometry }) => {
    if (properties.isUserInteraction) {
      setCamera({ 
        center: geometry.coordinates, 
        bounds: properties.visibleBounds, 
        zoom: properties.zoomLevel,
        movedByUser: true
      })

      // Check if user is off screen
      if (props.isSignedIn) {
        const userVisible = onCameraCheck(props.userLocation, properties.visibleBounds)
        userVisible !== props.userVisible ? props.updateUserVisible(userVisible) : null
      }
    }
  }

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

const mapStateToProps = (state) => {
  return { 
    userLocation: state.location.user,
    goToUser: state.location.goToUser,
    userVisible: state.location.userVisible,
    appState: state.app,
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(mapStateToProps, { setLoaded, updateUserVisible })(WorldMap)
