import React, { useCallback, useState, useEffect } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Dimensions, View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Feather as DefaultFeather } from '@expo/vector-icons';

const leftGap = Dimensions.get('window').width - 100;

function MenuIcon2() {
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  },[]);

  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    readData();
  });

  const readData = async () => {
    try {
      const photoUrl = await AsyncStorage.getItem("photoUrl");

      if (photoUrl !== null) {
        setPhotoUrl(photoUrl);
      }
      
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  return (
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={openDrawer}>
        <DefaultFeather name="menu" size={24} style={{marginLeft: 25}} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{navigation.navigate('Profile', {screen: 'Profile'})}}>
        <Image source={{uri: photoUrl}} style={{marginLeft:leftGap,width:30,height:30,borderRadius:30/2}}/>
      </TouchableOpacity>
  </View>
  );
}

export default MenuIcon2;
