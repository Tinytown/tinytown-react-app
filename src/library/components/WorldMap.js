import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import config from 'tinytown/config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import CompassHeading from 'react-native-compass-heading';
import { connect } from 'react-redux';
import { offCamera } from '../../redux/actions';
import R from 'res/R';

const { MapView, Camera } = MapboxGL;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);
const defaultSettings = {
  centerCoordinate: [-93.26392, 44.98459],
  zoomLevel: 12.83,
}

const WorldMap = (props) => {

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
      compassEnabled={false}
      attributionEnabled={false}
      onRegionWillChange={(e) => regionChangeHandler(e)} 
      >
        {props.hasPermission ? <MapboxGL.UserLocation
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

export default connect(mapStateToProps, { offCamera })(WorldMap)
