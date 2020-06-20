import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
const {MapView, Camera} = MapboxGL;

MapboxGL.setAccessToken("pk.eyJ1IjoiYWxmYWxjb24iLCJhIjoiY2tibWxsZjRvMDJwNTMwbDN6ZHM5eDMxZCJ9.p-E83hPUo23G5D5USjR_QA");

const styles = StyleSheet.create({
  landscape: {
    height: "100%"
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1
  }
});

export default class Map extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
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
            </MapView>
          </View>
        </View>
      </View>
    );
  }
}