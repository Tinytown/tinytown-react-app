import React, { useRef } from 'react';
import config from 'config/env.config.js';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { create } from 'library/utils/normalize.js';
import { connect } from 'react-redux';
import { updateUserVisible, updateUserLocation  } from 'rdx/actions';
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
    <>
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
    </>
  );
};

const styles = create({
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
