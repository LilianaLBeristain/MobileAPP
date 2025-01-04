import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { render } from 'react-dom';
import Responsive from '../components/responsive';

const _storeData = async (value) => {
  try {
  //we have to wait until AsyncStorage.setItem() returns a promise
  var key = 'videoScreen'
  await AsyncStorage.setItem(key, value);
  console.log('stored video screen')
 
  } catch (error) {
  console.log(error);
  }
  };

const deviceWidth = Dimensions.get('window').width;
const videoHeight = deviceWidth/1.78;

function VideoScreen() {
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [playVideo, setPlayVideo] = useState(false);

    useEffect(()=> {
      setTimeout(()=>{setPlayVideo(true); }, 1);
    });
  const [status, setStatus] = React.useState({});
  var lessonTitle = 'UBI EST ROMA?'

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });

  _onPlaybackStatusUpdate = playbackStatus => {
      if (playbackStatus.didJustFinish)
        console.log('Terminó el video')
    };
  
  
    return (
      <SafeAreaView style={main.safeAreaContainer}>
        <View style={main.lessonNameArea}>
          <View style={main.lessonTitleBar}>
            <TouchableOpacity onPress={()=>{
                  navigation.navigate("Topic")
                  }}>
              <Image 
                source={require('../assets/TriangleLeft.png')}
                resizeMode='contain' 
                style={{marginVertical:Responsive(3)}}/>
            </TouchableOpacity>
            <Text style={main.lessonTitleText}>{lessonTitle}</Text>
            <TouchableOpacity onPress={()=>{_storeData('done');
                  video.current.pauseAsync(),
                  navigation.navigate("Imperium Romanum")
                  }}>
              <Image 
                source={require('../assets/TriangleRight.png')}
                resizeMode='contain'
                style={{marginVertical:Responsive(3)}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={main.lessonContentArea}>
          <View style={styles.container}>
            <Video
              ref={video}
              style={styles.video}
              source={require('../assets/ubiestroma.mp4')}
              useNativeControls
              resizeMode="contain"
              shouldPlay={playVideo}
              isLooping={false}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            {/* Commenting out for now - can delete later if truly no longer necessary
            <View style={styles.buttons}>
              <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                  status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
              />
            </View>
            */}
            <Text style={{fontWeight:'bold', fontSize:Responsive(18), color:'#433E3D', marginLeft:Responsive(15), marginTop:Responsive(15)}}>Dialogue context</Text>
            <Text style={{fontSize:Responsive(17), color:'#433E3D', marginHorizontal:Responsive(20), marginTop:Responsive(15)}}>Marcus and Julia discuss about the Roman Empire on the map. Now listen to the conversation and learn:</Text>
            <Text style={{fontSize:Responsive(17), color:'#433E3D', marginHorizontal:Responsive(25), marginTop:Responsive(15)}}>- How Marcus introduces the Roman Empire on the map.</Text>
            <Text style={{fontSize:Responsive(17), color:'#433E3D', marginHorizontal:Responsive(25), marginTop:Responsive(15)}}>- How Julia asks where places are.</Text>
            <Text style={{fontSize:Responsive(17), color:'#433E3D', marginHorizontal:Responsive(25), marginTop:Responsive(15)}}>- How Marcus answers her questions.</Text>
          </View>
        </View>
        <View style={main.lessonNavButtonArea}> 
          <TouchableOpacity style={main.lessonContinueButton}
                  onPress={()=>{_storeData('done');
                  video.current.pauseAsync(),
                  navigation.navigate("Imperium Romanum")
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
    alignContent: 'center'
  },
  video: {
    alignSelf: 'center',
    width: deviceWidth,
    height: videoHeight
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: "center",
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    marginTop: 20
  }
});

export default VideoScreen;
