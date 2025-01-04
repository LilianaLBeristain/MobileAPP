import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Image, Platform } from 'react-native';
import lessons from '../api/lessons'
import { Audio } from 'expo-av'
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';

function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon />
    });
  });

  useEffect(() => {
    (async() => {
      if (Platform.OS === "ios") {
        const {status} = Audio.requestPermissionsAsync();
      }
    })();
  }, [])

  return (
    <View style={main.centered} >
      {/* <Image source={require("../assets/Immersio2x.png")}/> */}
      <Image 
        style={{width: 300, height: 200}}
        source={require('../assets/Immersio2x.png')}
        resizeMode='contain'/>
      <Text>Welcome to Immersio!</Text>
      <Text>An Ancient Language Learning App</Text>
    </View>
  );
}

export default WelcomeScreen;
