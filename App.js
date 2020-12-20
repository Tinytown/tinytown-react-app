import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import OnboardingScreen from 'screens/OnboardingScreen';
import HomeScreen from 'screens/HomeScreen';

const Stack = createStackNavigator();

const App = (props) => {
  SplashScreen.hide();

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

export default connect(mapStateToProps)(App);
