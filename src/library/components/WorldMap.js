import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import config from 'tinytown/config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import CompassHeading from 'react-native-compass-heading';
import { watchLocation, stopWatchingLocation } from '../apis/geolocation'
import { storeMultiple, getMultiple } from '../apis/storage'
import { connect } from 'react-redux';
import { setCamera, setLoaded } from '../../redux/actions';
import R from 'res/R';

const { MapView, Camera } = MapboxGL;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const WorldMap = (props) => {
  const [mapRendered, setMapRendered] = useState(false)
  const [heading, setHeading] = useState(0)
  
  // App launches / quits
  useEffect(() => {
    let isMounted = true;
    // Load static map and camera coords
    getMultiple(['cameraCenter', 'cameraZoom']).then((res) => {
      if (isMounted && res.cameraCenter) {
        props.setCamera(res.cameraCenter, res.cameraZoom)
      }
    })

    mapLoadingHandler()
    
    return () => {
      isMounted = false;
      props.setLoaded('map', false)
    }
  }, [])

  // App goes in the background
  useEffect(() => {
    if (props.appState.active && props.isSignedIn) {
      // Start compass and location tracking
      watchLocation()
      CompassHeading.start(10, heading => {
        setHeading(heading)
      });
    }
    if (!props.appState.active && props.location.user) {
      // Store user location and camera props
      const data = [
        ['userLocation', props.location.user],
        ['cameraCenter', props.location.camera.center],
        ['cameraZoom', props.location.camera.zoom]
      ];
      storeMultiple(data);
      // Stop compass and location tracking
      stopWatchingLocation();
      CompassHeading.stop();
    }
  }, [props.appState.active])

  const regionChangeHandler = async (event) => {
    if (event.properties.isUserInteraction) {
      props.setCamera(event.geometry.coordinates, event.properties.zoomLevel)
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
        onRegionDidChange={(e) => regionChangeHandler(e)}
        onDidFinishRenderingMapFully={!props.appState.loaded.map ? () => mapLoadingHandler(true) : null}
        >
          {props.location.user ? <MapboxGL.UserLocation
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
          animationDuration={!props.appState.loaded.map ? 0 : 2000}
          animationMode='flyTo'
          centerCoordinate={
            !props.appState.loaded.map || !props.location.camera.isUserInteraction ? props.location.camera.center : undefined}
          zoomLevel={
            !props.appState.loaded.map || !props.location.camera.isUserInteraction ? props.location.camera.zoom : undefined}
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
    location: state.location,
    appState: state.app,
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(mapStateToProps, { setCamera, setLoaded })(WorldMap)
