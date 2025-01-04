import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, Button, Image, StyleSheet, SafeAreaView, ScrollView, Modal} from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather } from '@expo/vector-icons';
import Responsive from '../components/responsive';
import { Audio } from 'expo-av';


function FillBlanksScreen() {

  const navigation = useNavigation();

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

  const [trackQuestions, setTrackQuestions] = useState({
    one:true,
    two:false,
    three:false,
    four:false,
    done:false
})

  const [oneAnswer, setOneAnswer] = useState(false);
  const [twoAnswer, setTwoAnswer] = useState(false);
  const [threeAnswer,setThreeAnswer] = useState(false);
  const [fourAnswer,setFourAnswer] = useState(false);


  const [correctAnswers, setCorrectAnswers] = useState({
    one:oneAnswer,
    two:twoAnswer,
    three:threeAnswer,
    four:fourAnswer,
    count:0
  })

  const answers = {oneAnswer1:"Ubi",
    oneAnswer2:"est",
    twoAnswer1:"imperium",
    twoAnswer2:"Africa",
    twoAnswer3:"Āfrica",
    threeAnswer1:'Ubi est',
    threeAnswer2:'In Europa',
    threeAnswer3:'In Eurōpa',
    fourAnswer1:'Ubi est imperium',
    fourAnswer2:'in',
    fourAnswer3:'in Africa',
    fourAnswer4:'in Āfrica'}

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });

  var list = [{ id: 0, question: 'Ubi est imperium Romanum?', answer: 'In Europa', show: true}, 
  { id: 1, question: 'Ubi est Aegyptus?', answer: 'In Africa', show: false},
  { id: 2, question: 'Ubi est ludaea?', answer: 'In Asia', show: false}];

  var lessonTitle = 'UBI EST ROMA?'

  
  //Keep track of whether all questions have been displayed or not
  const[done, setDone] = useState(false);
  
  
  //keep track of list of questions
  const [questions, updateQuestions] = useState(list);

  //Total number of questions in the list
  var total = questions.length;

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

  const _storeData = async (key,value) => {
    try {
    //we have to wait until AsyncStorage.setItem() returns a promise
    //var key = 'fillScreen'
    await AsyncStorage.setItem(key, value);
    
   
    } catch (error) {
    console.log(error);
    }
    };  

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
                {!disablePrevQs[i] ? <Text style = {{marginTop: 10, marginBottom: 10, color: 'rgba(70,70,70,1)', fontSize: 20, fontWeight: "bold", alignSelf: 'center'}}>{tmp.question}</Text>: null}
                <View style = {styles.userInputContainer}> 
                  <TextInput 
                          
                          placeholder = "Enter Your Answer" 
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

const [modalVisible, setModalVisible] = useState(false);

const showModal = () => {
  setModalVisible(true);
  setTimeout(()=>{
    setModalVisible(false);
  }, 3000);
};

const [modalVisible2, setModalVisible2] = useState(false);

const showModal2 = () => {
  setModalVisible2(true);
  setTimeout(()=>{
    setModalVisible2(false);
  }, 3000);
};

const video = React.useRef(null);
const [status, setStatus] = React.useState({});
const [temp1, setTemp1] = useState("");
const [temp2, setTemp2] = useState("");
const [temp3, setTemp3] = useState("");

const showPercentage = () => {
  return correctAnswers.count / 4 * 100;
}

