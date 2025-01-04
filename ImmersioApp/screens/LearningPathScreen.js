import React, { useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, SafeAreaView, Slider} from 'react-native';
import Responsive from '../components/responsive';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { TouchableOpacity } from 'react-native-gesture-handler';

let learningPath = "";

function LearningPathScreen() {
  const navigation = useNavigation();

  const [difficulty, setDifficulty] = useState({
    difficulty:0
  })

  var difficulties = ["1 - Complete Beginner", "2 - Basic Learner", "3 - Starting Learner", "4 - Proficient Learner", "5 - Advanced Learner", "6 - Master", "7 - Orator"]


  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
    });
  });
 
  return (
      <SafeAreaView style={main.safeAreaContainer}>
          <View style={{flex: 0.2,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginVertical:Responsive(32)}}>
              <View style={main.languageTitle}>
                  <Image 
                      style={{width: 20, height: 40}}
                      source={require('../assets/PolygonLeft.png')}
                      resizeMode='contain' />
                  <Text style={main.languageTitleText}>Latin</Text>
                  <Image 
                      style={{width: 20, height: 40}}
                      source={require('../assets/PolygonRight.png')}
                      resizeMode='contain' />
              </View>
              <Text style={{color:'gray', fontSize:16, alignSelf:'center', marginTop:Responsive(34)}}>Select your level</Text>
          </View>
                      
          <Slider style={{width:250, height:40, alignSelf:'center'}}
            maximumValue={6}
            minimumValue={0}
            step={1}
            value={difficulty.value}
            onSlidingComplete={(value)=> setDifficulty({difficulty:value})}/>

            <Text style={{alignSelf:'center', color:'gray'}}>{difficulties[difficulty.difficulty]}</Text>
          
          <View style={(main.navigationButtonArea, {marginLeft:36, position: 'absolute', right:0, bottom:0, marginBottom:Responsive(26)})}>
              <View style={{flexDirection: 'row',
                          justifyContent: 'space-around'}}>
                  <TouchableOpacity style={{flexDirection: 'row',
                                              justifyContent: 'center',
                                              backgroundColor: "#1EA896",
                                              marginBottom: 10,
                                              width:'80%'}}
                          onPress={()=>{
                          navigation.navigate("Level")
                          }}>
                      <Text style={main.navButtonText}>
                          BACK
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection: 'row',
                                              justifyContent: 'center',
                                              backgroundColor: "#1EA896",
                                              marginBottom: 10,
                                              width:'80%'}}
                          onPress={()=>{
                          navigation.navigate("Topic")
                          }}>
                      <Text style={main.navButtonText}>
                          CONTINUE
                      </Text>
                  </TouchableOpacity>
              </View>
        </View>
      </SafeAreaView>
  );
}

export default LearningPathScreen;
