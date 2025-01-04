import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Modal, View, Text, Button, Image, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
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

function drill2() {

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
      five:false,
      six:false,
      done:false
  })

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });

  var list = [{ id: 0, question: 'Quid est?', answer: 'Ecce', show: true}];

  var lessonTitle = 'Introducing yourself'

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
        setTrackQuestions({one:false,two:false,three:false,done:true})
      }, 1200);
    };

  const [correctColor4, setCorrectColor4] = useState('#DADADA')

  const correctAnswer4 = () => {
      setCorrectColor4('#A3E479');
      setTimeout(()=>{
        setTrackQuestions({one:false,two:false,three:false,four:false,five:true})
      }, 1200);
    };

  const [correctColor5, setCorrectColor5] = useState('#DADADA')

  const correctAnswer5 = () => {
      setCorrectColor5('#A3E479');
      setTimeout(()=>{
        setTrackQuestions({one:false,two:false,three:false,four:false,five:false,six:true})
      }, 1200);
    };

  const [correctColor6, setCorrectColor6] = useState('#DADADA')

  const correctAnswer6 = () => {
      setCorrectColor6('#A3E479');
      setTimeout(()=>{
        setTrackQuestions({one:false,two:false,three:false,four:false,five:false,six:false,done:true})
      }, 1200);
    };

