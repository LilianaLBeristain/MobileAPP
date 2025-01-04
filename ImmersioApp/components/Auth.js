import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useEffect, useReducer, useMemo } from 'react';
import { AsyncStorage } from 'react-native';
import SignInScreen from '../screens/SignInScreen';
import SplashScreen from '../screens/SplashScreen';
import { AuthContext } from './contexts/AuthContext';
import * as Google from 'expo-google-app-auth';
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from '@env';

function Auth(props) {
  const config = {
  androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  iosClientId: GOOGLE_IOS_CLIENT_ID
  };

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log('This is the user token: ', userToken);
      } catch (err) {
        // Restoring token failed
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async ({ email, password }) => {
        // send data to server and get a token here to put into asyncStorage

        await AsyncStorage.setItem('userToken', 'dummy-auth-token');
        console.log('Signed in as: ', email);
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      GoogleSignIn: async () => {
          try {
            const {type, accessToken, user} = await Google.logInAsync(config)
            if (type === 'success') {
              console.log('successful Google signin');
              console.log('Google sign in: ', user);
              await AsyncStorage.setItem('accessToken', accessToken);
              await AsyncStorage.setItem('photoUrl', user.photoUrl);
              await AsyncStorage.setItem('name', user.givenName);
              await AsyncStorage.setItem('email', user.email);
              // TODO: @jnancy add POST request to database here
              //       once user route/table is updated to support them
              dispatch({ type: 'SIGN_IN', token: accessToken });
            }
            else {
              console.log('canceled signin');
            }
          } catch (e) {
            console.log('error', e)
          }
      },
      signOut: async () => {
        // If IOS, different for Android
        AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // send user data and get token here
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      }
    }),
    []
  );

  const Stack = createStackNavigator();

  return (
    <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            // Haven't finished checking for the token
            <Stack.Screen name='Splash' component={SplashScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name='SignIn'
              component={SignInScreen}
              options={{
                title: 'Sign In',
                animationTypeForReplace: state.isSignout ? 'pop' : 'push'
              }}
            />
          ) : (
            <>
              {props.root}
              {props.notfound}
            </>
          )}
        </Stack.Navigator>
    </AuthContext.Provider>
  );

}

export default Auth;
