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

// let recording = new Audio.Recording();

function ReviewConversationScreen() {
  const navigation = useNavigation();
  // code to retrieve lesson data from database when database is active on server is found in commented lines
  /*
  const [grammarText, setGrammarText] =  useState({});

  const loadText = async () => {
    await lessons.getGrammarActivityText(setGrammarText);
    return;
  }
  */
  // const [RecordedURI, SetRecordedURI] = useState('');
  // const [AudioPerm, SetAudioPerm] = useState(false);
  // const [isRecording, SetisRecording] = useState(false);
  // const [isPLaying, SetisPLaying] = useState(false);
  // const Player = useRef(new Audio.Sound());

  // useEffect(() => {
  //   GetPermission();
  // }, []);

  // const GetPermission = async () => {
  //   const getAudioPerm = await Audio.requestPermissionsAsync();
  //   await Audio.setAudioModeAsync({allowsRecordingIOS:true})
  //   SetAudioPerm(getAudioPerm.granted);
  // };

  // const startRecording = async () => {
  //   if (AudioPerm === true) {
  //     try {
  //       await recording.prepareToRecordAsync(
  //         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
  //       );
  //       await recording.startAsync();
  //       SetisRecording(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     GetPermission();
  //   }
  // };

  // const stopRecording = async () => {
  //   try {
  //     await recording.stopAndUnloadAsync();
  //     const result = recording.getURI();
  //     SetRecordedURI(result); // Here is the URI
  //     recording = new Audio.Recording();
  //     SetisRecording(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const playSound = async () => {
  //   try {
  //     const result = await Player.current.loadAsync(
  //       { uri: RecordedURI },
  //       {},
  //       true
  //     );

  //     const response = await Player.current.getStatusAsync();
  //     if (response.isLoaded) {
  //       if (response.isPlaying === false) {
  //         Player.current.playAsync();
  //         SetisPLaying(true);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const stopSound = async () => {
  //   try {
  //     const checkLoading = await Player.current.getStatusAsync();
  //     if (checkLoading.isLoaded === true) {
  //       await Player.current.stopAsync();
  //       SetisPLaying(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    setTimeout(()=>{
      setModalVisible(false);
    }, 3000);
  };
  const bubbleWidth = (Dimensions.get('window').width * 0.8);
  //const screenCenter = (Dimensions.get('window').width / 2) - 23;

  const [sound, setSound] = useState();

  async function sound1() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/review01.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
}

  async function sound2() {
      console.log('loading sound');
      const {sound} = await Audio.Sound.createAsync(require('../assets/review02.mp3'));
      setSound(sound);

      console.log('playing sound');
      await sound.playAsync();
       
  }

  async function sound3() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/review03.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
  }

  async function sound4() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/estne.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
}

  async function sound5() {
      console.log('loading sound');
      const {sound} = await Audio.Sound.createAsync(require('../assets/review05.mp3'));
      setSound(sound);

      console.log('playing sound');
      await sound.playAsync();
       
  }

  async function sound6() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/review06.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
  }

  async function sound7() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/review07.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
  }

  async function sound8() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/review08.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
  }

  async function sound9() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/review09.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
  }

  const [trackConversation, setTrackConversation] = useState({
    one:true,
    two:false,
    three:false,
    four:false,
    five:false,
    six:false,
    seven:false,
    eight:false,
    nine:false,
    done:false
})

  const [disabled, setDisabled] = useState({
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    six:false,
    seven:false,
    eight:false,
    nine:false,
    done:false
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

  return (
    <SafeAreaView style={main.safeAreaContainer}>
      <View style={main.lessonNameArea}>
        <View style={main.lessonTitleBar}>
        <TouchableOpacity onPress={()=>{
                navigation.navigate("Where is Rome?")
                }}>
            <Image 
              source={require('../assets/TriangleLeft.png')}
              resizeMode='contain' style={{marginVertical:(3)}}/>
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>Imperium Romanum</Text>
          {!trackConversation.done && <TouchableOpacity onPress={()=>{
              showModal();
              }}>
          <Image 
            source={require('../assets/TriangleRight.png')}
            resizeMode='contain' style={{marginVertical:(3)}}/>
        </TouchableOpacity>}
        {trackConversation.done && <TouchableOpacity onPress={()=>{_storeData('done')
                navigation.navigate("Summary")
              }}>
          <Image 
            source={require('../assets/TriangleRight.png')}
            resizeMode='contain' style={{marginVertical:(3)}}/>
        </TouchableOpacity>}
        </View>
      </View>
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={{flex:1, borderColor:'#1EA896',borderWidth:1,alignSelf:'center',backgroundColor:'white', justifyContent:'center', alignSelf:'center',margin:Responsive(25), width:'85%', maxHeight:Responsive(25), minHeight:Responsive(35), borderRadius:8, position:'absolute', left:0,right:0,top:Responsive(80)}}>
          <Text style={{fontSize:Responsive(12), alignSelf:'center', color:'#363130', marginHorizontal:Responsive(5)}}>Please finish the lesson before continuing!</Text>
        </View>
      </Modal>
      {/* <TouchableOpacity onPress={()=>{stopRecording(), console.log('stopping recording')}} style={{position:'absolute', bottom:40, left:screenCenter - 70}}>
        <Ionicons name="ios-stop-circle-sharp" size={46} style={{color:'#C70000'}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{startRecording(), console.log('recording')}} style={{position:'absolute', bottom:40, left:screenCenter}}>
        <Ionicons name="ios-mic-circle" size={46} style={{color:'#C70000'}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{isPLaying ? () => stopSound() : () => playSound() ,console.log('playing back recording')}} style={{position:'absolute', bottom:40, left:screenCenter + 70}}>
        <Ionicons name="play-circle" size={46} style={{color:'#C70000'}} />
      </TouchableOpacity> */}

      <View style={main.lessonContentArea} >
        <Text style={{alignSelf:'center', fontSize:15, marginTop:Responsive(12), fontWeight:'bold'}}>Repeat to complete the conversation</Text>
        <Text style={{alignSelf:'center', fontSize:15, marginTop:Responsive(4), textAlign:'center'}}>Use the mic button to record, stop button to finish recording, and play button to listen to yourself!</Text>

        {trackConversation.one && <TouchableOpacity disabled={disabled.one} style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} onPress={()=>{sound1(), setDisabled({one:true}),setTimeout(()=>{
      setTrackConversation({one:false,two:true});
    }, 13000)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'white', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
          </TouchableOpacity>}
          {trackConversation.two && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled.two} style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} onPress={()=>{sound2(), setDisabled({two:true}),setTimeout(()=>{
                  setTrackConversation({two:false, three:true});
                }, 3000)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
          </View>
          }
          {trackConversation.three && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled.three} style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} onPress={()=>{sound3(), setDisabled({three:true}),setTimeout(()=>{
                  setTrackConversation({three:false, four:true});
                }, 5700)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'white',fontSize:14, maxWidth:bubbleWidth}}>In Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
          </View>
          }      
          {trackConversation.four && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>In Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled.four} style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} onPress={()=>{sound4(), setDisabled({four:true}),setTimeout(()=>{
                  setTrackConversation({four:false, five:true});
                }, 3000)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'black',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Eurōpã?</Text>
            </TouchableOpacity>
          </View>
          }     
          {trackConversation.five && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>In Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Eurōpã?</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled.five} style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} onPress={()=>{sound5(), setDisabled({five:true}),setTimeout(()=>{
                  setTrackConversation({five:false, six:true});
                }, 3400)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'white',fontSize:14, maxWidth:bubbleWidth}}>Est. In Eurōpã est imperium.</Text>
            </TouchableOpacity>
          </View>
          }     
          {trackConversation.six && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>In Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Eurōpã?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. In Eurōpã est imperium.</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled.six} style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} onPress={()=>{sound6(), setDisabled({six:true}),setTimeout(()=>{
                  setTrackConversation({six:false, seven:true});
                }, 3500)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'black',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Āfrica?</Text>
            </TouchableOpacity>
          </View>
          }     
          {trackConversation.seven && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>In Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Eurōpã?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. In Eurōpã est imperium.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Āfrica?</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled.seven} style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} onPress={()=>{sound7(), setDisabled({seven:true}),setTimeout(()=>{
                  setTrackConversation({seven:false, eight:true});
                }, 4000)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'white',fontSize:14, maxWidth:bubbleWidth}}>Est. In Āfrica est imperium.</Text>
            </TouchableOpacity>
          </View>
          }     
          {trackConversation.eight && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>In Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Eurōpã?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. In Eurōpã est imperium.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Āfrica?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. In Āfrica est imperium.</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled.eight} style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} onPress={()=>{sound8(), setDisabled({eight:true}),setTimeout(()=>{
                  setTrackConversation({eight:false, nine:true});
                }, 3400)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'black',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Asia?</Text>
            </TouchableOpacity>
          </View>
          }     
          {trackConversation.nine && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>In Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Eurōpã?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. In Eurōpã est imperium.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Āfrica?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. In Āfrica est imperium.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Asia?</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled.nine} style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} onPress={()=>{sound9(), setDisabled({nine:true}),setTimeout(()=>{
                  setTrackConversation({nine:false, done:true});
                }, 4100)}}>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'white',fontSize:14, maxWidth:bubbleWidth}}>Est. Et in Asia est imperium.</Text>
            </TouchableOpacity>
          </View>
          }     
          {trackConversation.done && <View><TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070', fontSize:14, maxWidth:bubbleWidth}}>Quid est? Ecce, est imperium Romanum. Imperium in Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Ubi est imperium Romanum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>In Eurōpã, in Āfrica, in Asia est.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Eurōpã?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. In Eurōpã est imperium.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Āfrica?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. In Āfrica est imperium.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'white', alignSelf:'flex-start', borderRadius:Responsive(8), marginTop:Responsive(12), marginLeft:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Estne imperium in Asia?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'flex-end', borderRadius:Responsive(8), marginTop:Responsive(12), marginRight:Responsive(10)}} disabled='true'>
                <Text style={{marginHorizontal:Responsive(14), marginVertical:Responsive(8), color:'#707070',fontSize:14, maxWidth:bubbleWidth}}>Est. Et in Asia est imperium.</Text>
            </TouchableOpacity>
          </View>
          }     
      </View>
      {trackConversation.done && <View style={main.lessonNavButtonArea}> 
        <TouchableOpacity style={main.lessonContinueButton}
                onPress={()=>{_storeData('done')
                navigation.navigate("Summary")
                }}>
            <Text style={main.lessonContinueButtonText}>
                CONTINUE
            </Text>
        </TouchableOpacity> 
      </View>} 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  GrammarScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column'
  },
  descriptionText: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "center",
    color: 'black',
    fontSize: 16
  },
  brownHighlightedText: {
    color: "#FFFFFF",
    backgroundColor: "#ABA194",
    fontSize: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10
  }
});

export default ReviewConversationScreen;