return (
  <SafeAreaView style={main.safeAreaContainer}>
    <View style={{height:'6%',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#ABA194'}}>
      <View style={main.lessonTitleBar}>
      <TouchableOpacity onPress={()=>{
              navigation.navigate("Ubi est")
              }}>
          <Image 
            source={require('../assets/TriangleLeft.png')}
            resizeMode='contain' style={{marginVertical:Responsive(3)}}/>
        </TouchableOpacity>
        <Text style={main.lessonTitleText}>{lessonTitle}</Text>
        {!trackQuestions.done && <TouchableOpacity onPress={()=>{
              showModal2();
              }}>
          <Image 
            source={require('../assets/TriangleRight.png')}
            resizeMode='contain' style={{marginVertical:Responsive(3)}}/>
        </TouchableOpacity>}
        {trackQuestions.done && <TouchableOpacity onPress={()=>{
              _storeData('done');
              navigation.navigate("Estne")
              }}>
          <Image 
            source={require('../assets/TriangleRight.png')}
            resizeMode='contain' style={{marginVertical:Responsive(3)}}/>
        </TouchableOpacity>}
      </View>
    </View>
    <View>
      {/* <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={{flex:1, borderColor:'#1EA896',borderWidth:1,alignSelf:'center',backgroundColor:'white', justifyContent:'center', alignSelf:'center',margin:Responsive(25), width:'85%', maxHeight:Responsive(25), minHeight:Responsive(35), borderRadius:8, position:'absolute', left:0,right:0,bottom:Responsive(275)}}>
          <Text style={{fontSize:15, alignSelf:'center', color:'#363130', marginHorizontal:Responsive(5)}}>Oops! Please double check and try again.</Text>
        </View>
      </Modal> */}
      <Modal animationType="fade" transparent visible={modalVisible2}>
        <View style={{flex:1, borderColor:'#1EA896',borderWidth:1,alignSelf:'center',backgroundColor:'white', justifyContent:'center', alignSelf:'center',margin:Responsive(25), width:'85%', maxHeight:Responsive(25), minHeight:Responsive(35), borderRadius:8, position:'absolute', left:0,right:0,top:Responsive(80)}}>
          <Text style={{fontSize:Responsive(12), alignSelf:'center', color:'#363130', marginHorizontal:Responsive(5)}}>Please finish the lesson before continuing!</Text>
        </View>
      </Modal>
        <Text style={{color:'#363130', alignSelf:'center', fontWeight:'bold', fontSize:16, paddingVertical:Responsive(12), marginTop:Responsive(10)}}>
            Complete the sentences with the structure:
        </Text>
        <Text style={{alignSelf:'center', color:'#363130', paddingTop:Responsive(2), marginBottom:Responsive(8),fontSize:14}}>[Ubi est (place)? In (place) est (place)]</Text>
        {trackQuestions.one && <View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
               <TextInput maxLength={6} editable={true} onChangeText={(text)=>setTemp1(text)} autoCorrect={false} style={{marginRight:Responsive(6),
                                                    width: 45,
                                                    height: 20,
                                                    borderWidth: 0.3,
                                                    alignSelf:'center',
                                                    marginTop:Responsive(8),
                                                    borderRadius: 4,
                                                    fontSize:Responsive(13),
                                                    textAlign:'center'}}/>    
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>est Imperium? In Asia</Text>
                <TextInput maxLength={6} editable={true} onChangeText={(text)=>setTemp2(text)} autoCorrect={false} style={{marginHorizontal:Responsive(6),
                                                    width: 45,
                                                    height: 20,
                                                    borderWidth: 0.3,
                                                    alignSelf:'center',
                                                    marginTop:Responsive(9),
                                                    borderRadius: 4,
                                                    fontSize:Responsive(13),
                                                    textAlign:'center'}}/>    
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Imperium.</Text>
                {(!(temp1.toLowerCase() === answers.oneAnswer1.toLowerCase()) || !(temp2.toLowerCase() === answers.oneAnswer2.toLowerCase())) && <TouchableOpacity onPress={()=>{setTrackQuestions({one:false,two:true}), playWrongSound()}}>
                  <Image 
                    style={{alignSelf:'center' ,width: 22, height: 22, marginTop:Responsive(15), marginLeft:Responsive(8)}}
                    source={require('../assets/play-24.png')}
                    resizeMode='contain' />
                </TouchableOpacity>}
                {((temp1.toLowerCase() === answers.oneAnswer1.toLowerCase()) && (temp2.toLowerCase() === answers.oneAnswer2.toLowerCase())) && <TouchableOpacity onPress={()=>{setOneAnswer(true),setCorrectAnswers({count:correctAnswers.count+1}),setTrackQuestions({one:false,two:true}), playCorrectSound()}}>
                  <Image 
                    style={{alignSelf:'center' ,width: 22, height: 22, marginTop:Responsive(15), marginLeft:Responsive(8)}}
                    source={require('../assets/play-24.png')}
                    resizeMode='contain' />
                </TouchableOpacity>}
            </View>
            <Text style={{alignSelf:'center',color:'#1EA896', fontStyle:'italic',fontWeight:'bold',marginTop:Responsive(20), fontSize:Responsive(13)}}>[Imperium/Asia]</Text>
        </View>}
        {trackQuestions.two && <View>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Asia est imperium</Text>
                
                {oneAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!oneAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }
            </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est</Text>
                <TextInput maxLength={10} editable={true} onChangeText={(text)=>setTemp1(text)} autoCorrect={false} style={{marginLeft:Responsive(5),
                                                    marginRight:Responsive(3),
                                                    width: 70,
                                                    height: 20,
                                                    borderWidth: 0.3,
                                                    alignSelf:'center',
                                                    marginTop:Responsive(9),
                                                    borderRadius: 4,
                                                    fontSize:Responsive(13),
                                                    textAlign:'center'}}/>  
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>? In</Text>
                <TextInput maxLength={8} editable={true} onChangeText={(text)=>setTemp2(text)} autoCorrect={false} style={{marginHorizontal:Responsive(6),
                                                    width: 55,
                                                    height: 20,
                                                    borderWidth: 0.3,
                                                    alignSelf:'center',
                                                    marginTop:Responsive(9),
                                                    borderRadius: 4,
                                                    fontSize:Responsive(13),
                                                    textAlign:'center'}}/>  
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>est imperium.</Text>
                {(!(temp1.toLowerCase() === answers.twoAnswer1.toLowerCase()) || !((temp2.toLowerCase() === answers.twoAnswer2.toLowerCase()) || (temp2.toLowerCase() === answers.twoAnswer3.toLowerCase()))) && <TouchableOpacity onPress={()=>{setTrackQuestions({one:false,two:false,three:true}), playWrongSound()}}>
                  <Image 
                    style={{alignSelf:'center' ,width: 22, height: 22, marginTop:Responsive(15), marginLeft:Responsive(8)}}
                    source={require('../assets/play-24.png')}
                    resizeMode='contain' />
                </TouchableOpacity>}
                {((temp1.toLowerCase() === answers.twoAnswer1.toLowerCase()) && ((temp2.toLowerCase() === answers.twoAnswer2.toLowerCase()) || (temp2.toLowerCase() === answers.twoAnswer3.toLowerCase()))) && <TouchableOpacity onPress={()=>{setTwoAnswer(true),setCorrectAnswers({count:correctAnswers.count+1}) ,setTrackQuestions({one:false,two:false,three:true}), playCorrectSound()}}>
                  <Image 
                    style={{alignSelf:'center' ,width: 22, height: 22, marginTop:Responsive(15), marginLeft:Responsive(8)}}
                    source={require('../assets/play-24.png')}
                    resizeMode='contain' />
                </TouchableOpacity>}
            </View>
            <Text style={{alignSelf:'center',color:'#1EA896', fontStyle:'italic',fontWeight:'bold',marginTop:Responsive(20), fontSize:Responsive(13)}}>[Imperium/Āfrica]</Text>
        </View>}
        {trackQuestions.three && <View>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Asia est imperium</Text>
                
                {oneAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!oneAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Āfrica est imperium</Text>
                
                {twoAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!twoAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                
                <TextInput maxLength={9} editable={true} onChangeText={(text)=>setTemp1(text)} autoCorrect={false} style={{marginLeft:Responsive(5),
                                                    marginRight:Responsive(3),
                                                    width: 60,
                                                    height: 20,
                                                    borderWidth: 0.3,
                                                    alignSelf:'center',
                                                    marginTop:Responsive(9),
                                                    borderRadius: 4,
                                                    fontSize:Responsive(13),
                                                    textAlign:'center'}}/>  
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>imperium?</Text>
                <TextInput maxLength={11} editable={true} onChangeText={(text)=>setTemp2(text)} autoCorrect={false} style={{marginHorizontal:Responsive(6),
                                                    width: 70,
                                                    height: 20,
                                                    borderWidth: 0.3,
                                                    alignSelf:'center',
                                                    marginTop:Responsive(9),
                                                    borderRadius: 4,
                                                    fontSize:Responsive(13),
                                                    textAlign:'center'}}/>  
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>est imperium.</Text>
                {(!(temp1.toLowerCase() === answers.threeAnswer1.toLowerCase()) || !((temp2.toLowerCase() === answers.threeAnswer2.toLowerCase()) || (temp2.toLowerCase() === answers.threeAnswer3.toLowerCase()))) && <TouchableOpacity onPress={()=>{setTrackQuestions({one:false,two:false,three:false,four:true}), playWrongSound()}}>
                  <Image 
                    style={{alignSelf:'center' ,width: 22, height: 22, marginTop:Responsive(15), marginLeft:Responsive(8)}}
                    source={require('../assets/play-24.png')}
                    resizeMode='contain' />
                </TouchableOpacity>}
                {((temp1.toLowerCase() === answers.threeAnswer1.toLowerCase()) && ((temp2.toLowerCase() === answers.threeAnswer2.toLowerCase()) || (temp2.toLowerCase() === answers.threeAnswer3.toLowerCase()))) && <TouchableOpacity onPress={()=>{setThreeAnswer(true),setCorrectAnswers({count:correctAnswers.count+1}),setTrackQuestions({one:false,two:false,three:false,four:true}), playCorrectSound()}}>
                  <Image 
                    style={{alignSelf:'center' ,width: 22, height: 22, marginTop:Responsive(15), marginLeft:Responsive(8)}}
                    source={require('../assets/play-24.png')}
                    resizeMode='contain' />
                </TouchableOpacity>}
            </View>
            <Text style={{alignSelf:'center',color:'#1EA896', fontStyle:'italic',fontWeight:'bold',marginTop:Responsive(20), fontSize:Responsive(13)}}>[Imperium/Eurōpa]</Text>

        </View>}
        {trackQuestions.four && <View>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Asia est imperium</Text>
                
                {oneAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!oneAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                            </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Āfrica est imperium</Text>
                
                {twoAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!twoAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                            </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Eurōpa est imperium</Text>
                
                {threeAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!threeAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                            </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                
                <TextInput maxLength={18} editable={true} onChangeText={(text)=>setTemp1(text)} autoCorrect={false} style={{marginLeft:Responsive(5),
                                                    marginRight:Responsive(3),
                                                    width: 115,
                                                    height: 20,
                                                    borderWidth: 0.3,
                                                    alignSelf:'center',
                                                    marginTop:Responsive(9),
                                                    borderRadius: 4,
                                                    fontSize:Responsive(13),
                                                    textAlign:'center'}}/>  
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>? In Eurōpa et</Text>
                <TextInput maxLength={4} editable={true} onChangeText={(text)=>setTemp2(text)} autoCorrect={false} style={{marginHorizontal:Responsive(6),
                                                    width: 30,
                                                    height: 20,
                                                    borderWidth: 0.3,
                                                    alignSelf:'center',
                                                    marginTop:Responsive(9),
                                                    borderRadius: 4,
                                                    fontSize:Responsive(13),
                                                    textAlign:'center'}}/>  
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Asia et</Text>
                {(!(temp1.toLowerCase() === answers.fourAnswer1.toLowerCase()) || !(temp2.toLowerCase() === answers.fourAnswer2.toLowerCase()) || !((temp3.toLowerCase() === answers.fourAnswer3.toLowerCase()) || (temp3.toLowerCase() === answers.fourAnswer4.toLowerCase()))) && <TouchableOpacity onPress={()=>{setTrackQuestions({one:false,two:false,three:false,four:false,done:true}), playWrongSound()}}>
                  <Image 
                    style={{alignSelf:'center' ,width: 22, height: 22, marginTop:Responsive(15), marginLeft:Responsive(8)}}
                    source={require('../assets/play-24.png')}
                    resizeMode='contain' />
                </TouchableOpacity>}
                {((temp1.toLowerCase() === answers.fourAnswer1.toLowerCase()) && (temp2.toLowerCase() === answers.fourAnswer2.toLowerCase()) && ((temp3.toLowerCase() === answers.fourAnswer3.toLowerCase()) || (temp3.toLowerCase() === answers.fourAnswer4.toLowerCase()))) && <TouchableOpacity onPress={()=>{setFourAnswer(true), setCorrectAnswers({count:correctAnswers.count+1}) ,setTrackQuestions({one:false,two:false,three:false,four:false,done:true}),playExerciseComplete(), console.log(correctAnswers)}}>
                  <Image 
                    style={{alignSelf:'center' ,width: 22, height: 22, marginTop:Responsive(15), marginLeft:Responsive(8)}}
                    source={require('../assets/play-24.png')}
                    resizeMode='contain' />
                </TouchableOpacity>}
                </View>
                <View style={{flexDirection:'row', alignSelf:'center'}}>
                  <TextInput maxLength={11} editable={true} onChangeText={(text)=>setTemp3(text)} autoCorrect={false} style={{marginHorizontal:Responsive(6),
                                                      width: 65,
                                                      height: 20,
                                                      borderWidth: 0.3,
                                                      alignSelf:'center',
                                                      marginTop:Responsive(3),
                                                      borderRadius: 4,
                                                      fontSize:Responsive(13),
                                                      textAlign:'center'}}/>  
                  <Text style={{color:'gray', marginTop:Responsive(10), fontSize:Responsive(13)}}>est imperium.</Text>
            </View>
            <Text style={{alignSelf:'center',color:'#1EA896', fontStyle:'italic',fontWeight:'bold',marginTop:Responsive(20), fontSize:Responsive(13)}}>[Imperium/Eurōpa/Asia/Āfrica]</Text>
        </View>}
        {trackQuestions.done && <View>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Asia est imperium</Text>
                
                {oneAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!oneAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                            </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Āfrica est imperium</Text>
                
                {twoAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!twoAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                            </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Eurōpa est imperium</Text>
                
                {threeAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!threeAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                            </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(16), fontSize:Responsive(13)}}>Ubi est imperium? In Eurōpa et in Asia et in</Text>
                
                {fourAnswer && <AntDesign name="checksquare" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"#1EA896"}} /> }
                {!fourAnswer && <Feather name="x-square" size={20} style={{marginLeft:Responsive(8), marginTop:Responsive(12),color:"red"}} /> }            
                            </View>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={{color:'gray', marginTop:Responsive(6), fontSize:Responsive(13)}}>Āfrica est imperium.</Text>
            </View>
        </View>}
    </View>
    {trackQuestions.done && <View>
            <Text style={{alignSelf:'center', fontWeight:'bold', color:'#1EA896', fontSize:25, marginTop:Responsive(100)}}>{showPercentage()}%</Text>
            {(showPercentage() < 100) && <Text style={{alignSelf:'center', color:'#1EA896', fontSize:Responsive(14), marginTop:Responsive(8), marginHorizontal:Responsive(30)}}>Please study the solutions above and try again!</Text>}
            {(showPercentage() < 100) && <TouchableOpacity style={{marginTop: Responsive(10),backgroundColor:'#AB0000', alignSelf:'center', borderRadius:14}}
                                            onPress={()=>{setCorrectAnswers({count:0}), setOneAnswer(false), setTwoAnswer(false), setThreeAnswer(false), setFourAnswer(false), setTrackQuestions({one:true})}}> 
              <Text style={{alignSelf:'center', color:'white', fontSize:20, marginVertical:Responsive(3), marginHorizontal:Responsive(8)}}>
                Retry?
              </Text>
            </TouchableOpacity>}
            {(showPercentage() === 100) && <Text style={{alignSelf:'center', color:'#1EA896', fontSize:20, marginTop:Responsive(8)}}>Well done!</Text>}
            <TouchableOpacity style={{backgroundColor:'#1EA896', alignSelf:'center', borderRadius:4, marginTop:Responsive(110)}}
              onPress={()=>{_storeData('done');
              navigation.navigate("Estne")
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
      width: 300,
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
export default FillBlanksScreen;
