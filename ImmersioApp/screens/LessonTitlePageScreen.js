import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';

//store user progress

const _storeData = async (value) => {
  try {
  //we have to wait until AsyncStorage.setItem() returns a promise
  var key = 'lessonTitlePage'
  await AsyncStorage.setItem(key, value);
  console.log('stored lesson title page')
 
  } catch (error) {
  console.log(error);
  }
  };




function LessonTitlePageScreen() {
  const navigation = useNavigation();

  var lessonTopic = 'Imperium Romanum'
  var lessonTitle = 'Ubi est Roma?'
  var lessonPart = 'Pars 1'



  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon />
    });
  });

  return (
    <SafeAreaView style={main.safeAreaContainer}>
      <View style={styles.lessonTitlePageArea} >
        <View style={styles.lessonTitleBox}>
          <Text style={styles.topicText}> {lessonTopic} </Text>
          <Text style={styles.titleText}> {lessonTitle} </Text>
          <Text style={styles.partText}> {lessonPart} </Text>
        </View>
      </View>
      <View style={main.navigationButtonArea}> 
        <TouchableOpacity style={main.lessonContinueButton}
                onPress={()=>{
                _storeData('done'); 
                navigation.navigate("Lesson Introduction")
                }}>
            <Text style={main.lessonContinueButtonText}>
                Start
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
  lessonTitlePageArea: {
    flex: 0.85,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column'
  },
  lessonTitleBox:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EA896',
    width: '90%',
    aspectRatio: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  topicText: {
    fontSize: 22,
    color: '#846F55',
    fontWeight: 'bold',
    marginBottom: 5
  },
  titleText: {
    fontSize: 18,
    color: '#846F55',
    fontWeight: 'bold'
  },
  partText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 30
  }
});


export default LessonTitlePageScreen;