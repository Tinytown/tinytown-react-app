import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { signOut, getUserLocation } from 'rdx/actions';
import MapView from 'library/components/MapView'
import FAB from 'library/components/FAB';
import RES from 'res';

const HomeScreen = (props) => {
  return (
    <MapView>
      <Image source={{ uri: props.photoURL }} style={{ height: 40, width: 40, borderWidth: 2, borderColor: 'white' }} />
      <View style={styles.fabContainer}>
        {!props.userVisible ?
          <FAB
            label={RES.STRINGS.button.goToLocation}
            theme='green' icon='crosshairs'
            onPress={props.getUserLocation}/> : null}
        <FAB
          label='Sign Out'
          theme='blue'
          icon='placeholder'
          onPress={() => auth().signOut()
            .then(() => props.signOut())}/>
        <FAB
          label={RES.STRINGS.button.shout}
          theme='red'
          icon='megaphone'
          branded onPress={() => console.log(`LOUD NOISES from ${props.displayName}`)}/>
      </View>
    </MapView>
  )
}
const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  },
});

const mapStateToProps = (state) => ({
  photoURL: state.auth.user?.photoURL,
  displayName: state.auth.user?.displayName,
  userVisible: state.location.userVisible,
})

export default connect(mapStateToProps, { signOut, getUserLocation })(HomeScreen);

