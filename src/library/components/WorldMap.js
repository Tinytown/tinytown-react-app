import React, { useEffect, useState, useRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import config from 'tinytown/config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import defaultStaticMap from '../../res/img/defaultStaticMap'
import CompassHeading from 'react-native-compass-heading';
import { watchLocation, stopWatchingLocation } from '../apis/geolocation'
import { storeData, getData } from '../apis/storage'
import { connect } from 'react-redux';
import { setCamera, setLoaded } from '../../redux/actions';
import R from 'res/R';

const { MapView, Camera } = MapboxGL;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);
const defaultSettings = {
  centerCoordinate: [-93.26392, 44.98459],
  zoomLevel: 12.83,
}

const WorldMap = (props) => {
  const map = useRef(null)
  const [staticMap, setStaticMap] = useState(null)
  const [mapRendered, setMapRendered] = useState(false)
  const [heading, setHeading] = useState(0)
  
  // App launches / quits
  useEffect(() => {
    let mounted = true;
    // Load static map image while map is loading
    getData('staticMap').then((imageData) => {
      props.setLoaded('staticMap', true)
      if (mounted) {
        imageData ? setStaticMap(imageData) : setStaticMap(defaultStaticMap);
      }
    })
    mapLoadingHandler()
    
    return () => {
      mounted = false;
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
    if (!props.appState.active && props.location.user.latitude) {
      // Stop compass and location tracking
      stopWatchingLocation()
      CompassHeading.stop()
      // Save location and static map
      storeData(props.location.user, 'userLocation')
      saveStaticImage()
    }
  }, [props.appState.active])

  const saveStaticImage = async () => {
    const imageData = await map.current.takeSnap(false)
    storeData(imageData, 'staticMap')
  }

  const regionChangeHandler = (event) => {
    if (event.properties.isUserInteraction && props.location.onCamera) {
      // TODO - Make more precise to handle true offscreen cases
      props.setCamera(false)
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
    {!props.appState.loaded.map ? <Image source={{uri: staticMap}} style={styles.map}/> : null }
    <MapView
      animated={true}
      style={styles.map}
      styleURL={'mapbox://styles/alfalcon/cka1xbje712931ipd6i5uxam8'}
      logoEnabled={false}
      compassEnabled={false}
      attributionEnabled={false}
      onRegionWillChange={(e) => regionChangeHandler(e)}
      onDidFinishRenderingMapFully={!props.appState.loaded.map ? () => mapLoadingHandler(true) : null}
      ref={map}
      >
        {props.location.hasPermission ? <MapboxGL.UserLocation
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
          defaultSettings={defaultSettings}
          animationDuration={!props.appState.loaded.map ? 0 : 2000}
          animationMode='flyTo'
          centerCoordinate={props.location.onCamera ? [props.location.user.longitude, props.location.user.latitude] : undefined}
          zoomLevel={props.location.onCamera ? 12 : undefined}
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
