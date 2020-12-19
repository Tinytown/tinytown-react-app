import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { getData } from 'library/apis/storage';
import { signIn, updateAppState, updateUserLocation } from 'rdx/actions';
import { connect } from 'react-redux';
import OnboardingScreen from 'screens/OnboardingScreen';
import HomeScreen from 'screens/HomeScreen';

const Stack = createStackNavigator();

const App = (props) => {
  // App launches
  useEffect(() => {
    // Load location from LS
    getData('userLocation').then((location) => {
      if (location) {
        props.updateUserLocation(location);
      }
    });

    // Load auth state
    const subscriber = auth().onAuthStateChanged((user) => (user ? props.signIn(user) : null));

    // App state listener
    AppState.addEventListener('change', appStateHandler);

    return () => {
      subscriber; // unsubscribe on unmount
      AppState.removeEventListener('change', appStateHandler);
    };
  }, []);

  SplashScreen.hide();

  const appStateHandler = (event) => {
    event !== 'unknown' ? props.updateAppState(event) : null;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' screenOptions={{ animationEnabled: false }} >
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

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps, { signIn, updateAppState, updateUserLocation })(App);
