import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import Responsive from '../components/responsive';

//store user progress

const _storeData = async (value) => {
  try {
  //we have to wait until AsyncStorage.setItem() returns a promise
  var key = 'lessonIntro'
  await AsyncStorage.setItem(key, value);
  console.log('stored lesson intro')
 
  } catch (error) {
  console.log(error);
  }
  };




function EuropaIntroScreen() {
  const navigation = useNavigation();
  //TODO: insert code to retrieve description and image from database
  var lessonIntroDescription = "This refers to the general land mass north of the Mediterranean Sea and west of the Ural mountains. The early Romans knew minimal of what is now Scandanavia or the Caucasus mountain regions."
  var lessonIntroImage = '../assets/europa.png'
  
  var lessonTitle = 'UBI EST ROMA?'

  const [sound, setSound] = useState();

  const [disable, setDisable] = useState(false);

  const disableRepeat = () => {
    setDisable(true);
    setTimeout(()=>{setDisable(false);}, 1500);
  }

  async function playSound() {
    console.log('Loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/europa.wav'));
    setSound(sound);
    console.log('playing sound');
    await sound.playAsync();
     
  }

  async function stopSound() {
    console.log('stopping sound');
    Audio.setIsEnabledAsync(false);
    Audio.setIsEnabledAsync(true);
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon />
    });
  });

  return (
    <SafeAreaView style={main.safeAreaContainer}>
      <View style={main.lessonNameArea}>
        <View style={main.lessonTitleBar}>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("Imperium Romanum")
                }}>
            <Image
              source={require('../assets/TriangleLeft.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}}/>
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>{lessonTitle}</Text>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("Āfrica")
                }}>
            <Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={main.lessonContentArea} >
        <View style={styles.introductionScreen}>
        <Text style={{color:'gray', fontSize:Responsive(18), marginTop:25, marginBottom:15}}>Click to listen, and repeat</Text>
          <Image 
            style={styles.image}
            source={require(lessonIntroImage)}
            resizeMode='contain'/>
          <Text style={main.lessonIntroText}>{lessonIntroDescription}</Text>
        </View>
      </View>
      <View style={main.lessonNavButtonArea}> 
        <TouchableOpacity style={{flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: "#BDBDBD",
          marginRight: 40,
          marginLeft: 40,
          marginBottom: 3}}
          disabled={disable}
                onPress={()=>{
                  disableRepeat(),
                _storeData('done'); 
                playSound();
                }}>
            <Text style={main.lessonContinueButtonText}>
            Eurōpa
            </Text>
        </TouchableOpacity> 
      </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  introductionScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column'
  },
  image: {
    width: 300,
    height: 200,
  }
});


export default EuropaIntroScreen;