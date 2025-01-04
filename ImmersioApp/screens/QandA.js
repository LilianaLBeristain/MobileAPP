import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Button, Image, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Video, AVPlaybackStatus } from 'expo-av';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_CONSTANT } from 'expo-av/build/Audio';

const _storeData = async (value) => {
  try {
  //we have to wait until AsyncStorage.setItem() returns a promise
  var key = 'reviewScreen'
  await AsyncStorage.setItem(key, value);

  console.log('stored review screen')
 
  } catch (error) {
  console.log(error);
  }
  };

function QandAScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });

  var list = [{ id: 0, question: 'Quid est?', answer: 'Ecce', show: true}];

  var lessonTitle = 'UBI EST ROMA?'

  //keep track of list of questions
  const [questions, updateQuestions] = useState(list);

  //Total number of questions in the list
  var total = questions.length;


  //Keep track of whether all questions have been displayed or not
  const[done, setDone] = useState(false);

  //keep track of number of questions displayed
  const [count, setCount] = useState(1);

  //keep track of text input (user's answers)
  const [userAnswers, updateAnswers] = useState(new Array(total));

  //keep track of right answers

  let checks = new Array(total); for (let i=0; i<total; ++i) checks[i] = false;
  const [rightAnswers, updateRightAnswers] = useState(checks);

  //keep track of icon states
  
  var listOfIcons = new Array(total); for (let i=0; i<total; ++i) listOfIcons[i] = require("../assets/play-24.png");
  const [icons, updateIconsSources] = useState(listOfIcons);

  //disable past questions
  const[disablePrevQs, updatedisablePrevQs] = useState(checks);

  //keep track of number of right answers
  const[totalRightAnswers, updateTotalRightAnswers] = useState(0);

const onClickHandler = (i,answer) => {

    let update = questions.slice();
    let updateChecks = rightAnswers.slice();
    let updateIcons = icons.slice(); 
    let updatePrevQs = disablePrevQs.slice();

    updatePrevQs[i] = true;
   
    if(answer == questions[i].answer) {
        updateChecks[i] = true;
        updateIcons[i] = require("../assets/tick22.png");
        updateTotalRightAnswers(totalRightAnswers + 1);

    }
    else {
        updateIcons[i] = require("../assets/cross22.png");

    }
    updateIconsSources(updateIcons);
    updateRightAnswers(updateChecks);
    updatedisablePrevQs(updatePrevQs);

    if(count < total){

        update[i+1].show = true;
        setCount(count + 1);
        updateQuestions(update);

    }
    else{
        Done();
    }
}

const Done = () => {

    setDone(true);

}

const listOfQuestions = () => {

    
    return questions.map(function(tmp, i){

      
        return tmp.show ? <View key={tmp.id}>
                <Text style = {{marginTop: 10, marginBottom: 10, color: 'rgba(70,70,70,1)', fontSize: 20, fontWeight: "bold", alignSelf: 'center'}}>{tmp.question}</Text>
                <View style = {styles.userInputContainer}> 
                  <TextInput 
                           
                          style={styles.userInput}
                          //style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                          onChangeText= {text => {
                                                  let update = userAnswers.slice();
                                                  update[i] = text;
                                                  updateAnswers(update);
                                              }}
                          editable={!disablePrevQs[i]} 
                          selectTextOnFocus={!disablePrevQs[i]}
                          backgroundColor = {disablePrevQs[i] ? 'rgba(245,245,245,1)': 'rgba(255,255,255,1)'}
                          borderColor = {disablePrevQs[i]? 'rgba(245,245,245,1)': 'rgba(175,175,175,1)'}
                          color = {disablePrevQs[i]? 'rgba(152,152,152,1)': 'rgba(52,52,52,1)'}
                        
                      />
                  
                  <Text style = {{fontSize: 18, color: 'rgba(70,70,70,1)'}}>imperium Romanum</Text>
                  <TouchableOpacity 
                      style = {{marginLeft: 10}}
                      disabled = {disablePrevQs[i]}                
                      id = {i}
                      onPress={() => {onClickHandler(i,userAnswers[i])}}>
                      <Image source={icons[i]}/>
                  </TouchableOpacity>
                </View> 
         
            </View> : null;
           
        
      });
}
const video = React.useRef(null);
const [status, setStatus] = React.useState({});

return (
  <SafeAreaView style={main.safeAreaContainer}>
    <View style={main.lessonNameArea}>
      <View style={main.lessonTitleBar}>
      <TouchableOpacity onPress={()=>{
              navigation.navigate("Select and Listen Activity 3")
              }}>
          <Image 
            source={require('../assets/TriangleLeft.png')}
            resizeMode='contain' />
        </TouchableOpacity>
        <Text style={main.lessonTitleText}>{lessonTitle}</Text>
        <TouchableOpacity onPress={()=>{
              _storeData('done');
              navigation.navigate("Grammar Lesson")
              }}>
          <Image 
            source={require('../assets/TriangleRight.png')}
            resizeMode='contain' />
        </TouchableOpacity>
      </View>
    </View>
    <View style={main.lessonContentArea}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{alignItems: 'center', top: 50}}>
            {listOfQuestions()}
            {done ? <View style = {{marginTop: 40, fontSize: 20, color: 'rgba(70,70,70,1)', flexDirection: 'row', alignSelf:'center',justifyContent: 'center', flexWrap: 'wrap'}}>

                      <Text style = {{fontSize: 20, color: 'rgba(70,70,70,1)',flexWrap: 'wrap', flexDirection: 'row'}}>We begin with </Text>
                      <Text style = {{fontSize: 20, color: 'rgba(70,70,70,1)',fontWeight: 'bold',flexWrap: 'wrap', flexDirection: 'row'}}>"Quid est?"</Text>
                      <Text style = {{fontSize: 20, color: 'rgba(70,70,70,1)',flexDirection: 'row'}}>, a question that asks what something is. The answer to this is</Text>
                      <Text style = {{fontSize: 20, color: 'rgba(70,70,70,1)',fontWeight: 'bold', flexDirection: 'row'}}> "ecce" </Text>
                    </View> : null }
        </View>
      </KeyboardAvoidingView>
    </View>
    <View style={main.lessonNavButtonArea}> 
      <TouchableOpacity style={main.lessonContinueButton}
              onPress={()=>{_storeData('done');
              navigation.navigate("Grammar Lesson")
              }}>
          <Text style={main.lessonContinueButtonText}>
              Continue
          </Text>
      </TouchableOpacity> 
    </View> 
  </SafeAreaView>
  );
}
const styles = StyleSheet.create(
  {
    userInputContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
   
    userInput:
    {
      marginBottom: 10,
      marginTop: 10,
      marginRight: 10,
      width: 80,
      height: 42,
      borderWidth: 1,
      textAlign:'center',
      borderRadius: 10,
      fontSize: 18,
     
    },
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(224,220,218,1)',
     
      
    },
    video: {
      
      alignSelf: 'center',
      width: 420,
      height: 300,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
   
  });
export default QandAScreen;
