import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Button, Image, StyleSheet, SafeAreaView, ScrollView, Alert, Modal} from 'react-native';
import { TextInput, Animated } from 'react-native';
import { useState } from 'react';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Video, AVPlaybackStatus } from 'expo-av';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_CONSTANT } from 'expo-av/build/Audio';
import Responsive from '../components/responsive';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

function App() {
  const [sound, setSound] = useState();
  var lessonTitle = 'Introducing yourself'
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });

  const showModal = () => {
    setModalVisible(true);
    setTimeout(()=>{
      setModalVisible(false);
    }, 3000);
  };

  const [trackQuestions, setTrackQuestions] = useState({
      one:true,
      two:false,
      three:false,
      four:false,
      done:false
  })

  async function playCorrectSound() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/correct-answer.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
  }

  async function playWrongSound() {
        console.log('loading sound');
        const {sound} = await Audio.Sound.createAsync(require('../assets/wrong-answer.mp3'));
        setSound(sound);

        console.log('playing sound');
        await sound.playAsync();
  }

  const [questionColor1, setQuestionColor1] = useState('white')

const wrongAnswer1 = () => {
    setQuestionColor1('#F88989');
    setTimeout(()=>{
      setQuestionColor1('white');
    }, 1500);
  };

  const [correctColor1, setCorrectColor1] = useState('white')

  const correctAnswer1 = () => {
      setCorrectColor1('#A3E479');

      setTimeout(()=>{
         navigation.navigate("Wâciye")
      }, 1000);
    };

  return (
    <SafeAreaView style={main.safeAreaContainer}>
      <View style={{height:'8%',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#956424'}}>
        <View style={main.lessonTitleBar}>
        <TouchableOpacity 
            onPress={()=>{ navigation.navigate("Kîla") }}>
            <Image 
              source={require('../assets/TriangleLeft.png')}
              resizeMode='contain' style={{marginVertical:(3)}}/>
          </TouchableOpacity>
            <Text style={main.lessonTitleText}>{lessonTitle}</Text>
            {!trackQuestions.done && <TouchableOpacity onPress={()=>{
               showModal(); }}>
            { /*<Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:(3)}}/>*/}
          </TouchableOpacity>}
          {trackQuestions.done && <TouchableOpacity onPress={()=>{
                _storeData('done');
                navigation.navigate("Ubi est")
                }}>
            <Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:(3)}}/>
          </TouchableOpacity>}
        </View>
      </View>


    {
      <View>
        <Text style={{color:'gray', alignSelf:'center', marginTop: 100, fontSize:23, paddingVertical:Responsive(12)}}>
            1. "Hello" is...
        </Text>

        {trackQuestions.one && <View>
            <View style={{alignSelf:'center', marginTop:Responsive(110)}}>
                <TouchableOpacity onPress={()=>{ wrongAnswer1(), playWrongSound() }}
                    style={{justifyContent:'center', backgroundColor:questionColor1, borderRadius:4, marginBottom:Responsive(9), width: 250, height: 38,
                    shadowColor: "gray",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 8,
                  }}>
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Kâ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{correctAnswer1(),playCorrectSound()}}
                    style={{justifyContent:'center', backgroundColor:correctColor1, borderRadius:4, marginBottom:Responsive(9), width: 250, height: 38,
                    shadowColor: "gray",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 8,}}>
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), marginHorizontal:Responsive(8), alignSelf:'center'}}>Wâciye</Text>
                </TouchableOpacity>         
            </View>
        </View>}
      </View>
    }

    <View style={{marginTop: 170}}>
      <Text style={{color:'#FD6100', alignSelf:'center', marginTop: 100, fontSize:16, paddingVertical:Responsive(12), fontWeight: 'bold'}}>
            Choose the correct answer
        </Text>
        <View style={{position: "absolute",
          justifyContent: 'center',
          borderRadius: 10,
          top: 100,
          left: 320,
          width:45, height: 45, padding:5}}>
          <Image 
              source={require('../assets/tap.png')}
              resizeMode='contain' style={{width:35}}/>
        </View>
    </View>

    </SafeAreaView>
  );
}

export default App;
