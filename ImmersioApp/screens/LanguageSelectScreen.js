import React, { useContext, useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image, SafeAreaView, ScrollView, AsyncStorage} from 'react-native';
import Responsive from '../components/responsive';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../components/contexts/AuthContext';

const _clearAll = async () => {
    try {
    await AsyncStorage.clear();
    console.log('Done');
    } catch (error) {
    console.log(error);
    }
};

function LanguageSelectScreen() {
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
              <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{flexDirection:'row'}}>
                  <Ionicons name="chevron-back" size={16} style={{paddingLeft:Responsive(20), paddingTop:Responsive(15), color:"gray"}} />
                  <Text style={{color:'gray', marginLeft:Responsive(2), marginTop:Responsive(15)}}>Settings</Text>
              </TouchableOpacity>
              
              <View style={{marginTop: Responsive(36), backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, flex:1, flexDirection:"row"}}>
               
                <Image
                  style={{width: 45, height: 45, tintColor:'#008B8B', marginLeft:Responsive(24), marginVertical:Responsive(12)}}
                  source={require('../assets/colosseum.png')}
                  resizeMode='contain'
                  />
                  <View style={{flex:1, marginLeft:Responsive(20)}}>
                      <Text style={{color:'gray', marginTop:Responsive(15)}}>I'm learning</Text>
                      <Text style={{color: '#3a3b3c', fontWeight:'bold', fontSize: 16, marginTop:Responsive(4)}}>Latin</Text>
                  </View>
              </View>
              <View style={(main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(36)})}>
                  <Text style={{color:'#3a3b3c', fontSize:Responsive(14), fontWeight:"700", paddingLeft: Responsive(20),textAlign: 'left'}}>Change my learning language to</Text>
              </View>
              <View style={{marginTop:Responsive(8), flexDirection:'row', width:'90%', alignSelf:'center', borderRadius: 5, backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <Image
                      style={{tintColor:'gray', width: 45, height: 45, marginLeft:Responsive(24), marginVertical:Responsive(8)}}
                      source={require('../assets/greek-pillar.png')}
                      resizeMode='contain'
                      />
                  <Text style={{color:'gray', fontSize:16, marginLeft:Responsive(14), marginTop:Responsive(20)}}>Ancient Greek</Text>
              </View>
              <View style={{flexDirection:'row', width:'90%', alignSelf:'center', borderRadius: 5, marginTop: Responsive(20), backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <Image
                      style={{tintColor:'gray', width: 45, height: 45, marginLeft:Responsive(24), marginVertical:Responsive(8)}}
                      source={require('../assets/hebrew.png')}
                      resizeMode='contain'
                      />
                  <Text style={{color:'gray', fontSize:16, marginLeft:Responsive(14), marginTop:Responsive(20)}}>Ancient Hebrew</Text>
              </View>
              <View style={{flexDirection:'row', width:'90%', alignSelf:'center', borderRadius: 5, marginTop: Responsive(20), backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <Image
                      style={{tintColor:'gray', width: 45, height: 45, marginLeft:Responsive(24), marginVertical:Responsive(8)}}
                      source={require('../assets/headdress.png')}
                      resizeMode='contain'
                      />
                  <Text style={{color:'gray', fontSize:16, marginLeft:Responsive(14), marginTop:Responsive(20)}}>Cree</Text>
              </View>
              <View style={{flexDirection:'row', width:'90%', alignSelf:'center', borderRadius: 5, marginTop: Responsive(20), backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                  <Image
                      style={{tintColor:'gray', width: 45, height: 45, marginLeft:Responsive(24), marginVertical:Responsive(8)}}
                      source={require('../assets/inuktitut.png')}
                      resizeMode='contain'
                      />
                  <Text style={{color:'gray', fontSize:16, marginLeft:Responsive(14), marginTop:Responsive(20)}}>Inuktitut</Text>
              </View>
          </ScrollView>
        </View>
    );
  }
  
  export default LanguageSelectScreen;