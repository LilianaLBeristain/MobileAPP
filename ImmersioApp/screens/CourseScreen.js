import React, { useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image, SafeAreaView, ScrollView} from 'react-native';

import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import topic from '../styles/topic';
import course from '../styles/course';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

const _clearAll = async () => {
    try {
    await AsyncStorage.clear();
    console.log('Done');
    } catch (error) {
    console.log(error);
    }
};

let chosenCourse = "";

function CourseScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
    });
  });

  state = {
    courseNames: [
        { 'latinTitle': 'Ubi est Roma?', 'englishTitle': 'Where is Rome', 'description': 'Learn how to ask and answer where places are on a map', 'numParts': 6, 'numPartsCompleted': 0}, 
        { 'latinTitle': 'Magnum est imperium!', 'englishTitle': 'Great is the Empire!', 'description': 'Learn how to give basic descriptions of people and places', 'numParts': 6, 'numPartsCompleted': 0}, 
        { 'latinTitle': 'Quomodo dicitur?', 'englishTitle': 'How do you say this?', 'description': 'Learn how to spell and count', 'numParts': 6, 'numPartsCompleted': 0}, 
        { 'latinTitle': 'Singularis et Pluralis', 'englishTitle': 'Singular and Plural', 'description': 'Understand how singular and plural numbers works', 'numParts': 6, 'numPartsCompleted': 0}
    ]
  }

  return (
    <SafeAreaView style={main.safeAreaContainer}>
        <View style={main.titleArea15}>
            <Text style={main.languageTitleText}>Imperium Romanum</Text>
            <Text style={main.subTitleText}>Select a course to begin</Text>
        </View>
        <View style={main.contentArea70}>
            <ScrollView style={main.scrollView}>
                {
                    this.state.courseNames.map((item, index) =>(
                        <View key = {item.latinTitle} style={course.listItem}>
                            <Text style={course.titleText}>{item.latinTitle} / {item.englishTitle}</Text>
                            <Text style={course.descriptionText}>{item.description}</Text>
                            <Text style={course.partsText}>{item.numPartsCompleted}/{item.numParts} parts complete</Text>
                            <TouchableOpacity style={course.startButton} 
                                onPress={()=>{
                                    chosenTopic=item.latinTitle;
                                    console.log(chosenCourse) 
                                    //clear async storage
                                    _clearAll();
                                    navigation.navigate("Title Page")
                                }}>
                                <Text style={topic.selectButtonText}>
                                    Start
                                </Text>
                            </TouchableOpacity> 
                        </View>
                    ))
                }
            </ScrollView>           
        </View>
        <View style={main.navigationButtonArea}> 
            <TouchableOpacity style={main.backButtonLarge}
                    onPress={()=>{
                    navigation.navigate("Topic")
                    }}>
                <Text style={main.backButtonText}>
                    BACK
                </Text>
            </TouchableOpacity> 
        </View>   
    </SafeAreaView>
  );
}

export default CourseScreen;