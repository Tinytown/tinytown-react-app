import React, { useRef, useState } from 'react';
import { View, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { updateUserVisible, updateUserLocation  } from 'rdx/locationState';
import config from 'config/env.config.js';
import mapConfig from './config';
import { useLocation, useMap, useShouts } from 'library/hooks';
import { renderUser, renderWelcomeSign, renderShouts, renderFog } from './renderContent';
import { COLORS, normalizeStyles } from 'res';

const { MapView, Camera } = MapboxGL;
const { INITIAL_ZOOM } = mapConfig;
MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const World = ({
  userLocation,
  loadingShouts,
  updateUserLocation,
  updateUserVisible,
  children,
  onTouchStart,
}) => {
  // Custom Hooks
  const cameraRef = useRef(null);
  const [heading] = useLocation(updateUserLocation);
  const [
    camera,
    onRegionIsChangingHandler,
    mapRendered,
    setMapRendered,
  ] = useMap(cameraRef.current, updateUserVisible);
  const [shouts] = useShouts(userLocation);
  // Used on Android due to performance issues
  const [hideMarkers, setHideMarkers] = useState(true);

  // Map Content
  const userMarker = renderUser(heading);
  const fogOfWar = renderFog(userLocation, camera.zoom);
  const welcomeSign = renderWelcomeSign();
  const showWelcomeSign = !userLocation && camera.zoom === INITIAL_ZOOM;
  const shoutMarkers = renderShouts(shouts, userLocation, camera.zoom);
  const showShouts = userLocation && (Platform.OS === 'android' ? !hideMarkers : true) && !loadingShouts;

  const onRegionDidChangeHandler = ({ properties, geometry }) => {
    // Extra call for Android due to bug in onRegionIsChanging
    if (Platform.OS == 'android') {
      onRegionIsChangingHandler({ properties, geometry });
    }
    setHideMarkers(false);
  };

  return (
    <View style={styles.landscape}>
      <MapView
        animated={true}
        style={styles.map}
        styleURL={config.MAPBOX_STYLE_URL}
        logoEnabled={false}
        compassEnabled={false}
        attributionEnabled={false}
        onRegionWillChange={({ properties: { isUserInteraction } }) => !isUserInteraction && setHideMarkers(true)}
        onRegionDidChange={onRegionDidChangeHandler}
        onRegionIsChanging={onRegionIsChangingHandler}
        onDidFinishRenderingMapFully={() => setMapRendered(true)}
        onTouchStart={onTouchStart}
      >
        {userLocation && userMarker}
        {userLocation && fogOfWar}
        {showWelcomeSign && welcomeSign}
        {showShouts && shoutMarkers}
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
        {children}
      </SafeAreaView>
    </View>

  );
};

const styles = normalizeStyles({
  landscape: {
    flex: 1,
    backgroundColor: COLORS.asphaltGray100,
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
  loadingShouts: state.shouts.loading,
});

export default connect(mapStateToProps, { updateUserVisible, updateUserLocation })(World);
