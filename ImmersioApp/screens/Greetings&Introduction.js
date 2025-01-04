import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Dimensions, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import MenuIcon3 from '../components/MenuIcon3';
import main from '../styles/main';
import Responsive from '../components/responsive';
import { MaterialIcons } from '@expo/vector-icons'

const deviceWidth = Dimensions.get('window').width;
const videoHeight = deviceWidth/1.78;

function ClassicalStudiesScholarScreen() {
    const navigation = useNavigation();
    //TODO: insert code to retrieve description and image from database
    var title = "Dialogue context"
    var lessonTitle = 'Introducing yourself'
    var lessonIntroDescription1 = "Rachel and Ben meet for the first time at a ceremony. Pay attention to how Rachel and Ben ask their questions."
    var lessonIntroDescription2 = ""
    var lessonIntroImage = '../assets/Cree/Moose_Cree_Intro.mp4'

    const [isVideo, trackVideo] = useState({
      playing: true,
      finished: false,
    })

    useEffect(() => {
      navigation.setOptions({
        headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon3 />
      });
    });

    const video = React.useRef(null);

    const [playVideo, setPlayVideo] = useState(false);

    useEffect(()=> {
      setTimeout(()=>{setPlayVideo(true); }, 1);
    });

    async function onPlaybackStatusUpdate(playbackStatus) {
      if (playbackStatus.didJustFinish){
        console.log('Terminó el video')
        trackVideo({finished: true})
      }
    }


     /*_onPlaybackStatusUpdate = playbackStatus => {
      if (playbackStatus.didJustFinish)
        console.log('Terminó el video')
    };*/
  
    return (
      <SafeAreaView style={main.safeAreaContainer}>
        <View style={main.lessonNameAreaLatin}>
        <View style={main.lessonTitleBar}>
          <TouchableOpacity onPress={()=>{
                navigation.navigate("Topic Cree")
                }}>
            <Image
              source={require('../assets/TriangleLeft.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}} />
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>{lessonTitle}</Text>
          <TouchableOpacity onPress={()=>{
                stopSound();
                navigation.navigate("Kâ")
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
                source={{ uri: 'https://immersio.io/learn/wp-content/uploads/h5p/content/6/videos/sources-61244931549e9.mp4', }}
                useNativeControls
                resizeMode="cover"
                shouldPlay={playVideo}
                style={styles.image}
                onPlaybackStatusUpdate={(playbackStatus) => onPlaybackStatusUpdate(playbackStatus)}
                />
            <Text style={{fontSize: Responsive(18),color:'gray', fontWeight:'bold', marginLeft:Responsive(15), marginVertical:Responsive(18), alignSelf:'flex-start'}}>{title}</Text>
            <Text style={{fontSize: Responsive(14),color:'gray', marginHorizontal:Responsive(18), marginBottom:Responsive(15)}}>{lessonIntroDescription1}</Text>
            <Text style={{fontSize: Responsive(14),color:'gray', marginHorizontal:Responsive(18)}}>{lessonIntroDescription2}</Text>
          </View>
        </View>
        <View style={main.lessonNavButtonArea}> 
          { isVideo.finished && <TouchableOpacity style={main.lessonContinueButton}
                  onPress={()=>{
                    video.current.pauseAsync(),
                    navigation.navigate("Introducing yourself")
                  }}>
              <Text style={main.lessonContinueButtonText}>
                  Continue
              </Text>
          </TouchableOpacity> }
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
      alignSelf: 'center',
      width: deviceWidth,
      height: videoHeight
    }
  });
  
  
  export default ClassicalStudiesScholarScreen;