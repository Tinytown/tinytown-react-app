/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from 'screens/RootNavigation';
import { connect } from 'react-redux';
import OnboardingStack from 'screens/OnboardingStack';
import RootStack from 'screens/RootStack';
import { useAppLaunch, useNotifications } from 'library/hooks';
import { COLORS } from 'res';

const Stack = createStackNavigator();

const App = ({ isSignedIn }) => {
  const [appIsReady] = useAppLaunch(isSignedIn);
  const [setNavIsReady] = useNotifications(isSignedIn);

  return (
    appIsReady ?
      (<NavigationContainer ref={navigationRef} onReady={() => setNavIsReady(true)} >
        <Stack.Navigator headerMode='none' screenOptions={{ animationEnabled: false }} >
          {isSignedIn ? (
            <>
              <Stack.Screen name='RootStack' component={RootStack} />
            </>
          ) : (
            <>
              <Stack.Screen name='OnboardingStack' component={OnboardingStack} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>)
      :
      <View style={{ backgroundColor: COLORS.asphaltGray[100], flex: 1 }}/>
  );
};

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps)(App);
