import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/HomeScreen';
import NewShout from 'screens/NewShout';

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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="New Shout" component={NewShout} />
    </Stack.Navigator>
  );
};

export default RootStack;
