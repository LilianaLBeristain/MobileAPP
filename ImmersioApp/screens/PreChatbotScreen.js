import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { min } from 'react-native-reanimated';
import lessons from '../api/lessons';

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

function PreChatbotScreen() {
  const navigation = useNavigation();
  // code to retrieve lesson data from database when database is active on server is found in commented lines
  /*
  const [grammarText, setGrammarText] =  useState({});

  const loadText = async () => {
    await lessons.getGrammarActivityText(setGrammarText);
    return;
  }
  */

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
                navigation.navigate("Summary")
                }}>
            <Image 
              source={require('../assets/TriangleLeft.png')}
              resizeMode='contain' style={{marginVertical:(3)}}/>
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>Imperium Romanum</Text>
          <TouchableOpacity onPress={()=>{_storeData('done')
                navigation.navigate("Topic")
                navigation.navigate("Chat With Immersio", {screen:"Chat With Immersio"})
                }}>
            <Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:(3)}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={main.lessonContentArea} >
        <View style={{flex: 1, 
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center'}}>
          <Text style={{alignSelf:'center', fontSize:24, marginHorizontal:20}}>Let's ask Marcus where</Text>
          <Text style={{alignSelf:'center', fontSize:24, marginHorizontal:20}}>the Roman Empire is in Latin!</Text>
          
        </View>
      </View>
      <View style={main.lessonNavButtonArea}> 
        <TouchableOpacity style={main.lessonContinueButton}
                onPress={()=>{_storeData('done')
                navigation.navigate("Topic")
                navigation.navigate("Chat With Immersio", {screen:"Chat With Immersio"})
                }}>
            <Text style={main.lessonContinueButtonText}>
                START THE CONVERSATION
            </Text>
        </TouchableOpacity> 
      </View> 
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

export default PreChatbotScreen;