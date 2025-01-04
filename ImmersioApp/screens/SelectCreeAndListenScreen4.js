import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Dimensions, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video, Audio } from 'expo-av';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import Responsive from '../components/responsive';
import VideoPlayer from 'expo-video-player';

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

function App() {
  const navigation = useNavigation();
  //TODO: insert code to retrieve description and image from database
  var lessonIntroDescription = "means 'my name is'"

  const [disable, setDisable] = useState(false);

  const [isVisible, trackVisible] = useState({
      one: true,
      visible: false,
      two:false
  })

  const [isVideo, trackVideo] = useState({
      playing: true,
      finished: false,
    })

  async function onPlaybackStatusUpdate(playbackStatus) {
      if (playbackStatus.didJustFinish){
        console.log('Terminó el video')
        trackVideo({finished: true})
        trackVisible({one:false})
      }
    }

  const disableRepeat = () => {
    setDisable(true);
    setTimeout(()=>{setDisable(false);}, 11000);
  }

  const [playVideo, setPlayVideo] = useState(false);

    useEffect(()=> {
      setTimeout(()=>{setPlayVideo(true); }, 1);
    });
  var lessonTitle = 'Introducing yourself'

  const [sound, setSound] = useState();
  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});

  const [renderButton, setRenderButton] = useState(false);

  useEffect (() => {
    setTimeout(()=>{setRenderButton(true);}, 1600);
  });

  async function playSound() {
    console.log('Loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/Cree/nitohcin.mp3'));
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
                navigation.navigate("My name is...")
                }}>
                <Image 
                  source={require('../assets/TriangleLeft.png')}
                  resizeMode='contain' style={{marginVertical:Responsive(3)}}/>
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>{lessonTitle}</Text>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("tâni e-išinihkâsoyan?")
                }}>
            {/*<Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}}/>*/}
          </TouchableOpacity>
        </View>
      </View>

      <View style={main.lessonContentArea} >
        <View style={styles.introductionScreen}>
          <Video 
              ref={video}
              useNativeControls
              source={{ uri: 'https://immersio.io/learn/wp-content/uploads/h5p/content/6/videos/sources-61243f16441ee.mp4', }}
              resizeMode="cover"
              shouldPlay={playVideo}
              style={styles.image}
              onPlaybackStatusUpdate={(playbackStatus) => onPlaybackStatusUpdate(playbackStatus)}
          />
          { isVisible.one &&<Text style={{fontSize:20,position: "absolute", alignSelf:'center', top:220, fontWeigth:'bold'}}>nitôhcîn</Text> }

          { isVisible.visible && <Text style={{fontWeight:'bold', fontSize:16, color: '#777', alignSelf:'center', padding:50,paddingBottom: 0}}>nitôhcîn</Text> }
          { isVisible.visible && <Text style={{fontSize:16, color: '#777', alignSelf:'center'}}>means I am from [hometown]</Text> }
          { isVisible.visible && <Text style={{fontSize:16, color: '#777', alignSelf:'center', padding:50, textAlign:'center', paddingTop:30}}>Usually, you say the name of your community before this phrase: [place name + nitôhcîn]</Text> }



        </View>
      </View>

      { isVideo.finished && <View style={main.lessonNavButtonArea}> 
        <Text style={{fontSize:20,position: "absolute", alignSelf:'center', top:-30}}>nitôhcîn</Text>
        <TouchableOpacity style={{flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: "#1EA896",
          borderRadius: 10,
          marginTop: -30,
          marginRight: 90,
          marginLeft: 90,
          marginBottom: 3, padding:7}}
          disabled={disable}
                onPress={()=>{
                  //disableRepeat(),
                  _storeData('done'); 
                  playSound();
                }}>
            <Text style={main.lessonContinueButtonText}>
                ᓂᑑᐦᒌᓐ
            </Text>
        </TouchableOpacity>

        { isVisible.visible && <TouchableOpacity style={{position: "absolute",
          justifyContent: 'center',
          borderRadius: 10,
          top: 8,
          left: 330,
          width:45, height: 45, padding:5}}
          disabled={disable}
                onPress={()=>{
                  navigation.navigate("Moose Factory Nitôhcîn")
                  _storeData('done'); 
                }}>
          <Image 
              source={require('../assets/next.png')}
              resizeMode='contain' style={{width:55}}/>
        </TouchableOpacity> }

        <View style={{position: "absolute",
          justifyContent: 'center',
          borderRadius: 10,
          top: 7,
          left: 270,
          width:45, height: 45, padding:5}}>
          <Image 
              source={require('../assets/voice.png')}
              resizeMode='contain' style={{width:35}}/>
        </View> 
      </View> }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  introductionScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 80
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

export default App;