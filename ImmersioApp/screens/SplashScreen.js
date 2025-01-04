import * as React from 'react';
import { View, Text } from 'react-native';
import main from '../styles/main';

function SplashScreen() {
  return (
    <View style={main.centered} >
      <Text>Loading...</Text>
    </View>
  );
}

export default SplashScreen;
