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
import { getData } from './src/library/apis/storage'
import { signIn, updateAppState, updateUserLocation, setCamera } from './src/redux/actions';
import { connect } from 'react-redux';
import OnboardingScreen from 'screens/onboarding';
import HomeScreen from 'screens/home';

const Stack = createStackNavigator();

const App = (props) => {
  // App launches
  useEffect(() => {
    // Load location from LS
    getData('userLocation').then((location) => {
      if (location) {
        props.updateUserLocation(location)
      }
    })

    // Load auth state
    const subscriber = auth().onAuthStateChanged((user) => user ? props.signIn(user) : null);

    // App state listener
    AppState.addEventListener('change', (e) => {
      e !== 'unknown' ? props.updateAppState(e) : null
    })

    return () => {
      subscriber; // unsubscribe on unmount
      AppState.removeEventListener('change', (e) => {
        e !== 'unknown' ? props.updateAppState(e) : null
      })
      console.log('clean up on aisle app')
    }
  }, []);

  SplashScreen.hide()

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
   }
}

export default connect(mapStateToProps, { signIn, updateAppState, updateUserLocation, setCamera })(App);
