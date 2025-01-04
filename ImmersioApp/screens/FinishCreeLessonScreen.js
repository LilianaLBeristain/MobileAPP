import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Image, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import lessons from '../api/lessons'
import { Audio } from 'expo-av'
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import Responsive from '../components/responsive';

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
    <SafeAreaView style={main.safeAreaContainer}>
    <View style={main.lessonNameAreaLatin}>
      <TouchableOpacity>
      </TouchableOpacity>
      <Text style={{color:'#595959', fontSize:16, textAlign: 'center', color: 'white', fontSize:Responsive( 18)}}>Introducing yourself</Text> 
      <TouchableOpacity>
      </TouchableOpacity>
    </View>
    <View style={main.centered} >
      <Image 
        style={{width: 300, height: 200}}
        source={require('../assets/trophy.png')}
        resizeMode='contain'/>
      <Text style={{color:'#FD6100', fontWeight:'bold', paddingTop:20, fontSize:25}}>Congratulations!</Text>
        <Text style={{padding:50, paddingTop:15, color:'#595959', fontSize:16, textAlign: 'center'}}>You are ready to have a conversation with a native Moose Cree Speaker.</Text>
    </View>
    <View style={main.navButtonPair}>          
          <TouchableOpacity style={{backgroundColor: "#F5891C", borderRadius:5, width:250}}>
            <Text style={{textAlign: 'center', marginTop:15, marginBottom:15, color: "white", fontSize:Responsive( 18)}}> Let's chat! </Text>
          </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
