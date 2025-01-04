import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Dimensions,Image, Text, View, Modal, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback,AsyncStorage } from 'react-native';
import MenuIcon2 from '../components/MenuIcon2';
import RNRasa from 'react-native-rasa';
import main from '../styles/main';
import Responsive from '../components/responsive';
import { Ionicons } from '@expo/vector-icons';

const HOST = 'https://immersiorasax.canadacentral.cloudapp.azure.com/';
function RasaChatScreen() {
  const navigation = useNavigation();
  const [modalVisible,setModalVisible] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon2/>
    });
  });
  
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={main.safeAreaContainer}>
        <Modal animationType='fade' transparent={true} visible={modalVisible} onRequestClose={()=>{setModalVisible(false)}}>
                    <View style={{backgroundColor:'#000000aa',flex:1}}>
                      <TouchableWithoutFeedback onPress={()=>{setModalVisible(false)}}>
                        <Ionicons name="close" size={35} style={{position:'absolute', top:160, right:15,color:"white"}}/>
                      </TouchableWithoutFeedback>
                      <View style={{backgroundColor:'white', width:'84%', borderRadius:5, height:'24%', alignSelf:'center', marginTop:200}}>
                        <Text style={{alignSelf:'center', fontSize:Responsive(14), marginTop:25, fontWeight:'600'}}>Welcome to the practice chat with Immersio.</Text>
                        <Text style={{alignSelf:'center', fontSize:Responsive(16), marginTop:20, fontWeight:'500'}}>You can start by typing: "Salve!"</Text>
                        <Image 
                          style={{alignSelf:'center' ,width: 45, height: 45, marginTop:Responsive(20), tintColor:'#1EA896'}}
                          source={require('../assets/hello.png')}
                          resizeMode='contain' />
                      </View>
                    </View>
          </Modal>
        <RNRasa
          host={HOST}
          onSendMessFailed={(err) => console.log(err)}
          emptyResponseMessage="Sorry, I don't understand"
          onEmptyResponse={() => console.log("Handle with custom action")}
        />
      </SafeAreaView>
    </>
  );
}

export default RasaChatScreen;
