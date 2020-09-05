import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import config from '../../config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import CurrentLocationIcon from './fixtures/current-location-icon';
import Geolocation from 'react-native-geolocation-service';
import {bindMethods} from '../component-ops';
import userLocationIcon from '../../assets/images/user-location.png';

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

    bindMethods(['setUserCoordinatesFirstTime', 'updateShow', 'subscribeToUserLocation', 'goToCurrentLocation', 'handleRegionChange', 'setUserCoordinates', 'onDidFinishRenderingMapFully', 'onWillStartRenderingMap'], this);
    this.state = {
      currentLocation: null,
      locationToShow: { // minneapolis to begin with
        latitude: 44.986656,
        longitude: -93.258133
      },
      zoom: 14,
      isMapLoading: false, // axiom: loading only applies to an existing map
      featureCollection: {
        type: 'FeatureCollection',
        features: []
      }
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
    const {featureCollection} = this.state;
    const {latitude, longitude} = position.coords;
    this.setState({
      currentLocation: {
        latitude,
        longitude
      },
      featureCollection: {
        ...featureCollection,
        features: [
          {
            type: 'Feature',
            id: 'userLocation',
            geometry: {
              coordinates: [longitude, latitude],
              type: 'Point'
            }
          }
        ]
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
    const {locationToShow, zoom, featureCollection} = this.state;
    console.log('featureCollection: ', featureCollection);
    const feature = featureCollection.features.length === 1 ? featureCollection.features[0] : null;
    return (
      <View style={styles.landscape}>
        <View style={styles.page}>
          <View style={styles.container}>
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
              <MapboxGL.ShapeSource
                id='markersShape'
                shape={featureCollection}
              >
                {feature
                  ? <MapboxGL.SymbolLayer
                      id={feature.id}
                      style={{
                        iconAllowOverlap: true,
                        iconImage: userLocationIcon
                      }}
                      minZoomLevel={1}
                    />
                    : null  
                }
              </MapboxGL.ShapeSource>
            </MapView>
            <View style={styles.containerCurrentLocation}>
                <TouchableOpacity
                  style={styles.buttonCurrentLocation}
                  onPress={this.goToCurrentLocation}
                >
                  <View style={styles.messageCurrentLocation}>
                    <CurrentLocationIcon style={styles.iconCurrentLocation} />
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
