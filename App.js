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
import { signIn, updateAppState } from './src/redux/actions';
import { connect } from 'react-redux';
import OnboardingScreen from 'screens/onboarding';
import HomeScreen from 'screens/home';

const Stack = createStackNavigator();

const App = (props) => {
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => user ? props.signIn(user) : null);
    SplashScreen.hide()
    AppState.addEventListener('change', (e) => props.updateAppState(e))
    return () => {
      subscriber; // unsubscribe on unmount
      AppState.removeEventListener('change', (e) => props.updateAppState(e))
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
    appState: state.app.state,
   }
}


export default connect(mapStateToProps, { signIn, updateAppState })(App);
