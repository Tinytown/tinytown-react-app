import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/HomeScreen';
import NewShoutScreen from 'screens/NewShoutScreen';
import ShoutScreen from 'screens/ShoutScreen';
import AboutScreen from 'screens/AboutScreen';
import ShoutOnboardingScreen from 'screens/ShoutOnboardingScreen';

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
      <Stack.Screen name='NewShout' component={NewShoutScreen} />
      <Stack.Screen name='OpenShout' component={ShoutScreen} />
      <Stack.Screen name='ShoutOnboarding' component={ShoutOnboardingScreen} />
      <Stack.Screen name='About' component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
