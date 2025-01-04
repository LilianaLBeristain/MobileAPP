import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';

import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';

//This screen is currently not being used - the current landing page is the welcome screen
function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });

  return (
    <View style={main.centered} >
      <Text>Home Screen</Text>
      <Button title="Select Language" onPress={()=>{navigation.navigate("Language")}}/>
    </View>
  );
}

export default HomeScreen;
