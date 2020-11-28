import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import { AppState } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { getData, clearStorage } from './src/library/apis/storage'
import { getLocationPermission } from './src/library/apis/geolocation'
import { signIn, updateAppState, updateUserLocation, setCamera } from './src/redux/actions';
import { connect } from 'react-redux';
import OnboardingScreen from 'screens/onboarding';
import HomeScreen from 'screens/home';

const Stack = createStackNavigator();

const App = (props) => {
  // App launches
  useEffect(() => {
    // Load auth state
    const subscriber = auth().onAuthStateChanged((user) => user ? props.signIn(user) : null);

    // App state listener
    AppState.addEventListener('change', (e) => props.updateAppState(e))

    // Load location from LS
    getData('location').then((location) => {
      getLocationPermission().then((hasPermission) => {
        if (location && hasPermission) {
          props.updateUserLocation(location)
          props.setCamera(true)
        }
        else {
          clearStorage()
        }
      })
    })

    return () => {
      subscriber; // unsubscribe on unmount
      AppState.removeEventListener('change', (e) => props.updateAppState(e))
      console.log('clean up on aisle app')
    }
  }, []);
  
  useEffect(() => {
    const appLoading = Object.values(props.appLoaded).includes(false)
    if (!appLoading) {
      SplashScreen.hide()
    }
  }, [props.appLoaded])

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' screenOptions={{animationEnabled: false}} >
        {props.isSignedIn ? (
          <>
            <Stack.Screen name='Home' component={HomeScreen} />
          </>
        ) : (
            <>
              <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return { 
    isSignedIn: state.auth.isSignedIn,
    appLoaded: state.app.loaded,
   }
}

export default connect(mapStateToProps, { signIn, updateAppState, updateUserLocation, setCamera })(App);
