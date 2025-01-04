import React, { useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image, SafeAreaView, ScrollView} from 'react-native';

import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import topic from '../styles/topic';
import { TouchableOpacity } from 'react-native-gesture-handler';

let chosenTopic = "";

function TopicScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
    });
  });

  state = {
    topicNames: [
        { 'number': '01', 'latinTitle': 'Imperium Romanum', 'englishTitle': 'The Roman Empire', 'status': 'Not Started', 'unlocked': true},
        { 'number': '02', 'latinTitle': 'Educatio', 'englishTitle': 'Child Rearing', 'status': 'Not Started', 'unlocked': false},  
        { 'number': '03', 'latinTitle': 'Apud Villam', 'englishTitle': 'At the Estate', 'status': 'Not Started', 'unlocked': false},  
        { 'number': '04', 'latinTitle': 'Donatio', 'englishTitle': 'Giving', 'status': 'Not Started', 'unlocked': false}, 
        { 'number': '05', 'latinTitle': 'Natura et Fortuna', 'englishTitle': 'Nature and Fortune', 'status': 'Not Started', 'unlocked': false}, 
        { 'number': '06', 'latinTitle': 'Dei et Homines', 'englishTitle': 'Gods and People', 'status': 'Not Started', 'unlocked': false}, 
        { 'number': '07', 'latinTitle': 'Curatio', 'englishTitle': 'Healing', 'status': 'Not Started', 'unlocked': false},
        { 'number': '08', 'latinTitle': 'Para Bellum', 'englishTitle': 'Prepare for Battle', 'status': 'Not Started', 'unlocked': false}
    ]
  }

  const getImage = (i) => {
    switch(i) {
        case '01':
            return <Image 
                source={require('../assets/TheRomanEmpire.jpeg')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '02':
            return <Image 
                source={require('../assets/ChildRearing.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '03':
            return <Image 
                source={require('../assets/AtTheEstate.jpeg')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '04':
            return <Image 
                source={require('../assets/Giving.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '05':
            return <Image 
                source={require('../assets/NatureAndFortune.jpeg')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '06':
            return <Image 
                source={require('../assets/GodsAndPeople.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '07':
            return <Image 
                source={require('../assets/Healing.jpeg')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '08':
            return <Image 
                source={require('../assets/PrepareforBattle.jpeg')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
    }
  }

  return (
    <SafeAreaView style={main.safeAreaContainer}>
        <View style={main.titleArea10}>
            <Text style={{
                flexDirection:"row",
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 16,
                color: 'gray'
            }}>Select your course to begin</Text>
        </View>
        <View style={main.contentArea75}>
            <ScrollView style={main.scrollView}>
                {
                    state.topicNames.map((item, index) =>(
                        <View key = {item.number} style={topic.listItem}>
                            {/* <View style={topic.numberBox}>
                                <Text style={topic.numberText}>{item.number}</Text>
                                <Text style={topic.statusText}>{item.status}</Text>
                            </View> */}
                            <View style = {{flex: 0.5,
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            width: 120,
                                            height: 90,
                                            borderRadius:5}}>
                                {getImage(item.number)}
                            </View>
                            <View style={topic.descriptionBox}>
                                <Text style={topic.latinText}>{item.latinTitle}</Text>
                                <Text style={topic.englishText}>{item.englishTitle}</Text>
                                <TouchableOpacity style={[item.unlocked ? topic.selectButtonUnlocked : topic.selectButtonLocked]} 
                                    onPress={()=>{
                                        chosenTopic=item.number;
                                        console.log(chosenTopic) 
                                        navigation.navigate("Lesson Video")
                                    }}>
                                    <Text style={topic.selectButtonText}>
                                        START
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
                    navigation.navigate("Classical Studies Scholar")
                    }}>
                <Text style={main.backButtonText}>
                    BACK
                </Text>
            </TouchableOpacity> 
        </View>   
    </SafeAreaView>
  );
}

export default TopicScreen;
