import React, { useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import topic from '../styles/topic';
import { TouchableOpacity } from 'react-native-gesture-handler';

let chosenTopic = "";



function LessonSummaryScreen() {

//keep track of user progress

var initial = {'lessonTitlePage': 0 , 'lessonIntro': 0, 'listen1Screen' : 0, 'listen2Screen' : 0 , 'listen3Screen' : 0, 'reviewScreen' : 0,'videoScreen' : 0,'grammarScreen' : 0, 'fillScreen' : 0 }

const[screensDone, updateScreensDone] = useState(initial);

//user progress in percentage 
const[userProgress, updateUserProgress] = useState(0);

  const navigation = useNavigation();

  const _storeData = async (key,value) => {
    try {
    //we have to wait until AsyncStorage.setItem() returns a promise
    //var key = 'fillScreen'
    await AsyncStorage.setItem(key, value);
    
   
    } catch (error) {
    console.log(error);
    }
    };
  
  const _retrieveData = async (key) => {
    try {
      var value = await AsyncStorage.getItem(key);
      if (value !== null) {
            // We have data!!
            if(value == 'done'){            
              return true;          
            }        
          }
      else{
            console.log(key,"screen not done");
            return false;
          }
        
      }
    catch (error) {
      console.log(error)
    }
  }; 
  
   
  //retrieve user progress
   const getProgress = async() => {
  
    var screens = ['lessonTitlePage', 'lessonIntro', 'listen1Screen', 'listen2Screen', 'listen3Screen', 'reviewScreen' ,'videoScreen' ,'grammarScreen' , 'fillScreen']
    
    screens.forEach(key => {
        _retrieveData(key).then((result)=>  {

          if(result){

            var obj = screensDone;
            obj[key] = 1;
            updateScreensDone(obj);
                
                var total = 0;

                for(var i in screensDone){
                  //console.log(screensDone[i]);
                  if(screensDone[i] == 1){

                    total = total + 1;
                    
                  }
                  
                }
                updateUserProgress((total*100/9));

              }
          });
           
    });

   
  };


  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
    });
    
    
  });

  useEffect(() => {getProgress()},[userProgress]);

var topicNamesList 
=  [
        { 'number': '01', 'latinTitle': 'Imperium Romanum', 'englishTitle': 'The Roman Empire', 'status': 'In Progress', 'unlocked': true, 'completed': true}, 
        { 'number': '02', 'latinTitle': 'Famila', 'englishTitle': 'The Roman Family', 'status': 'Not Started', 'unlocked': false, 'completed': false}, 
        { 'number': '03', 'latinTitle': 'Educatio', 'englishTitle': 'Child Rearing', 'status': 'Not Started', 'unlocked': false,  'completed': false}, 
        { 'number': '04', 'latinTitle': 'Manumissio', 'englishTitle': 'The Freeing of Slaves', 'status': 'Not Started', 'unlocked': false,'completed': false}, 
        { 'number': '05', 'latinTitle': 'Apud Villam', 'englishTitle': 'At the Estate', 'status': 'Not Started', 'unlocked': false, 'completed': false}, 
        { 'number': '06', 'latinTitle': 'Viae et Itinera', 'englishTitle': 'Roads and Journeys', 'status': 'Not Started', 'unlocked': false, 'completed': false}, 
        { 'number': '07', 'latinTitle': 'Donatio', 'englishTitle': 'Giving', 'status': 'Not Started', 'unlocked': false, 'completed': false}, 
        { 'number': '08', 'latinTitle': 'Tabernae', 'englishTitle': 'Shopping', 'status': 'Not Started', 'unlocked': false, 'completed': false}, 
        { 'number': '09', 'latinTitle': 'Natura et Fortuna', 'englishTitle': 'Nature and Fortune', 'status': 'Not Started', 'unlocked': false, 'completed': false}, 
        { 'number': '10', 'latinTitle': 'Dei et Homines', 'englishTitle': 'Gods and People', 'status': 'Not Started', 'unlocked': false, 'completed': false}, 
        { 'number': '11', 'latinTitle': 'Curatio', 'englishTitle': 'Healing', 'status': 'Not Started', 'unlocked': false, 'completed': false},
        { 'number': '12', 'latinTitle': 'Para Bellum', 'englishTitle': 'Prepare for Battle', 'status': 'Not Started', 'unlocked': false, 'completed': false}
    ];
  

  const [topicNames, updateTopicNames] = useState(topicNamesList);

  return (
    <SafeAreaView style={main.safeAreaContainer}>
        
        <View style={main.titleArea10}>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>Review your progress</Text>
        </View>
        <View style={main.contentArea75}>
            <ScrollView style={main.scrollView}>
                {
                    topicNames.map((item, index) =>(
                        <View key = {item.number} style={topic.listItem}>
                            <View style={item.completed ? topic.numberBoxCompleted : topic.numberBox}>
                                <Text style={topic.numberText}>{item.number}</Text>
                                <Text style={topic.statusText}>{item.status == 'In Progress'? (userProgress == 100 ? 'Completed' : item.status):item.status }</Text>
                            </View>
                            <View style={topic.descriptionBox}>
                                <Text style={topic.latinText}>{item.latinTitle}</Text>
                                <Text style={topic.englishText}>{item.englishTitle}</Text>
                                <TouchableOpacity disabled = {!item.unlocked || item.completed} style={[item.unlocked ? topic.selectButtonUnlocked : topic.selectButtonLocked]} 
                                    onPress={()=>{
                                        chosenTopic=item.number;
                                        console.log(chosenTopic) 
                                        navigation.navigate("Course")
                                    }}>
                                    <Text style={topic.selectButtonText}>
                                        {item.completed? Math.round(userProgress) +'% Completed':'Select'}
                                    </Text>
                                </TouchableOpacity> 
                            </View>
                        </View>
                    ))
                }
            </ScrollView>           
        </View>
        <View style={main.navigationButtonArea}> 
            <TouchableOpacity style={main.backButtonLarge}
                    onPress={()=>{
                    
                    navigation.navigate("Fill in the blanks screen")
                    }}>
                <Text style={main.backButtonText}>
                    BACK
                </Text>
            </TouchableOpacity> 
        </View>   
    </SafeAreaView>
  );
}

export default LessonSummaryScreen;
