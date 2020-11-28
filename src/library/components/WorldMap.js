import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import config from 'tinytown/config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import CompassHeading from 'react-native-compass-heading';
import { watchLocation, stopWatchingLocation } from '../apis/geolocation'
import { storeData } from '../apis/storage'
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

  useEffect(() => {
    // App pauses / resumes
    if (props.appState.active) {
      props.isSignedIn ? watchLocation() : null
    } else if (!props.appState.active) {
      stopWatchingLocation()
      storeData(props.location, 'location')
    }

    return () => {
      props.setLoaded('map', false)
    }
    
  }, [props.appState.active])


  const [heading, setHeading] = useState(0)
  useEffect(() => {
    CompassHeading.start(10, heading => {
      setHeading(heading)
    });
    return () => {
      CompassHeading.stop()
    }
  }, [])

  const regionChangeHandler = (event) => {
    if (event.properties.isUserInteraction && props.location.onCamera) {
      // TODO - Make more precise to handle true offscreen cases
      props.setCamera(false)
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
      onRegionWillChange={(e) => regionChangeHandler(e)}
      onDidFinishLoadingMap={() => {!props.appState.loaded.map ? props.setLoaded('map', true) : null}}
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
