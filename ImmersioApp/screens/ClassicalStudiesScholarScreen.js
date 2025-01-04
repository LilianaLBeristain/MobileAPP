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
    var lessonIntroDescription1 = "The Classical Studies Scholar path is for you if you are interested in Classical Western studies, and you want to deeply understand the history, culture, people, ideas, and authors that gave rise to Western cultures today."
    var lessonIntroDescription2 = "The two languages you will learn are Classical Latin, as used in the late Roman Republic and early Empire, and Classical Greek as used throughout Greek city states before the conquests of Alexander the Great."
    var lessonIntroImage = '../assets/classical-study-scholar.mp4'

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
                />
            <Text style={{fontSize: Responsive(18),color:'gray', fontWeight:'bold', marginLeft:Responsive(15), marginVertical:Responsive(18), alignSelf:'flex-start'}}>What you need to know:</Text>
            <Text style={{fontSize: Responsive(14),color:'gray', marginHorizontal:Responsive(18), marginBottom:Responsive(15)}}>{lessonIntroDescription1}</Text>
            <Text style={{fontSize: Responsive(14),color:'gray', marginHorizontal:Responsive(18)}}>{lessonIntroDescription2}</Text>
          </View>
        </View>
        <MaterialIcons name="file-download" size={30} style={{marginTop: Responsive(6), alignSelf:'center', color:"#008B8B"}} />
        <Text style={{alignSelf:'center', color:'#008b8b', fontSize:Responsive(12), marginBottom:Responsive(4)}}>Download Learning Guidelines</Text>
        <View style={main.lessonNavButtonArea}> 
          <TouchableOpacity style={main.lessonContinueButton}
                  onPress={()=>{
                    video.current.pauseAsync(),
                    navigation.navigate("Topic")
                  }}>
              <Text style={main.lessonContinueButtonText}>
                  Continue
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
      alignSelf: 'center',
      width: deviceWidth,
      height: videoHeight
    }
  });
  
  
  export default ClassicalStudiesScholarScreen;