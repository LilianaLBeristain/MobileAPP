import React, { useCallback } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Feather as DefaultFeather } from '@expo/vector-icons';

function MenuIcon() {
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  },[]);

  return (
    <TouchableOpacity onPress={openDrawer}>
      <DefaultFeather name="menu" size={24} style={{marginLeft: 25}} />
    </TouchableOpacity>
  );
}

export default MenuIcon;
