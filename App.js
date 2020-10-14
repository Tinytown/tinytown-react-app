import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationScreen from 'screens/onboarding/location';
import LogInScreen from 'screens/onboarding/login';
import HomeScreen from 'screens/home'

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='OOB Location'
        headerMode='none'
      >
        <Stack.Screen name='OOB Location' component={LocationScreen} />
        <Stack.Screen name='OOB LogIn' component={LogInScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
