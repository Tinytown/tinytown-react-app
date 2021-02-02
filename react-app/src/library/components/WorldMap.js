import React, { useRef } from 'react';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { updateUserVisible, updateUserLocation  } from 'rdx/locationState';
import config from 'config/env.config.js';
import { useLocation, useMap } from 'library/hooks';
import { COLORS, IMAGES, normalizeStyles } from 'res';
import ShoutsTemp from './ShoutsTemp';

const { MapView, Camera } = MapboxGL;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const WorldMap = ({ userLocation, updateUserLocation, updateUserVisible, children }) => {
  const cameraRef = useRef(null);
  const mapRef = useRef(null);
  const [heading] = useLocation(updateUserLocation);
  const [
    camera,
    regionChangeHandler,
    mapRendered,
    setMapRendered,
  ] = useMap(cameraRef.current, mapRef.current, updateUserVisible);

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
        {userLocation && <MapboxGL.UserLocation
          animated={true}
          visible={true}
        >
          <MapboxGL.SymbolLayer
            id={'customUserLocationIcon'}
            style={{
              iconAllowOverlap: true,
              iconIgnorePlacement: true,
              iconImage: IMAGES.userMarker,
              iconSize: 0.4,
              iconRotate: heading || 0,
            }}
            minZoomLevel={1}
          />
        </MapboxGL.UserLocation>}
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
        <ShoutsTemp userLocation={userLocation} />
        {children}
      </SafeAreaView>
    </View>

  );
};

const styles = normalizeStyles({
  landscape: {
    flex: 1,
    backgroundColor: COLORS.asphaltGray,
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  userLocation: state.location.user,
});

export default connect(mapStateToProps, { updateUserVisible, updateUserLocation })(WorldMap);
