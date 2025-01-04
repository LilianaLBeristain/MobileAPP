import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Dimensions, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video, Audio } from 'expo-av';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import VideoPlayer from 'expo-video-player';


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

const deviceWidth = Dimensions.get('window').width - 200;

function SelectAndListenScreen4() {
  const navigation = useNavigation();
  //TODO: insert code to retrieve description and image from database
  var lessonIntroDescription = "So, to ask where something is you say 'ubi est?' For example, 'ubi est Italia?' means 'where is Italy'"
  
  
  var lessonTitle = 'UBI EST ROMA?'

  const [sound, setSound] = useState();
  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});

  const [disable, setDisable] = useState(false);

  const disableRepeat = () => {
    setDisable(true);
    setTimeout(()=>{setDisable(false);}, 10000);
  }

  const [playVideo, setPlayVideo] = useState(false);

    useEffect(()=> {
      setTimeout(()=>{setPlayVideo(true); }, 1);
    });

    const [renderButton, setRenderButton] = useState(false);

    useEffect (() => {
      setTimeout(()=>{setRenderButton(true);}, 1600);
    });
  

  async function playSound() {
    console.log('Loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/ubi-est-explain.mp3'));
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
                navigation.navigate("Where is Rome")
                }}>
                <Image 
                  source={require('../assets/TriangleLeft.png')}
                  resizeMode='contain' style={{marginVertical:(3)}}/>
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>{lessonTitle}</Text>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("Fill in the blanks screen")
                }}>
            <Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:(3)}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={main.lessonContentArea} >
        <View style={styles.introductionScreen}>
        <Text style={{color:'gray', fontSize:18, marginTop:25, marginBottom:15}}>Click to listen, and repeat</Text>
        <VideoPlayer
              videoProps={{
                shouldPlay: true,
                resizeMode: "contain",
                source: require('../assets/ubiEst.mp4'),
              }}
              fullscreen={{
                visible: false,
              }}
              style={styles.video}
            />
          <Text style={{fontWeight:'bold', marginTop:25, fontSize:16}}>"Ubi" means "where?" and "est" means "is."</Text>
          <Text style={main.lessonIntroText}>{lessonIntroDescription}</Text>
        </View>
      </View>
      {renderButton && <View style={main.lessonNavButtonArea}> 
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
                Ubi est?
            </Text>
        </TouchableOpacity> 
           </View> }
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
  },
  video: {
    alignSelf: 'center',
    width: deviceWidth,
    height: deviceWidth,
    borderRadius:8
  },
});


export default SelectAndListenScreen4;