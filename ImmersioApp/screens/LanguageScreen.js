import React, { useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Responsive from '../components/responsive'
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import form from '../styles/form.component.style';

function LanguageScreen() {
  const navigation = useNavigation();
  const [choosenLanguage, setchoosenLanguage] = useState('Latin');

  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
    });
  });

  return (
    <SafeAreaView style={main.safeAreaContainer}>
      <View style={{marginTop: 80}}>
        <Text style={main.subTitleText}>Select your language</Text>
      </View>

      <Picker
          selectedValue={choosenLanguage}
          style={{marginTop: Responsive(50)}}
          onValueChange={(itemValue, itemIndex) => {
            setchoosenLanguage(itemValue);
          }}>
          <Picker.Item label="Latin" value="Latin" />
          <Picker.Item label="Greek" value="Greek" />
          <Picker.Item label="Hebrew" value="Hebrew" />
          <Picker.Item label="Cree" value="Cree" />
          <Picker.Item label="Inuktitut" value="Inuktitut" />
        </Picker>

         {/*Text to show selected picker value
        <Text style={styles.text}>Selected Value: {choosenLanguage}</Text>
            Text to show selected index 
        <Text style={styles.text}>Selected Index: {choosenIndex}</Text>*/}


        <View style={main.navigationButtonArea, {marginTop: Responsive(200)}}>
        <View style={main.navButtonPair}>          
          <TouchableOpacity style={main.navButton}
                onPress={()=>{
                  if (choosenLanguage == 'Latin') {
                    navigation.navigate("level", {Language: choosenLanguage})
                  } else if (choosenLanguage == 'Cree') {
                    navigation.navigate("Level", {Language: choosenLanguage})
                  }
                  
                  
                }}>
            <Text style={main.navButtonText}> CONTINUE </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default LanguageScreen;