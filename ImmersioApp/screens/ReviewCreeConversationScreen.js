import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Dimensions, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { Audio } from 'expo-av';
import Responsive from '../components/responsive';
import { Ionicons } from '@expo/vector-icons';

const _storeData = async (value) => {
  try {
  //we have to wait until AsyncStorage.setItem() returns a promise
  var key = 'grammarScreen'
  await AsyncStorage.setItem(key, value);
  console.log('stored grammar screen')
 
  } catch (error) {
  console.log(error);
  }
  };

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  var lessonTitle = 'Introducing yourself'
  const navigation = useNavigation();
  const [isRecording, trackIsRecording] = useState({
    recording:false,
    stop:true
  });

  const [trackConversation, setTrackConversation] = useState({
    one:true,
    two:false,
    three:false,
    done:false
})

  const [disabled, setDisabled] = useState({
    one:false,
    two:false,
    three:false
  })

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon />
    });
    /*
    const ac = new AbortController ();
    loadText();
    return () => ac.abort();
    */
  });


  const [recording, setRecording] = React.useState();
  const [sound, setSound] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log(uri)
    //console.log('Recording stopped and stored at', uri);

    /*
    const { mySound, status } = await recording.createNewLoadedSoundAsync(
      {
        isLooping: false,
      },
    );
    sound = mySound;*/
    playSound(uri);
  }

  async function playSound(myUri) {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const { sound } = await Audio.Sound.createAsync({
      uri: myUri,
    });
    setSound(sound);

    console.log('Playing Sound', myUri);
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  async function onPlayPause() {
    if (sound != null) {
      sound.stopAsync();
      sound.playAsync();
    } else { console.log("empty sound")}
  }


  const showModal = () => {
    setModalVisible(true);
    setTimeout(()=>{
      setModalVisible(false);
    }, 3000);
  };
  const bubbleWidth = (Dimensions.get('window').width * 0.6);
  //const screenCenter = (Dimensions.get('window').width / 2) - 23;

  async function dialogue1(){
    if(!disabled.one){
      setTimeout(()=>{
        setDisabled({one:true})
      }, 7500)
    }
  }

  async function dialogue2(){
    if(!disabled.two){
      setTimeout(()=>{
        setDisabled({one:true, two:true})
      }, 7000)
    }
  }

  async function dialogue3(){
    if(!disabled.three){
      setTimeout(()=>{
        setDisabled({one:true, two:true, three:true})
      }, 3500)
    }
  }

  async function sound1() {
    stopSound()
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/Cree/waciye_Rachel.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
}

  async function sound2() {
      stopSound()
      console.log('loading sound');
      const {sound} = await Audio.Sound.createAsync(require('../assets/Cree/Ben_MooseFactory.mp3'));
      setSound(sound);

      console.log('playing sound');
      await sound.playAsync();
       
  }

  async function sound3() {
    stopSound()
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/Cree/Rachel_nitohcin.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
  }

  async function sound4() {
    stopSound()
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/Cree/kaa.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
}

async function stopSound() {
    console.log('stopping sound');
    Audio.setIsEnabledAsync(false);
    Audio.setIsEnabledAsync(true);
  }

  

  return (
    <SafeAreaView style={main.safeAreaContainer}>
      <View style={{height:'8%', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#956424', marginBottom:5}}>
        <View style={main.lessonTitleBar}>
          <TouchableOpacity onPress={()=>{ stopSound(); navigation.navigate("nešta kîla") }}>
            <Image source={require('../assets/TriangleLeft.png')}
              resizeMode='contain' style={{marginVertical:(3)}}/>
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>{lessonTitle}</Text>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("nešta kîla")
                }}>
            {/*<Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}}/>*/}
          </TouchableOpacity>
        </View>
      </View>
     
      <View>
        <TouchableOpacity style={styles.leftBubble} onPress={()=>{sound1(), dialogue1()}}>
            <Text style={{fontWeight:'bold',marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'white', fontSize:18, maxWidth:bubbleWidth, paddingLeft:35}}>ᐙᒋᔦ   ᕃᒐᓪ ᓂᑎᔑᓂᐦᑳᓱᓐˣ  ᑖᓂ ᐁ ᐃᔑᓂᐦᑳᓱᔭᓐˣ</Text>
            <View style={{position: "absolute",
              justifyContent: 'center',
              borderRadius: 10,
              top: 15,
              left: 15,
              width:45, height: 45, padding:5}}>
              <Image 
                  source={require('../assets/voice.png')}
                  resizeMode='contain' style={{width:30}}/>
            </View> 
        </TouchableOpacity>
        <Text style={{alignSelf:'flex-end', color:'gray', fontSize:17, marginRight: 25}}> wâciye! Rachel nitišinihkâson. </Text>
        <Text style={{alignSelf:'flex-end', color:'gray', fontSize:17, marginRight: 25}}> Tâni e-išinihkâsoyan? </Text>
      </View>

      { disabled.one &&
        <View>
          <TouchableOpacity style={styles.rightBubble} onPress={()=>{sound2(), dialogue2()}}>
              <Text style={{fontWeight:'bold',marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#956424', fontSize:18, maxWidth:bubbleWidth+10, paddingLeft:35}}>ᐯᓐ ᓂᑎᔑᓂᐦᑳᓱᓐx ᒨᓭ ᕝᐊᒡᑐᕐᔾ ᓂᑑᐦᒌᓐ᙮ ᓀᔥᑕ ᑮᓚx</Text>
              <View style={{position: "absolute",
                justifyContent: 'center',
                borderRadius: 10,
                top: 15,
                left: 15,
                width:45, height: 45, padding:5}}>
                <Image 
                    source={require('../assets/voice2.png')}
                    resizeMode='contain' style={{width:30}}/>
              </View> 
          </TouchableOpacity>
          <Text style={{alignSelf:'flex-start', color:'gray', fontSize:17, marginLeft: 20}}> Ben nitišinihkâson. Moose Factory nitôhcîn. </Text>
          <Text style={{alignSelf:'flex-start', color:'gray', fontSize:17, marginLeft: 20}}> Nešta kîla? </Text>
        </View>
      }

      { disabled.two &&
        <View>
        <TouchableOpacity style={styles.leftBubble} onPress={()=>{sound3(), dialogue3()}}>
            <Text style={{fontWeight:'bold',marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'white', fontSize:18, maxWidth:bubbleWidth, paddingLeft:35}}>ᑳᐸᔅᑳᓯᓐᒃ ᓂᑑᐦᒌᓐx</Text>
            <View style={{position: "absolute",
              justifyContent: 'center',
              borderRadius: 10,
              top: 5,
              left: 15,
              width:45, height: 45, padding:5}}>
              <Image 
                  source={require('../assets/voice.png')}
                  resizeMode='contain' style={{width:30}}/>
            </View> 
        </TouchableOpacity>
        <Text style={{alignSelf:'flex-end', color:'gray', fontSize:17, marginRight: 25}}> kâpaskâsink nitôhcîn. </Text>
      </View>
      }

      { disabled.three &&
        <View>
          <TouchableOpacity style={styles.rightBubble} onPress={()=>{sound4(), setTimeout(()=>{ navigation.navigate("Greetings & introduction") }, 3000) }}>
              <Text style={{fontWeight:'bold',marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#956424', fontSize:18, maxWidth:bubbleWidth+10, paddingLeft:35}}>ᑳ</Text>
              <View style={{position: "absolute",
                justifyContent: 'center',
                borderRadius: 10,
                top: 5,
                left: 15,
                width:45, height: 45, padding:5}}>
                <Image 
                    source={require('../assets/voice2.png')}
                    resizeMode='contain' style={{width:30}}/>
              </View> 
          </TouchableOpacity>
          <Text style={{alignSelf:'flex-start', color:'gray', fontSize:17, marginLeft: 20}}> kâ </Text>
        </View>
      }



      <View style={{flexDirection: 'row', position:'absolute', top:650, left:115, justifyContent:'center'}}>
        {
          isRecording.recording && <TouchableOpacity style={styles.micButton} onPress={()=>{trackIsRecording({stop: true, recording:false}), stopRecording()}}>
            <View style={styles.stopButton}></View>
          </TouchableOpacity>
        }

        {
          isRecording.stop && <TouchableOpacity style={styles.micButton} onPress={()=>{trackIsRecording({recording: true, stop:false}), startRecording()}}>
            {/*<TouchableOpacity style={styles.stopButton}></TouchableOpacity>*/}
            <Image source={require('../assets/mic.png')} resizeMode='contain' style={styles.micImage}/>
          {/*<Image source={require('./assets/mic.png')} resizeMode='contain' style={{marginVertical:Responsive(3)}}/>*/}
          </TouchableOpacity>
        }

        <TouchableOpacity style={styles.micButton} onPress={()=>{onPlayPause()}}>
          <Image source={require('../assets/play.png')} resizeMode='contain' style={styles.playImage}/>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rightBubble: {
    backgroundColor:'white', 
    alignSelf:'flex-start', 
    borderRadius:Responsive(15), 
    marginTop:Responsive(12), 
    marginLeft:Responsive(10), 
    padding:5, paddingLeft:25,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 5,
  },
  leftBubble: {
    backgroundColor:'#1EA896', 
    alignSelf:'flex-end', 
    borderRadius:Responsive(15), 
    marginTop:Responsive(12), 
    marginRight:Responsive(10), 
    padding:5, paddingLeft:25,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginBottom: 5,
  },
  micButton:{
    backgroundColor: 'red',
    width: 65,
    height:65,
    borderRadius: 32.5,
    marginLeft: 25,
  }, 
  micImage:{
    width:35,
    height:35,
    alignSelf:'center',
    marginTop:15,
  },
  stopButton:{
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    width: 25,
    height:25,
  },
  playImage:{
    alignSelf: 'center',
    marginTop: 18.5,
    marginLeft:5,
    width:28,
    height:28,
  }
});

export default App;