import React, { useContext, useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image, SafeAreaView, ScrollView, AsyncStorage} from 'react-native';
import Responsive from '../components/responsive';

import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
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

function ProfileScreen() {
    // User profile information
    const [photoUrl, setPhotoUrl] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        showHeader: true,
        headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
      });
    });

    // Read user profile info before loading screen
    useEffect(() => {
      readData();
    });

    const readData = async () => {
      try {
        const photoUrl = await AsyncStorage.getItem("photoUrl");
        const name = await AsyncStorage.getItem("name");
        const email = await AsyncStorage.getItem("email");
  
        if (name !== null) {
          setName(name);
        }
        if (photoUrl !== null) {
          setPhotoUrl(photoUrl);
        }
        if (email !== null) {
          setEmail(email);
        }
      } catch (e) {
        alert('Failed to fetch the data from storage')
      }
    }
  
    return (
      <View style={{flex:1}}>
      <ScrollView>
            <View style={(main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(20)})}>
                <Text style={(main.languageTitleText, {fontSize:Responsive(16), fontWeight:"700", paddingLeft: Responsive(28),textAlign: 'left'})}>My Profile</Text>
            </View>
            <View style={{flexDirection:'row',backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
              <Image source={{uri: photoUrl}} style={{marginVertical:Responsive(16),marginLeft:Responsive(16),width:80,height:80,borderRadius:80/2}}/>
              <View style={{paddingLeft:Responsive(12), flex:1}}>
                <Text style={{color:'black', fontWeight: '700', fontSize:18, marginTop:Responsive(14)}}>
                  {name}
                </Text>
                <Text style={{color:'gray', fontSize:14, marginTop:Responsive(4), marginLeft:Responsive(3)}}>
                  {email}
                </Text>
                <View style={{flexDirection:'row', flex:1, paddingTop:Responsive(8)}}>
                  <AntDesign name='adduser' size={30} style={{color:'gray'}}/>
                  <Text style={{paddingLeft:Responsive(2), color:'gray', marginTop:Responsive(8)}}>
                    Add friend
                  </Text>
                </View>
              </View>
            </View>
            {/* <View style={main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(20)}}>
                <Text style={main.languageTitleText, {fontSize:Responsive(16), fontWeight:"700", paddingLeft: Responsive(28),textAlign: 'left'}}>My Achievements</Text>
            </View> */}
            <View style={{backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
              
            </View>
            <View style={(main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(20)})}>
                <Text style={(main.languageTitleText, {fontSize:Responsive(16), fontWeight:"700", paddingLeft: Responsive(28),textAlign: 'left'})}>My Connections</Text>
            </View>
            <View style={{flexDirection:'row', backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
              <View style={{paddingHorizontal:Responsive(10), paddingVertical:Responsive(12)}}>
                <EvilIcons name='user' size={70} style={{color:'gray'}}/>
                <Text style={{color:'gray', textAlign:"center"}}>Aiken</Text>
              </View>
              <View style={{paddingHorizontal:Responsive(10), paddingVertical:Responsive(12)}}>
                <EvilIcons name='user' size={70} style={{color:'gray'}}/>
                <Text style={{color:'gray', textAlign:"center"}}>Jake</Text>
              </View>
              <View style={{paddingHorizontal:Responsive(10), paddingVertical:Responsive(12)}}>
                <EvilIcons name='user' size={70} style={{color:'gray'}}/>
                <Text style={{color:'gray', textAlign:"center"}}>David</Text>
              </View>
              <View style={{paddingHorizontal:Responsive(10), paddingVertical:Responsive(12)}}>
                <EvilIcons name='user' size={70} style={{color:'gray'}}/>
                <Text style={{color:'gray', textAlign:"center"}}>Hoang</Text>
              </View>
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
  
  export default ProfileScreen;