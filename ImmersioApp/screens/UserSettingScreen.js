import React, { useContext, useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image, SafeAreaView, ScrollView, AsyncStorage, Platform, Linking} from 'react-native';
import Responsive from '../components/responsive';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { AntDesign } from '@expo/vector-icons';
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

function UserSettingScreen() {
    const navigation = useNavigation();
    const { signOut } = useContext(AuthContext);

    // User profile information
    const [photoUrl, setPhotoUrl] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    useEffect(() => {
      navigation.setOptions({
        showHeader: true,
        headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
      });
    });

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
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <AntDesign name="close" size={16} style={{paddingLeft:Responsive(20), paddingTop:Responsive(15), color:"gray"}} />
            </TouchableOpacity>
            <View style={(main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(20)})}>
                <Text style={(main.languageTitleText, {fontSize:Responsive(16), fontWeight:"700", paddingLeft: Responsive(28),textAlign: 'left'})}>Account</Text>
            </View>
            <View style={{backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
              <TouchableOpacity onPress={() => navigation.navigate('Email')}>
                <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>{email}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, flexDirection:"row"}} onPress={() => navigation.navigate('Subscription')}>
                <View style={{flex:1}}>
                  <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>Limited access</Text>
                </View>
                <View style={{flex:1}}>
                  <Text style={{color:'#008B8B', textAlign:'right', paddingVertical: Responsive(10), paddingRight:Responsive(18)}}>Subscribe</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => signOut()}>
                <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>Log out</Text>
              </TouchableOpacity>
            </View>
            <View style={(main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(20)})}>
                <Text style={(main.languageTitleText, {fontSize:Responsive(16), fontWeight:"700", paddingLeft: Responsive(28),textAlign: 'left'})}>General</Text>
            </View>
            <View style={{backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
              <TouchableOpacity onPress={() => navigation.navigate("Languages")} style={{flex:1, flexDirection:"row"}}>
                <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>Languages</Text>
                <View style={{flex:1}}>
                  <Text style={{color:'#008B8B', textAlign:'right', paddingVertical: Responsive(10), paddingRight:Responsive(18)}}>Latin</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => 
                Linking.openURL('app-settings:')
              } style={{flex:1, flexDirection:"row"}}>
                <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>Microphone</Text>
                <View style={{flex:1}}>
                  <AntDesign name="right" size={15} style={{color:'#008B8B', textAlign:'right', paddingVertical: Responsive(10), paddingRight:Responsive(18)}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={(main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(20)})}>
                <Text style={(main.languageTitleText, {fontSize:Responsive(16), fontWeight:"700", paddingLeft: Responsive(28),textAlign: 'left'})}>About</Text>
            </View>
            <View style={{backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
              <TouchableOpacity onPress={() => navigation.navigate('Version')}>
                <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>Version: 1.0.0</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Terms and Conditions')}>
                <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>Terms & conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>Privacy</Text>
              </TouchableOpacity>
            </View>
            <View style={(main.titleArea15, {paddingBottom: Responsive(10), paddingTop: Responsive(20)})}>
                <Text style={(main.languageTitleText, {fontSize:Responsive(16), fontWeight:"700", paddingLeft: Responsive(28),textAlign: 'left'})}>Subscription</Text>
            </View>
            <View style={{marginBottom: Responsive(70),backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
              <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
                <Text style={{color:"gray", paddingVertical: Responsive(10), paddingLeft: Responsive(25)}}>Purchase</Text>
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
  
  export default UserSettingScreen;