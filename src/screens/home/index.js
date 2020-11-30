import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { signOut, getUserLocation } from '../../redux/actions';
import MapView from 'library/components/MapView'
import FAB from 'library/components/fab';
import R from 'res/R'

const HomeScreen = (props) => {

  return (
    <MapView>
      <Image source={{uri: props.photoURL}} style={{height: 40, width: 40, borderWidth: 2, borderColor: 'white'}} />
      <View style={styles.fabContainer}>
        {!props.onUser ? 
        <FAB label={R.strings.button.goToLocation} theme='green' icon='crosshairs' onPress={() => props.getUserLocation()}/> : null}
        <FAB label='Sign Out' theme='blue' icon='placeholder' onPress={() => auth().signOut().then(() => props.signOut())}/>
        <FAB label={R.strings.button.shout} theme='red' icon='megaphone' branded onPress={() => console.log(`LOUD NOISES from ${props.displayName}`)}/>
      </View>
    </MapView>
  )
  }
const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  }
});

const mapStateToProps = (state) => {
  return { 
    photoURL: state.auth.user.photoURL, 
    displayName: state.auth.user.displayName,
    onUser: state.location.camera.onUser,
  }
}
  
export default connect(mapStateToProps, { signOut, getUserLocation })(HomeScreen);

