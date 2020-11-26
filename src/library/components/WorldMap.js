import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import config from 'tinytown/config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { watchLocation, stopWatchingLocation } from 'library/apis/geolocation'
import { connect } from 'react-redux';
import { offCamera, updateUserLocation } from '../../redux/actions';
import _ from 'lodash';
import R from 'res/R';

const { MapView, Camera } = MapboxGL;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const WorldMap = (props) => {

  console.log('rerender')

  useEffect(() => {
    props.hasPermission ? watchLocation() : null
    return () => {
      stopWatchingLocation()
    }
  }, [])

  const regionChangeHandler = (event) => {
    if (event.properties.isUserInteraction && props.onCamera) {
      // TODO - Make more precise to handle true offscreen cases
      props.offCamera()
    }
  }
  
  return (
    <>
    <MapView
      animated={true}
      style={styles.map}
      styleURL={'mapbox://styles/alfalcon/cka1xbje712931ipd6i5uxam8'}
      logoEnabled={false}
      attributionEnabled={false}
      onRegionWillChange={(e) => regionChangeHandler(e)} 
      >
        {props.hasPermission ? <MapboxGL.UserLocation>
          <MapboxGL.SymbolLayer
            id={'customUserLocationIcon'}
            style={{
              iconAllowOverlap: true,
              iconImage: R.images.userMarker,
              iconSize: 0.4,
              iconRotate: 0 || 0
              // heading
            }}
            minZoomLevel={1}
          />
        </MapboxGL.UserLocation> : null}
        <Camera
          animationMode='flyTo'
          centerCoordinate={props.onCamera ? [props.userLocation.longitude, props.userLocation.latitude] : undefined}
          zoomLevel={props.onCamera ? 12 : undefined}
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
    onCamera: state.location.onCamera,
    hasPermission: state.location.hasPermission,
  }
}

export default connect(mapStateToProps, { offCamera, updateUserLocation })(WorldMap)
