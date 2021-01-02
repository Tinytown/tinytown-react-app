import React, { useRef } from 'react';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import config from 'config/env.config.js';
import { create } from 'library/utils/normalize.js';
import { updateUserVisible, updateUserLocation  } from 'rdx/locationState';
import { useLocation, useMap } from 'library/hooks';
import RES from 'res';

const { MapView, Camera } = MapboxGL;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const WorldMap = (props) => {
  const cameraRef = useRef(null);
  const mapRef = useRef(null);
  const [heading] = useLocation(props.appState.active, props.updateUserLocation);
  const [camera, regionChangeHandler, mapRendered, setMapRendered] = useMap(props, cameraRef.current, mapRef.current);

  return (
    <View style={styles.landscape}>
      <MapView
        ref={mapRef}
        animated={true}
        style={styles.map}
        styleURL={'mapbox://styles/alfalcon/cka1xbje712931ipd6i5uxam8'}
        logoEnabled={false}
        compassEnabled={false}
        attributionEnabled={false}
        onRegionIsChanging={regionChangeHandler}
        onDidFinishRenderingMapFully={() => setMapRendered(true)}
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
              iconImage: RES.IMAGES.userMarker,
              iconSize: 0.4,
              iconRotate: heading || 0,
            }}
            minZoomLevel={1}
          />
        </MapboxGL.UserLocation> : null}
        <Camera
          ref={cameraRef}
          animationDuration={!mapRendered ? 0 : 2000}
          animationMode='flyTo'
          centerCoordinate={!mapRendered ? camera.center : undefined}
          zoomLevel={!mapRendered ? camera.zoom : undefined}
        >
        </Camera>
      </MapView>
      <SafeAreaView style={styles.safeArea} mode="margin" pointerEvents='box-none'>
        {props.children}
      </SafeAreaView>
    </View>

  );
};

const styles = create({
  landscape: {
    height: '100%',
    backgroundColor: RES.COLORS.asphaltGray,
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

const mapStateToProps = (state) => ({
  userLocation: state.location.user,
  goToUser: state.location.goToUser,
  userVisible: state.location.userVisible,
  appState: state.app,
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { updateUserVisible, updateUserLocation })(WorldMap);
