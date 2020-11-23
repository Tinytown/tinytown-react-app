import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LocationScreen from 'screens/onboarding/Location';
import SignInScreen from 'screens/onboarding/SignIn';
import HomeScreen from 'screens/home';

const Stack = createStackNavigator();

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 
  SplashScreen.hide()
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {isLoggedIn ? (
          <>
            <Stack.Screen name='Home' component={HomeScreen} />
          </>
        ) : (
            <>
              <Stack.Screen name='Sign In' component={SignInScreen} />
              <Stack.Screen name='Location' component={LocationScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
