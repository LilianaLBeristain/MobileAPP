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




function LessonIntroScreen() {
  const navigation = useNavigation();
  //TODO: insert code to retrieve description and image from database
  var lessonIntroDescription = "This refers to the Roman Empire, whoses borders expanded and contracted throughout its many centuries. The borders you see here are from the year 117 anno Domini. They represent the empire's greatest extent until the death of the emperor Trajan."
  var lessonIntroImage = '../assets/map.png'
  
  var lessonTitle = 'UBI EST ROMA?'

  const [sound, setSound] = useState();

  const [disable, setDisable] = useState(false);

  const disableRepeat = () => {
    setDisable(true);
    setTimeout(()=>{setDisable(false);}, 2000);
  }

  async function playSound() {
    console.log('Loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/imperium-romanum.mp3'));
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
                navigation.navigate("Lesson Video")
                }}>
            <Image
              source={require('../assets/TriangleLeft.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}} />
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>{lessonTitle}</Text>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("Eurōpa")
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
          <Text style={{marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: "center",
    color: 'black',
    fontSize: Responsive(17)}}>{lessonIntroDescription}</Text>
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
                Imperium Romanum
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


export default LessonIntroScreen;