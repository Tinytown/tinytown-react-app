/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import OnboardingScreen from 'screens/OnboardingScreen';
import HomeScreen from 'screens/HomeScreen';
import { useAppLaunch } from 'library/hooks';
import { COLORS } from 'res';

const Stack = createStackNavigator();

const App = ({ isSignedIn }) => {
  const [appIsReady] = useAppLaunch(isSignedIn);

  return (
    appIsReady ?
      (<NavigationContainer>
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
      </NavigationContainer>)
      :
      <View style={{ backgroundColor: COLORS.asphaltGray, flex: 1 }}/>
  );
};

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps)(App);
