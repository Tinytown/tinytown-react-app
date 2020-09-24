import React, { Component } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import config from 'tinytown/config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import userMarker from 'res/img/user_marker.png';
import Geolocation from 'react-native-geolocation-service';
import {bindMethods} from 'library/utils/component-ops';
import FAB from 'library/components/fab';
import _ from 'lodash';
import CompassHeading from 'react-native-compass-heading';

const {MapView, Camera} = MapboxGL;

MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  landscape: {
    height: '100%'
  },
  map: {
    height: '100%',
    width: '100%',
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    top: StaticSafeAreaInsets.safeAreaInsetsTop,
    alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  }
});

const degreeUpdateRate = 3;

const coordinateThreshold = 1 * Math.pow(10, -14);

export default class Map extends Component {
  constructor() {
    super();

    bindMethods(['goToLocation', 'onRegionDidChange', 'goToLocationNonFirstHelper', 'goToLocationFirstHelper', 'onDidFinishRenderingFrameFully'], this);
    this.state = {
      userLocation: null,
      heading: null,
      zoomLevel: null,
      isMapLoading: false, // axiom: loading only applies to an existing map
      followUser: false,
      haveLocationPermission: false,
      goingToLocation: false
    };

    this.camera = React.createRef();
    
    this.defaultZoomLevel = 14;

    this.updateLocation = _.throttle(event => {
      if (!event) {
        return;
      }
      const {latitude, longitude} = event.coords;
      const latitudeChanged = this.state.userLocation ? Math.abs(latitude - this.state.userLocation.latitude) > coordinateThreshold : true;
      const longitudeChanged = this.state.userLocation ? Math.abs(longitude - this.state.userLocation.longitude) > coordinateThreshold : true;
      if (latitudeChanged || longitudeChanged) {
        this.setState({
          userLocation: {
            longitude,
            latitude,
          }
        });
      }
    }, 50, {trailing: false})

    CompassHeading.start(degreeUpdateRate, heading => {
      this.setState({
        heading
      })
    });
  }
  
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  cameraHasMoved = (coords, otherCoords) => {
    return Math.abs(coords.latitude - otherCoords.latitude > coordinateThreshold) || Math.abs(coords.longitude - otherCoords.longitude > coordinateThreshold);
  }

  onDidFinishRenderingFrameFully() {
    if (this.state.goingToLocation) {
      this.setState({
        goingToLocation: false,
        followUser: true
      });
    }
  }
  
  onRegionDidChange(event) {
    const [cameraLongitude, cameraLatitude] = event.geometry.coordinates;
    let followUser = this.state.followUser;
    if (followUser && this.cameraHasMoved({longitude: cameraLongitude,latitude: cameraLatitude}, this.state.userLocation)) {
      followUser = false;
    }
    this.setState({
      followUser
    });
  }

  goToLocation() {
    this.state.haveLocationPermission ?
      this.goToLocationNonFirstHelper() :
      this.goToLocationFirstHelper()
  }

  goToLocationNonFirstHelper() {
    this.setState(prevState => ({
      goingToLocation: true,
      followUser: false, // disabling followUser is not really necessary with the current follow mode, but it allows flexibility if in future we can change the mode, say, to FollowWithHeading
      cameraCoordinates: [prevState.userLocation.longitude, prevState.userLocation.latitude],
      zoomLevel: this.defaultZoomLevel
    }), () => {
      this.camera.current.setCamera({
        centerCoordinate: this.state.cameraCoordinates,
        zoomLevel: this.state.zoomLevel
      });
    })
  }

  goToLocationFirstHelper() {
    const doUpdates = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('doing first time go to location update');
          this.setState({
            haveLocationPermission: true,
            goingToLocation: true,
            cameraCoordinates: [longitude, latitude],
            zoomLevel: this.defaultZoomLevel
          });
        },
        error => {
          console.log(error.code, error.message); // incorporate actual error-handling mechanism in the future (e.g., Rollbar)
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      );
    };
    if (isAndroid) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Request',
          'message': 'Tinytown needs access to your location'
        }
      )
      .then(status => {
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          doUpdates();
        }
      });
      return null;
    }

    // assume iOS
    Geolocation.requestAuthorization('always')
      .then(status => {
        if (status === 'granted') {
          doUpdates();
        }
      });
  }

  render() {
    /* 
      the landscape view here is  e to me not knowing a better alternative to ensure map takes full page size.
      also, tried adding this as a proper jsx comment next to the respective view, but to no avail.
    */
    const {zoomLevel, followUser, haveLocationPermission, goingToLocation, cameraCoordinates, heading} = this.state;
    return (
      <View style={styles.landscape}>
            <MapView
                animated={true}
                style={styles.map}
                styleURL={'mapbox://styles/alfalcon/cka1xbje712931ipd6i5uxam8'}
                logoEnabled={false}
                attributionEnabled={false}
                onRegionDidChange={this.handleRegionChange}
                regionDidChangeDebounceTime={2000}
                onDidFinishRenderingFrameFully={this.onDidFinishRenderingFrameFully}
            >
              {haveLocationPermission ? <MapboxGL.UserLocation
                visible={haveLocationPermission}
                animate={haveLocationPermission}
                onUpdate={this.updateLocation}
              >
                <MapboxGL.SymbolLayer
                  id={'customUserLocationIcon'}
                  style={{
                    iconAllowOverlap: true,
                    iconImage: userMarker,
                    iconSize: 0.4,
                    iconRotate: heading || 0
                  }}
                  minZoomLevel={1}
                />
              </MapboxGL.UserLocation> : null}
              <Camera
                followUserLocation={followUser}
                followUserMode={MapboxGL.UserTrackingModes.Follow}
                ref={this.camera}
                centerCoordinate={cameraCoordinates ? cameraCoordinates : undefined}
                zoomLevel={zoomLevel ? zoomLevel : undefined}
                >
              </Camera>
            </MapView>
            <View style={styles.safeArea} pointerEvents='box-none'>
              <View style={styles.fabContainer}>
                <FAB label='Go to my location' theme='green' icon='crosshairs' onPress={this.goToLocation} disabled={goingToLocation}/>
              </View>
            </View>
      </View>
    );
  }
}
