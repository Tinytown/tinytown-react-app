import React, { Component } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import config from '../../config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
import {bindMethods} from '../component-ops';
import FAB from '../components/fab'

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

export default class Map extends Component {
  constructor(props) {
    super(props);

    bindMethods(['setUserCoordinatesFirstTime', 'updateShow', 'subscribeToUserLocation', 'goToCurrentLocation', 'handleRegionChange', 'setUserCoordinates', 'onDidFinishRenderingMapFully', 'onWillStartRenderingMap'], this);
    this.state = {
      currentLocation: null,
      locationToShow: { // minneapolis to begin with
        latitude: 44.986656,
        longitude: -93.258133
      },
      zoom: 14,
      isMapLoading: false, // axiom: loading only applies to an existing map
    };

    this.map = React.createRef();
  }

  setUserCoordinatesFirstTime(position) {
    const {latitude, longitude} = position.coords;
    this.setState({
      currentLocation: {
        latitude,
        longitude
      },
      locationToShow: {
        latitude,
        longitude
      }
    });
  }

  setUserCoordinates(position) {
    const {latitude, longitude} = position.coords;
    this.setState({
      currentLocation: {
        latitude,
        longitude
      }
    });
  }
  
  subscribeToUserLocation() {
    const updatingLocationParameters = [
      error => {
       console.log(error.code, error.message); // incorporate actual error-handling mechanism in the future (e.g., Rollbar)
     },
     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    ];

    Geolocation.getCurrentPosition(
      this.setUserCoordinatesFirstTime, ...updatingLocationParameters
    );
    
    this.watchId = Geolocation.watchPosition(
      this.setUserCoordinates, ...updatingLocationParameters
    )
  }

  onWillStartRenderingMap() {
    this.setState({
      isMapLoading: true
    })
  }

  onDidFinishRenderingMapFully() {
    this.setState({
      isMapLoading: false
    })
  }
  
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchId);
    Geolocation.stopObserving();
  }

  getUpdatedCenter() {
    return this.map.current.getCenter();
  }

  getUpdatedZoom() {
    return this.map.current.getZoom();
  }

  handleRegionChange() {
    if (this.state.isMapLoading) {
      return
    }
    Promise.all([this.getUpdatedCenter(), this.getUpdatedZoom()])
      .then(([[longitude, latitude], zoom]) => {
        this.updateShow({longitude, latitude, zoom});
      })
  }

  updateShow({longitude: newLongitude, latitude: newLatitude, zoom: newZoom}) {
    const {longitude: oldLongitude, latitude: oldLatitude, zoom: oldZoom} = this.state;
    this.setState({
      locationToShow: {
        longitude: newLongitude ? newLongitude : oldLongitude,
        latitude: newLatitude ? newLatitude : oldLatitude,
      },
      zoom: newZoom ? newZoom : oldZoom
    });
  }

  goToCurrentLocation() {
    this.state.currentLocation ?
      this.updateShow(this.state.currentLocation) :
      this.firstTimeLocationUpdate() // assumption: only on first time is currentLocation in state null
  }

  firstTimeLocationUpdate() {
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
          this.subscribeToUserLocation();
        }
      });
      return null;
    }

    // assume iOS
    Geolocation.requestAuthorization('always')
      .then(status => {
        if (status === 'granted') {
          this.subscribeToUserLocation();
        }
      });
  }

  render() {
    /* 
      the landscape view here is due to me not knowing a better alternative to ensure map takes full page size.
      also, tried adding this as a proper jsx comment next to the respective view, but to no avail.
    */
    const {locationToShow, zoom} = this.state; 
    return (
      <View style={styles.landscape}>
            <MapView
                style={styles.map}
                styleURL={'mapbox://styles/alfalcon/cka1xbje712931ipd6i5uxam8'}
                logoEnabled={false}
                attributionEnabled={false}
                onRegionDidChange={this.handleRegionChange}
                ref={this.map}
                onDidFinishRenderingMapFully={this.onDidFinishRenderingMapFully}
                onWillStartRenderingMap={this.onWillStartRenderingMap}
            >
              <Camera
                zoomLevel={zoom}
                centerCoordinate={[locationToShow.longitude, locationToShow.latitude]}
                >
              </Camera>
            </MapView>
            <View style={styles.safeArea} pointerEvents='box-none'>
              <View style={styles.fabContainer}>
                <FAB label='Go to my location' theme='green' icon='crosshairs' onPress={this.goToCurrentLocation}/>
              </View>
            </View>
      </View>
    );
  }
}