return (
  <SafeAreaView style={main.safeAreaContainer}>
    <View style={{height:'8%',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#956424', marginBottom:80}}>
        <View style={main.lessonTitleBar}>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                navigation.navigate("Moose Factory Nitôhcîn")
                }}>
                <Image 
                  source={require('../assets/TriangleLeft.png')}
                  resizeMode='contain' style={{marginVertical:Responsive(3)}}/>
          </TouchableOpacity>
          <Text style={main.lessonTitleText}>{lessonTitle}</Text>
          <TouchableOpacity onPress={()=>{
                _storeData('done'); 
                stopSound();
                navigation.navigate("tâni e-išinihkâsoyan?")
                }}>
            {/*<Image 
              source={require('../assets/TriangleRight.png')}
              resizeMode='contain' style={{marginVertical:Responsive(3)}}/>*/}
          </TouchableOpacity>
        </View>
      </View>



      <View>
        {trackQuestions.one && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
              
                <TextInput editable={false} style={{marginRight:Responsive(8),
                                                    marginTop:Responsive(33),
                                                    width: 150,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4}}/>    
                <Text style={{color:'gray', marginTop:Responsive(40), fontSize:18}}>nitišinihkâson</Text>
            </View>
            <View style={{alignSelf:'center', marginTop:Responsive(190)}}>
                <TouchableOpacity onPress={()=>{wrongAnswer3(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor3, borderRadius:4, marginBottom:Responsive(9), padding:8}}>
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Moose Factory</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{wrongAnswer2(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor2, borderRadius:4, marginBottom:Responsive(9), padding:8}}>                    
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>nitôhcîn</Text>
                </TouchableOpacity>                
                <TouchableOpacity onPress={()=>{correctAnswer1(),playCorrectSound()}}
                    style={{justifyContent:'center', backgroundColor:correctColor1, borderRadius:4, marginBottom:Responsive(9), padding:8}}>
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), marginHorizontal:Responsive(87)}}>Ben</Text>
                </TouchableOpacity>
            </View>
        </View>}

        {trackQuestions.two && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
              
                <TextInput editable={false} style={{marginRight:Responsive(8),
                                                    marginTop:Responsive(33),
                                                    width: 150,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4, color: 'green'}} value={'Ben'}/>    
                <Text style={{color:'gray', marginTop:Responsive(40), fontSize:18}}>nitišinihkâson</Text>
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7), fontSize:18}}>Môsonîwi-Miništikw nitôhcîn. </Text>
                <TextInput editable={false} style={{marginHorizontal:Responsive(8),
                                                    width: 100,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4}}/>
                <Text style={{color:'gray', marginTop:Responsive(7)}}></Text>                                  
            </View>
            <View style={{alignSelf:'center', marginTop:Responsive(150)}}>
                <TouchableOpacity onPress={()=>{wrongAnswer1(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor1, borderRadius:4, marginBottom:Responsive(9), padding:8}}>
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), marginHorizontal:Responsive(55), alignSelf:'center'}}>Moose Factory</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{wrongAnswer2(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor2, borderRadius:4, marginBottom:Responsive(9), padding:8}}>
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Wâciye</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{correctAnswer2(), playCorrectSound()}} style={{justifyContent:'center', backgroundColor:correctColor2, borderRadius:4, marginBottom:Responsive(9), padding:8}}>                    
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Nešta kîla?</Text>
                </TouchableOpacity>
            </View>
        </View>}
        {trackQuestions.three && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>              
                <TextInput editable={false} style={{marginRight:Responsive(8),
                                                    marginTop:Responsive(33),
                                                    width: 150,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4, color: 'green'}} value={'Ben'}/>    
                <Text style={{color:'gray', marginTop:Responsive(40), fontSize:18}}>nitišinihkâson</Text>
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7), fontSize:18}}>Môsonîwi-Miništikw nitôhcîn. </Text>
                <TextInput editable={false} style={{marginHorizontal:Responsive(8),
                                                    width: 100,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4, color: 'green'}} value={'Nešta kîla?'}/>
                <Text style={{color:'gray', marginTop:Responsive(7)}}></Text>                                  
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <TextInput editable={false} style={{marginHorizontal:Responsive(8),
                                                    width: 100,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4}}/>
                <Text style={{color:'gray', marginTop:Responsive(7), fontSize:18}}>nitôhcîn.</Text>                                   
            </View>
            <View style={{alignSelf:'center', marginTop:Responsive(140)}}>
                <TouchableOpacity onPress={()=>{wrongAnswer1(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor1, borderRadius:4, marginBottom:Responsive(9), padding:8}}>
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), marginHorizontal:Responsive(55), alignSelf:'center'}}>Nitišinihkâson</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{correctAnswer3(), playCorrectSound()}} style={{justifyContent:'center', backgroundColor:correctColor3, borderRadius:4, marginBottom:Responsive(9), padding:8}}>
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Kâpaskâsink</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{wrongAnswer2(), playWrongSound()}} style={{justifyContent:'center', backgroundColor:questionColor2, borderRadius:4, marginBottom:Responsive(9), padding:8}}>                    
                    <Text style={{color:'#956424', fontWeight:'bold', marginVertical:Responsive(6), alignSelf:'center'}}>Kâ</Text>
                </TouchableOpacity>
            </View>
        </View>}


        {trackQuestions.done && <View>
          <View style={{flexDirection:'row', alignSelf:'center'}}>              
                <TextInput editable={false} style={{marginRight:Responsive(8),
                                                    marginTop:Responsive(33),
                                                    width: 150,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4, color: 'green'}} value={'Ben'}/>    
                <Text style={{color:'gray', marginTop:Responsive(40), fontSize:18}}>nitišinihkâson</Text>
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <Text style={{color:'gray', marginTop:Responsive(7), fontSize:18}}>Môsonîwi-Miništikw nitôhcîn. </Text>
                <TextInput editable={false} style={{marginHorizontal:Responsive(8),
                                                    width: 100,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4, color: 'green'}} value={'Nešta kîla?'}/>
                <Text style={{color:'gray', marginTop:Responsive(7)}}></Text>                                  
            </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:Responsive(10)}}>
                <TextInput editable={false} style={{marginHorizontal:Responsive(8),
                                                    width: 150,
                                                    height: 35,
                                                    backgroundColor:'#DADADA',
                                                    textAlign:'center',
                                                    borderRadius: 4, color: 'green'}} value={'Kâpaskâsink'}/>
                <Text style={{color:'gray', marginTop:Responsive(7), fontSize:18}}>nitôhcîn.</Text>                                   
            </View>
        </View>}


    {trackQuestions.done && <View>
            <View style={{justifyContent:'center', height:60, marginTop:70, marginBottom:8}}>
                <Image source={require('../assets/star.png')}
              resizeMode='contain' style={{width:50, alignSelf:'center'}}/>
            </View>
            <Text style={{alignSelf:'center', fontWeight:'bold', color:'black', fontSize:25}}>100%</Text>
            <Text style={{alignSelf:'center', color:'#F5891C', fontSize:25, marginTop:Responsive(15), fontWeight:'bold'}}>Awesome!</Text>
            <TouchableOpacity style={{backgroundColor:'#F5891C', alignSelf:'center', borderRadius:10, marginTop:Responsive(75)}}
              onPress={()=>{_storeData('done');
              navigation.navigate("nešta kîla")
              }}>
          <Text style={{fontSize:25, alignSelf:'center', color:'white', marginVertical:Responsive(10), marginHorizontal:Responsive(90)}}>
              CONTINUE
          </Text>
      </TouchableOpacity>
        </View>}



      </View>




  </SafeAreaView>
  );
}
export default drill2;
