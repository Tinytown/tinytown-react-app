import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { signIn } from './src/redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OnboardingScreen from 'screens/onboarding';
import HomeScreen from 'screens/home';

const Stack = createStackNavigator();

const App = (props) => {
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => user ? props.signIn(user) : null);
    SplashScreen.hide()
    return subscriber; // unsubscribe on unmount
  }, []);

  const isSignedIn = useSelector(state => state.auth.isSignedIn)
 
  SplashScreen.hide()
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' screenOptions={{animationEnabled: false}} >
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
    </NavigationContainer>
  );
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signIn
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(App);
