import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";
import Auth from "../components/Auth";
import LinkingConfiguration from './LinkingConfiguration';
import { ThemeProvider } from 'react-native-elements';

function Navigation({ theme }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} >
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();

function RootNavigator() {
  return (  
    <Auth
      root={<Stack.Screen name="Root" component={DrawerNavigator} />} 
      notfound={<Stack.Screen name="NotFound" component={NotFoundScreen} />}
    />
  );
}

export default Navigation;
