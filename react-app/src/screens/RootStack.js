import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/HomeScreen';
import NewShoutScreen from 'screens/NewShoutScreen';
import ShoutScreen from 'screens/ShoutScreen';

const Stack = createStackNavigator();

const RootStack = () => {
  const stackConfig = {
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },
    cardOverlayEnabled: true,
    animationEnabled: false,
  };

  return (
    <Stack.Navigator
      screenOptions={stackConfig}
      mode="modal"
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='New Shout' component={NewShoutScreen} />
      <Stack.Screen name='Open Shout' component={ShoutScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
