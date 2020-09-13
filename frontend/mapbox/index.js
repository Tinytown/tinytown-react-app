import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import config from '../../config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { CrosshairsIcon } from '../assets/svg';
import userMarker from '../assets/img/user_marker.png';
import Geolocation from 'react-native-geolocation-service';
import {bindMethods} from '../component-ops';

const {MapView, Camera} = MapboxGL;

MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  landscape: {
    height: '100%'
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1
  },
  containerCurrentLocation: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonCurrentLocation: {
    backgroundColor: '#000000',
    height: 48,
    width: 180,
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
  textCurrentLocation: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: 'white'
  },
  messageCurrentLocation: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconCurrentLocation: {
    marginRight: 5
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);

    bindMethods(['goToCurrentLocation', 'onRegionDidChange', 'updateLocation'], this);
    this.state = {
      userLocation: null,
      cameraLocation: null,
      zoom: 14,
      isMapLoading: false, // axiom: loading only applies to an existing map
      followUser: false,
      haveLocationPermission: false
    };

    this.map = React.createRef();
  }

  setUserCoordinatesFirstTime({longitude, latitude}) {
    this.setState({
      followUser: true,
      haveLocationPermission: true,
      userLocation: {
        latitude,
        longitude
      }
    });
  }
  
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  getUpdatedCenter() {
    return this.map.current.getCenter();
  }

  getUpdatedZoom() {
    return this.map.current.getZoom();
  }

  cameraHasMoved = (cameraCoords, locationCoords) => {
    const threshold = 1 * Math.pow(10, -14);
    return Math.abs(cameraCoords.latitude - locationCoords.latitude > threshold) || Math.abs(cameraCoords.longitude - locationCoords.longitude > threshold);
  }

  onRegionDidChange(event) {
    const [cameraLongitude, cameraLatitude] = event.geometry.coordinates;
    let followUser = this.state.followUser;
    const cameraLocation = {
      longitude: cameraLongitude,
      latitude: cameraLatitude
    }
    if (followUser && this.cameraHasMoved(cameraLocation, this.state.userLocation)) {
      followUser = false;
    }
    this.setState({
      followUser,
      zoom: event.properties.zoomLevel,
      cameraLocation
    });
  }

  goToCurrentLocation() {
    this.state.haveLocationPermission ?
      this.setState({
        followUser: true,
        cameraLocation: {
          ...this.state.userLocation
        }
      }) :
      this.firstTimeCurrentLocation() // assumption: only on first time is currentLocation in state null
  }

  firstTimeCurrentLocation() {
    const doUpdates = () => {
      this.setState({
        followUser: true,
        haveLocationPermission: true
      })
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

  updateLocation(event) {
    if (!event) {
      return;
    }
    const {latitude, longitude} = event.coords;
    this.setState({
      userLocation: {
        longitude,
        latitude
      }
    });
  }

  render() {
    /* 
      the landscape view here is due to me not knowing a better alternative to ensure map takes full page size.
      also, tried adding this as a proper jsx comment next to the respective view, but to no avail.
    */
    const {zoom, followUser, haveLocationPermission, cameraLocation} = this.state;
    return (
      <View style={styles.landscape}>
        <View style={styles.page}>
          <View style={styles.container}>
            <MapView
                animated={true}
                style={styles.map}
                styleURL={'mapbox://styles/alfalcon/cka1xbje712931ipd6i5uxam8'}
                logoEnabled={false}
                attributionEnabled={false}
                onRegionDidChange={this.handleRegionChange}
                ref={this.map}
            >
              <MapboxGL.UserLocation
                visible={haveLocationPermission}
                animate={haveLocationPermission}
                onUpdate={this.updateLocation}
              >
                <MapboxGL.SymbolLayer
                  id={'customUserLocationIcon'}
                  style={{
                    iconAllowOverlap: true,
                    iconImage: userMarker,
                    iconSize: 0.25
                  }}
                  minZoomLevel={1}
                />
              </MapboxGL.UserLocation>
              <Camera
                zoomLevel={zoom}
                followUserLocation={followUser}
                followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading}
                centerCoordinate={cameraLocation ? [cameraLocation.longitude, cameraLocation.latitude] : null}
                >
              </Camera>
            </MapView>
            <View style={styles.containerCurrentLocation}>
                <TouchableOpacity
                  style={styles.buttonCurrentLocation}
                  onPress={this.goToCurrentLocation}
                >
                  <View style={styles.messageCurrentLocation}>
                    <CrosshairsIcon style={styles.iconCurrentLocation} />
                    <Text style={styles.textCurrentLocation}>Go to my location</Text>  
                  </View>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </View>
    );
  }
}
