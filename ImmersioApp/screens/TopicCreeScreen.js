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
        { 'number': '01', 'latinTitle': 'Greetings & introduction', 'englishTitle': 'Begginer - 10 Lesson', 'status': 'Not Started', 'unlocked': true},
        { 'number': '02', 'latinTitle': 'Introducing someone', 'englishTitle': 'Begginer - 15 Lesson', 'status': 'Not Started', 'unlocked': false},  
        { 'number': '03', 'latinTitle': 'Small talk - how are you?', 'englishTitle': 'Begginer - 20 Lesson', 'status': 'Not Started', 'unlocked': false},  
        { 'number': '04', 'latinTitle': 'Small talk - where are you from?', 'englishTitle': 'Begginer - 16 Lesson', 'status': 'Not Started', 'unlocked': false}, 
        { 'number': '05', 'latinTitle': 'Talk about weather', 'englishTitle': 'Begginer - 12 Lesson', 'status': 'Not Started', 'unlocked': false}, 
        { 'number': '06', 'latinTitle': 'Going for a walk', 'englishTitle': 'Begginer - 18 Lesson', 'status': 'Not Started', 'unlocked': false}, 
        { 'number': '07', 'latinTitle': 'Going fishing', 'englishTitle': 'Begginer - 20 Lesson', 'status': 'Not Started', 'unlocked': false},
        { 'number': '08', 'latinTitle': 'Setting snares', 'englishTitle': 'Begginer - 10 Lesson', 'status': 'Not Started', 'unlocked': false}
    ]
  }

  const getImage = (i) => {
    switch(i) {
        case '01':
            return <Image 
                source={require('../assets/Cree/Cree_feature.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '02':
            return <Image 
                source={require('../assets/Cree/Cree_feature.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '03':
            return <Image 
                source={require('../assets/Cree/Cree_feature.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '04':
            return <Image 
                source={require('../assets/Cree/Cree_feature.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '05':
            return <Image 
                source={require('../assets/Cree/Cree_feature.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '06':
            return <Image 
                source={require('../assets/Cree/Cree_feature.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '07':
            return <Image 
                source={require('../assets/Cree/Cree_feature.png')}
                resizeMode='stretch'
                style={{width:130,height:80, borderRadius:5}}
                />
        case '08':
            return <Image 
                source={require('../assets/Cree/Cree_feature.png')}
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
                                        navigation.navigate("Greetings & Introduction")
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
                    navigation.navigate("General Communication")
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
