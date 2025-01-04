import React, { useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image, SafeAreaView, ScrollView, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import Responsive from '../components/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const _clearAll = async () => {
    try {
    await AsyncStorage.clear();
    console.log('Done');
    } catch (error) {
    console.log(error);
    }
};

function MessagesScreen() {
    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        showHeader: true,
        headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
      });
    });
  
    return (
      <View style={{flex:1}}>
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <AntDesign name="close" size={16} style={{paddingLeft:Responsive(20), paddingTop:Responsive(15), color:"gray"}} />
            </TouchableOpacity>
            <View style={(main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(20)})}>
                <Text style={(main.languageTitleText, {fontSize:Responsive(16), fontWeight:"700", paddingLeft: Responsive(28),textAlign: 'left'})}>Recent</Text>
            </View>
            <View style={{backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>          
              <TouchableOpacity style={{flex:1, flexDirection:"row"}} onPress={() => Alert.alert("New Lessons", "New lessons added to The Roman Empire", [{text: "Exit", style:'cancel'}])}>
                  <View style={{flex:1}}>
                    <Text style={{color:"#3A3B3C", fontWeight: '500', paddingVertical: Responsive(14), paddingLeft: Responsive(25)}}>New Lessons Added</Text>
                  </View>
                  <View style={{flex:1}}>
                    <Text style={{color:'gray', fontSize:10 ,textAlign:'right', paddingVertical: Responsive(14), paddingRight:Responsive(15)}}>1 day ago</Text>
                  </View>
                </TouchableOpacity>
              <TouchableOpacity style={{flex:1, flexDirection:"row"}} onPress={() => Alert.alert("New Lessons", "New lessons added to The Roman Empire", [{text: "Exit", style:'cancel'}])}>
                  <View style={{flex:1}}>
                    <Text style={{color:"#3A3B3C", fontWeight: '500', paddingVertical: Responsive(14), paddingLeft: Responsive(25)}}>New Lessons Added</Text>
                  </View>
                  <View style={{flex:1}}>
                    <Text style={{color:'gray', fontSize:10 ,textAlign:'right', paddingVertical: Responsive(14), paddingRight:Responsive(15)}}>2 days ago</Text>
                  </View>
                </TouchableOpacity>
              <TouchableOpacity style={{flex:1, flexDirection:"row"}} onPress={() => Alert.alert("New Lessons", "New lessons added to The Roman Empire", [{text: "Exit", style:'cancel'}])}>
                  <View style={{flex:1}}>
                    <Text style={{color:"#3A3B3C", fontWeight: '500', paddingVertical: Responsive(14), paddingLeft: Responsive(25)}}>New Lessons Added</Text>
                  </View>
                  <View style={{flex:1}}>
                    <Text style={{color:'gray', fontSize:10 ,textAlign:'right', paddingVertical: Responsive(14), paddingRight:Responsive(15)}}>3 days ago</Text>
                  </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <View style={{flex: 1}}>
              <View style={{shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, flexDirection:"row", position: 'absolute', backgroundColor:"white", left:0, right:0, bottom:0, paddingTop:Responsive(10), paddingBottom:Responsive(6)}}>
                  <View style={{paddingHorizontal:'5%'}}><TouchableOpacity
                    onPress={() => navigation.navigate("Language Selection", {screen:"Language"})}
                  >
                    <AntDesign name="switcher" size={24} style={{marginBottom: Responsive(6), marginLeft:Responsive(27), color:"gray"}} />
                    {/* <SvgImage xml={footerLearningPath} height={'100%'} width={'100%'}/> */}
                      <Text style={{fontSize: 12, color:"gray", textAlign:"center"}}>Learning Path</Text>
                  </TouchableOpacity></View>
                  <View style={{paddingHorizontal:'6%'}}><TouchableOpacity
                    onPress={() => navigation.navigate('LearningPathScreen')}
                  >
                    <AntDesign name="windowso" size={24} style={{marginBottom: Responsive(6), color:"gray"}} />
                    {/* <SvgImage xml={footerAll} height={'100%'} width={'100%'}/> */}
                      <Text style={{textAlign:"center",fontSize: 12, color:"gray"}}>All</Text>
                  </TouchableOpacity></View>
                  <View style={{paddingHorizontal:'6%'}}><TouchableOpacity
                    onPress={() => navigation.navigate("Messages")}
                  >
                    <AntDesign name="message1" size={24} style={{marginBottom: Responsive(6), marginLeft: Responsive(16), color:"gray"}} />
                    {/* <SvgImage xml={footerMessages} height={'100%'} width={'100%'}/> */}
                      <Text style={{textAlign:"center", fontSize: 12, color:"gray"}}>Messages</Text>
                  </TouchableOpacity></View>
                  <View style={{paddingHorizontal:'5%'}}><TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                  >
                    <AntDesign name="setting" size={24} style={{marginBottom: Responsive(6), marginLeft: Responsive(9), color:"gray"}} />
                    {/* <SvgImage xml={footerSettings} height={'100%'} width={'100%'}/> */}
                      <Text style={{textAlign:"center", fontSize: 12, color:"gray"}}>Settings</Text>
                  </TouchableOpacity></View>
                  </View>
          </View>
      </View>
    );
  }
  
  export default MessagesScreen;