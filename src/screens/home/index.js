import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../../redux/actions';
import Map from 'library/components/Map';
import FAB from 'library/components/fab';
import R from 'res/R'
import { useSelector } from 'react-redux';

const HomeScreen = (props) => {

  const photoURL = useSelector(state => state.auth.user.photoURL)
  const displayName = useSelector(state => state.auth.user.displayName)

  return (
    <View style={styles.landscape}>
      <Map></Map>
      <View style={styles.safeArea} pointerEvents='box-none'>
        <Image source={{uri: photoURL}} style={{height: 40, width: 40, borderWidth: 2, borderColor: 'white'}} />
        <View style={styles.fabContainer}>
          <FAB label='Sign Out' theme='blue' icon='placeholder' onPress={() => auth().signOut().then(() => props.signOut())}/>
          <FAB label={R.strings.button.shout} theme='red' icon='megaphone' branded onPress={() => console.log(`LOUD NOISES from ${displayName}`)}/>
        </View>
      </View>
    </View>
  )
  }

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signOut
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  landscape: {
    height: '100%'
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