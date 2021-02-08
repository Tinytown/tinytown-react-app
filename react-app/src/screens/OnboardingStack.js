import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from 'screens/OnboardingScreen';
import WololoScreen from 'screens/WololoScreen';

const Stack = createStackNavigator();

const OnboardingStack = () => {
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
      <Stack.Screen name='Onboarding' component={OnboardingScreen} />
      <Stack.Screen name='Wololo' component={WololoScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
