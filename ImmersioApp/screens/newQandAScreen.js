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

function newQandAScreen() {

  const [sound, setSound] = useState();

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

  async function playExerciseComplete() {
    console.log('loading sound');
    const {sound} = await Audio.Sound.createAsync(require('../assets/exercise-complete.mp3'));
    setSound(sound);

    console.log('playing sound');
    await sound.playAsync();
     
  }
  
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    setTimeout(()=>{
      setModalVisible(false);
    }, 3000);
  };

  const navigation = useNavigation();

  const [trackQuestions, setTrackQuestions] = useState({
      one:true,
      two:false,
      three:false,
      four:false,
      done:false
  })

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
                  
                  <Text style = {{fontSize: 18, color: 'rgba(70,70,70,1)'}}>Imperium Rōmānum</Text>
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

const [questionColor1, setQuestionColor1] = useState('#DADADA')

const wrongAnswer1 = () => {
    setQuestionColor1('#F88989');
    setTimeout(()=>{
      setQuestionColor1('#DADADA');
    }, 1500);
  };

const [questionColor2, setQuestionColor2] = useState('#DADADA')

const wrongAnswer2 = () => {
    setQuestionColor2('#F88989');
    setTimeout(()=>{
      setQuestionColor2('#DADADA');
    }, 1500);
  };

const [questionColor3, setQuestionColor3] = useState('#DADADA')

const wrongAnswer3 = () => {
    setQuestionColor3('#F88989');
    setTimeout(()=>{
      setQuestionColor3('#DADADA');
    }, 1500);
  };

  const [correctColor1, setCorrectColor1] = useState('#DADADA')

  const correctAnswer1 = () => {
      setCorrectColor1('#A3E479');
      setTimeout(()=>{
        setTrackQuestions({one:false,two:true})
      }, 1200);
    };

  const [correctColor2, setCorrectColor2] = useState('#DADADA')

  const correctAnswer2 = () => {
      setCorrectColor2('#A3E479');
      setTimeout(()=>{
        setTrackQuestions({one:false,two:false,three:true})
      }, 1200);
    };

  const [correctColor3, setCorrectColor3] = useState('#DADADA')

  const correctAnswer3 = () => {
      setCorrectColor3('#A3E479');
      setTimeout(()=>{
        setTrackQuestions({one:false,two:false,three:false,four:true})
      }, 1200);
    };

  const [correctColor4, setCorrectColor4] = useState('#DADADA')

  const correctAnswer4 = () => {
      setCorrectColor4('#A3E479');
      setTimeout(()=>{
        setTrackQuestions({one:false,two:false,three:false,four:false,done:true})
      }, 1200);
    };

