import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from 'screens/mapbox';
import Splash from 'screens/splash';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        headerMode="none"
      >
        <Stack.Screen name="Splash" options={{title: 'Splash'}} component={Splash} />
        <Stack.Screen name="Map" options={{title: 'Map'}} component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
