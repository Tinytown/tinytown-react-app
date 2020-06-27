import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import CurrentLocationIcon from './fixtures/current-location-icon';
const {MapView, Camera} = MapboxGL;

MapboxGL.setAccessToken('pk.eyJ1IjoiYWxmYWxjb24iLCJhIjoiY2tibWxsZjRvMDJwNTMwbDN6ZHM5eDMxZCJ9.p-E83hPUo23G5D5USjR_QA');

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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconCurrentLocation: {
    marginRight: 5
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.onCurrentLocation = this.onCurrentLocation.bind(this);
  }

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  onCurrentLocation() {

  }

  render() {
    /* 
      the landscape view here is due to me not knowing a better alternative to ensure map takes full page size.
      also, tried adding this as a proper jsx comment next to the respective view, but to no avail.
    */
    const minneapolisCoordinates = {
      latitude: 44.986656,
      longitude: -93.258133
    };
    return (
      <View style={styles.landscape}>
        <View style={styles.page}>
          <View style={styles.container}>
            <MapView style={styles.map}>
              <Camera
                zoomLevel={14}
                centerCoordinate={[minneapolisCoordinates.longitude, minneapolisCoordinates.latitude]}
                >
              </Camera>
              <View style={styles.containerCurrentLocation}>
              <TouchableOpacity
                style={styles.buttonCurrentLocation}
                onPress={this.onCurrentLocation}
              >
                <View style={styles.messageCurrentLocation}>
                  <CurrentLocationIcon style={styles.iconCurrentLocation} />
                  <Text style={styles.textCurrentLocation}>Go to my location</Text>  
                </View>
              </TouchableOpacity>
              </View>
            </MapView>
          </View>
        </View>
      </View>
    );
  }
}