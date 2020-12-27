import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import OnboardingScreen from 'screens/OnboardingScreen';
import HomeScreen from 'screens/HomeScreen';

const Stack = createStackNavigator();

const App = ({ isSignedIn }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (isSignedIn !== null) {
      SplashScreen.hide();
      setAppIsReady(true);
    }
  }, [isSignedIn]);

  return (
    appIsReady ?
      <NavigationContainer>
        <Stack.Navigator headerMode='none' screenOptions={{ animationEnabled: false }} >
          {isSignedIn ? (
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
      : null
  );
};

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps)(App);
