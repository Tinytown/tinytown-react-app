import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../../redux/actions';
import MapView from 'library/components/MapView'
import FAB from 'library/components/fab';
import R from 'res/R'
import { useSelector } from 'react-redux';

const HomeScreen = (props) => {

  const photoURL = useSelector(state => state.auth.user.photoURL)
  const displayName = useSelector(state => state.auth.user.displayName)

  return (
    <MapView>
      <Image source={{uri: photoURL}} style={{height: 40, width: 40, borderWidth: 2, borderColor: 'white'}} />
      <View style={styles.fabContainer}>
        <FAB label='Sign Out' theme='blue' icon='placeholder' onPress={() => auth().signOut().then(() => props.signOut())}/>
        <FAB label={R.strings.button.shout} theme='red' icon='megaphone' branded onPress={() => console.log(`LOUD NOISES from ${displayName}`)}/>
      </View>
    </MapView>
  )
  }

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signOut
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  }
});