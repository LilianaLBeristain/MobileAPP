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
     const [isVideo, trackVideo] = useState({
      playing: true,
      finished: false,
    })

    const navigation = useNavigation();
    //TODO: insert code to retrieve description and image from database
    var lessonIntroDescription1 = "Cree dialects differ in phonology and grammar. Most commonly dialects will aternate sounds - and the spelling of those sounds - in various Cree words. For example, Plains Cree speakers call their language nehiyawewin (using the letter y), whereas the Swampy Cree say nehinawewin (using the letter n instead of y). Due to the differences among dialects, Cree speakers in one part of the country might not understand Cree speakers in another."
    var lessonIntroDescription2 = "The Cree languages has influenced other indigenous languages, including Oji-Cree and Michif. While both languages include elements of Cree, they are typically considered distinct."
    var lessonIntroImage = '../assets/Cree/Moose_Cree_Intro.mp4'

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
  
    return (
      <SafeAreaView style={main.safeAreaContainer}>


        <View style={main.lessonContentArea} >
          <View style={styles.introductionScreen}>
            <Video 
                ref={video}
                source={require(lessonIntroImage)}
                useNativeControls
                resizeMode="cover"
                shouldPlay={playVideo}
                style={styles.image}
                onPlaybackStatusUpdate={(playbackStatus) => onPlaybackStatusUpdate(playbackStatus)}
                />
            <Text style={{fontSize: Responsive(18),color:'gray', fontWeight:'bold', marginLeft:Responsive(15), marginVertical:Responsive(18), alignSelf:'flex-start'}}>What you need to know:</Text>
            <Text style={{fontSize: Responsive(13),color:'gray', marginHorizontal:Responsive(18), marginBottom:Responsive(15)}}>{lessonIntroDescription1}</Text>
            <Text style={{fontSize: Responsive(13),color:'gray', marginHorizontal:Responsive(18)}}>{lessonIntroDescription2}</Text>
          </View>
        </View>
        <MaterialIcons name="file-download" size={30} style={{marginTop: Responsive(6), alignSelf:'center', color:"#008B8B"}} />
        <Text style={{alignSelf:'center', color:'#008b8b', fontSize:Responsive(12), marginBottom:Responsive(4)}}>Download Learning Guidelines</Text>
        <View style={main.lessonNavButtonArea}> 
          { isVideo.finished && <TouchableOpacity style={main.lessonContinueButton}
                  onPress={()=>{
                    video.current.pauseAsync(),
                    navigation.navigate("Topic Cree")
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