return (
  <SafeAreaView style={main.safeAreaContainer}>
    <View style={{height:'6%',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#ABA194'}}>
      <View style={main.lessonTitleBar}>
      <TouchableOpacity onPress={()=>{
              navigation.navigate("Ubi est?")
              }}>
          <Image 
            source={require('../assets/TriangleLeft.png')}
            resizeMode='contain' style={{marginVertical:(3)}}/>
        </TouchableOpacity>
        <Text style={main.lessonTitleText}>{lessonTitle}</Text>
        {!trackQuestions.done && <TouchableOpacity onPress={()=>{
              showModal();
              }}>
          <Image 
            source={require('../assets/TriangleRight.png')}
            resizeMode='contain' style={{marginVertical:(3)}}/>
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
    <View>
        <Text style={{color:'#363130', alignSelf:'center', fontWeight:'bold', fontSize:16, paddingVertical:Responsive(12)}}>
            Look at the image & select the best answer
        </Text>
        {trackQuestions.one && <Image 
            style={{alignSelf:'center' ,width: 400, height: 150}}
            source={require('../assets/map.png')}
            resizeMode='contain'
        />}
        {trackQuestions.two && <Image 
            style={{alignSelf:'center' ,width: 400, height: 150}}
            source={require('../assets/europa.png')}
            resizeMode='contain'
        />}
        {trackQuestions.three && <Image 
            style={{alignSelf:'center' ,width: 400, height: 150}}
            source={require('../assets/asia.png')}
            resizeMode='contain'
        />}
        {(trackQuestions.four || trackQuestions.done) && <Image 
            style={{alignSelf:'center' ,width: 400, height: 150}}
            source={require('../assets/africa.png')}
            resizeMode='contain'
        />}
        <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={{flex:1, borderColor:'#1EA896',borderWidth:1,alignSelf:'center',backgroundColor:'white', justifyContent:'center', alignSelf:'center',margin:Responsive(25), width:'85%', maxHeight:Responsive(25), minHeight:Responsive(35), borderRadius:8, position:'absolute', left:0,right:0,top:Responsive(80)}}>
          <Text style={{fontSize:Responsive(12), alignSelf:'center', color:'#363130', marginHorizontal:Responsive(5)}}>Please finish the lesson before continuing!</Text>
        </View>
      </Modal>
        <Text style={{alignSelf:'center', color:'#363130', paddingTop:Responsive(12), marginBottom:Responsive(8),fontSize:14, fontWeight:'bold'}}>Quid est?</Text>
        {trackQuestions.one && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est</Text>
                <TextInput editable={false} style={{marginLeft:Responsive(8),
                                                    width: 80,
                                                    height: 25,
                                                    textAlign:'center',
                                                    backgroundColor:'#DADADA',
                                                    borderRadius: 4}}/>    
            </View>
            <View style={{alignSelf:'center', marginTop:Responsive(150)}}>
                <TouchableOpacity onPress={()=>{correctAnswer1(),playCorrectSound()}}
                    style={{justifyContent:'center', backgroundColor:correctColor1, borderRadius:4, marginBottom:Responsive(9)}}>
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), marginHorizontal:Responsive(8)}}>Imperium Rōmānum</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{wrongAnswer1(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor1, borderRadius:4, marginBottom:Responsive(9)}}>
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Āfrica</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{wrongAnswer2(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor2, borderRadius:4, marginBottom:Responsive(9)}}>                    
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Eurōpa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{wrongAnswer3(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor3, borderRadius:4, marginBottom:Responsive(9)}}>
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Asia</Text>
                </TouchableOpacity>
            </View>
        </View>}
        {trackQuestions.two && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Imperium Rōmānum</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est</Text>
                <TextInput editable={false} style={{marginLeft:Responsive(8),
                                                    width: 80,
                                                    height: 25,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4}}/>
            </View>
            <View style={{alignSelf:'center', marginTop:Responsive(155)}}>
                <TouchableOpacity onPress={()=>{wrongAnswer1(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor1, borderRadius:4, marginBottom:Responsive(9)}}>
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), marginHorizontal:Responsive(55), alignSelf:'center'}}>Āfrica</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{correctAnswer2(), playCorrectSound()}} style={{justifyContent:'center', backgroundColor:correctColor2, borderRadius:4, marginBottom:Responsive(9)}}>
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Eurōpa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{wrongAnswer2(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor2, borderRadius:4, marginBottom:Responsive(9)}}>                    
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Asia</Text>
                </TouchableOpacity>
            </View>
        </View>}
        {trackQuestions.three && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Imperium Rōmānum</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Eurōpa</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est</Text>
                <TextInput editable={false} style={{marginLeft:Responsive(8),
                                                    width: 80,
                                                    height: 25,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4}}/>
            </View>
            <View style={{alignSelf:'center', marginTop:Responsive(118)}}>
                <TouchableOpacity onPress={()=>{wrongAnswer2(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor2, borderRadius:4, marginBottom:Responsive(9)}}>                    
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), marginHorizontal:Responsive(55), alignSelf:'center'}}>Āfrica</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{correctAnswer3(), playCorrectSound()}} style={{justifyContent:'center', backgroundColor:correctColor3, borderRadius:4, marginBottom:Responsive(9)}}>
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Asia</Text>
                </TouchableOpacity>
            </View>
        </View>}
        {trackQuestions.four && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Imperium Rōmānum</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Eurōpa</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Asia</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est</Text>
                <TextInput editable={false} style={{marginLeft:Responsive(8),
                                                    width: 80,
                                                    height: 25,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4}}/>
            </View>
            <View style={{alignSelf:'center', marginTop:Responsive(85)}}>
                <TouchableOpacity onPress={()=>{correctAnswer4(), playExerciseComplete()}} style={{justifyContent:'center', backgroundColor:correctColor4, borderRadius:4}}>
                    <Text style={{color:'#595959', fontWeight:'bold', marginVertical:Responsive(6), marginHorizontal:Responsive(55), alignSelf:'center'}}>Āfrica</Text>
                </TouchableOpacity>
            </View>
        </View>}
        {trackQuestions.done && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Imperium Rōmānum</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Eurōpa</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Asia</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7)}}>Ecce, est Āfrica</Text>
                <AntDesign name="checksquare" size={24} style={{marginLeft:Responsive(18), color:"#1EA896"}} />
            </View>
        </View>}
    </View>
    {trackQuestions.done && <View>
            <Text style={{alignSelf:'center', fontWeight:'bold', color:'#1EA896', fontSize:25, marginTop:Responsive(22)}}>100%</Text>
            <Text style={{alignSelf:'center', color:'#1EA896', fontSize:20, marginTop:Responsive(8)}}>Well done!</Text>
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'center', borderRadius:4, marginTop:Responsive(55)}}
              onPress={()=>{_storeData('done');
              navigation.navigate("Ubi est")
              }}>
          <Text style={{alignSelf:'center', color:'white', marginVertical:Responsive(10), marginHorizontal:Responsive(90)}}>
              CONTINUE
          </Text>
      </TouchableOpacity>
        </View>}
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
export default newQandAScreen;
