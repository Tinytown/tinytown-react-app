import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from 'screens/HomeStack';
import SettingsScreen from 'screens/SettingsScreen';

const Stack = createStackNavigator();

const RootStack = () => {
  const stackConfig = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={stackConfig}>
      <Stack.Screen name='HomeStack' component={HomeStack} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
