import React, { useCallback, useState, useEffect } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Dimensions, View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Feather as DefaultFeather } from '@expo/vector-icons';

const leftGap = Dimensions.get('window').width - 95;

function MenuIcon3() {
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  },[]);


  return (
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={openDrawer}>
        <DefaultFeather name="menu" size={24} style={{marginLeft: 25}} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{navigation.navigate('Language Selection', {screen: 'Level'})}}>
      <DefaultFeather name="arrow-left-circle" size={24} style={{marginLeft:leftGap,width:30,height:30,borderRadius:30/2}}/>
      </TouchableOpacity>
  </View>
  );
}

export default MenuIcon3;
