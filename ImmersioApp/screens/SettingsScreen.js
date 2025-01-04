import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { TouchableHighlight, Block, ScrollView, View, Text, Button, StyleSheet, Image, AsyncStorage} from 'react-native';

import MenuIcon from '../components/MenuIcon';

import main from '../styles/main';
import { AuthContext } from '../components/contexts/AuthContext';

function SettingsScreen() {
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

  const styles = StyleSheet.create({
    view: {
      padding: 30,
      paddingTop: 110,
      height: '90%'
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 60/2,
      position: 'absolute', left: '50%', top: 30
    },
    header: {
      fontWeight: "bold",
      fontSize: 17,
      marginTop: 10,
      marginBottom: 5,
      color: "#555"
    },
    info: {
      color: '#555',
      fontSize: 16,
      marginBottom: 15,
      marginTop: -30
    },
    editButton: {
      alignSelf: 'flex-end',
      color: 'purple'
    },
    signOutButton: {
      position: 'absolute', left: '50%', bottom: 30
    }
  });

  return (
    <View style={styles.view}>
      <Image source={{uri: photoUrl}} style={styles.profileImage}/>
      <Text style={styles.header}> Name </Text>
      <TouchableHighlight style={styles.editButton}>
        <Button title="Edit"/>
      </TouchableHighlight>
      <Text style={styles.info}> {name} </Text>
      <Text style={styles.header}> Email </Text>
      <TouchableHighlight style={styles.editButton}>
        <Button title="Edit" style={styles.editButton}/>
      </TouchableHighlight>
      <Text style={styles.info}> {email}</Text>
      <TouchableHighlight style={styles.signOutButton}>
        <Button title="Sign out" onPress={() => signOut()}/>
      </TouchableHighlight>
    </View>
   );
}

export default SettingsScreen;
