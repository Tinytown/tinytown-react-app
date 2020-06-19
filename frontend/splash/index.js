import React, { Component } from "react";
import { Animated, Image, View, StyleSheet } from "react-native";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }

  render() {
    return (
      <View style={styles.landscape}>
        <Animated.View style={[styles.fadingContainer, {
          opacity: this.state.fadeAnim
        }]}>
          <Image 
            source={require("../../assets/images/logo.png")}
            style={styles.logo}>
          </Image>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landscape: {
    backgroundColor: "black",
    height: "100%"
  },
  fadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "85%",
    height: "85%",
    resizeMode: "contain"
  }
});

export default Splash;
