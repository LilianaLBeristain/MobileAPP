import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import Responsive from '../components/responsive';

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

function App() {
  const navigation = useNavigation();
  //TODO: insert code to retrieve description and image from database
  var lessonIntroDescription = "This refers to the Roman Empire, whoses borders expanded and contracted throughout its many centuries. The borders you see here are from the year 117 anno Domini. They represent the empire's greatest extent until the death of the emperor Trajan."
  var lessonIntroImage = '../assets/Cree/waciye.png'
  var explanation1 = "wâciye"
  var explanation2 = "can mean hello, good bye, welcome"
  
  var lessonTitle = 'Introducing yourself'

  const [sound, setSound] = useState();

  const [disable, setDisable] = useState(false);

  const [isVisible, trackVisible] = useState({
      visible: false,
  })

  const disableRepeat = () => {
    setDisable(true);
    setTimeout(()=>{setDisable(false);}, 2000);
  }

  async function playSound() {
    console.log('Loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/Cree/waciye.mp3'));
    setSound(sound);
    console.log('playing sound');
    await sound.playAsync();

    trackVisible({visible: true})
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
      <View style={main.lessonNameAreaLatin}>
        <View style={main.lessonTitleBar}>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("Greetings & Introduction")
                }}>
            <Image
              source={require('../assets/TriangleLeft.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}} />
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>{lessonTitle}</Text>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("Kâ")
                }}>
            {/*<Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}}/>*/}
          </TouchableOpacity>
        </View>
      </View>

      <View style={main.lessonContentArea}>
        <View style={styles.introductionScreen}>
          <Image style={styles.image} source={require(lessonIntroImage)} resizeMode='contain'/>
          { isVisible.visible && <Text style={{color:'gray', fontSize:Responsive(18), marginTop:25, fontWeight: 'bold'}}> {explanation1} </Text> }
          { isVisible.visible && <Text style={{color:'gray', fontSize:Responsive(18)}}> {explanation2} </Text> }
        </View>
      </View>


      <View style={main.lessonNavButtonArea}> 
        <TouchableOpacity style={{flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: "#1EA896",
            borderRadius: 10,
            marginTop: -70,
            marginRight: 90,
            marginLeft: 90,
            marginBottom: 3, padding:7}}
            disabled={disable}
                  onPress={()=>{
                    disableRepeat(),
                    _storeData('done'); 
                    playSound();
                  }}>
              <Text style={main.lessonContinueButtonText}>
                  wâciye
              </Text>
        </TouchableOpacity> 
        { isVisible.visible && <TouchableOpacity style={{position: "absolute",
          justifyContent: 'center',
          borderRadius: 10,
          top: -14,
          left: 330,
          width:45, height: 45, padding:5}}
          disabled={disable}
                onPress={()=>{
                  navigation.navigate("Kâ")
                  disableRepeat(),
                  _storeData('done'); 
                }}>
          <Image 
              source={require('../assets/next.png')}
              resizeMode='contain' style={{width:55}}/>
        </TouchableOpacity> }
        <View style={{position: "absolute",
          justifyContent: 'center',
          borderRadius: 10,
          top: -14,
          left: 270,
          width:45, height: 45, padding:5}}>
          <Image 
              source={require('../assets/voice.png')}
              resizeMode='contain' style={{width:35}}/>
        </View>
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
    marginTop: 80,
    width: 300,
    height: 200,
  }
});

export default App;