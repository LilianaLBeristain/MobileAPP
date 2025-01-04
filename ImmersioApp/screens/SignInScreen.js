import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input, Text, ThemeConsumer, ThemeContext, withTheme } from 'react-native-elements';
import Responsive from '../components/responsive';
import form from '../styles/form.component.style';
import { AuthContext } from '../components/contexts/AuthContext';
import { Dimensions, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, GoogleSignIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView>
      <View style={{justifyContent:'center',alignSelf:'center', marginTop:Responsive(85)}}>
        <Image 
          style={{width: 270, height: 50}}
          source={require('../assets/Immersio2x.png')}
          resizeMode='stretch'/>
      </View>
      <Card containerStyle={{marginHorizontal:Responsive(40), maxWidth:Responsive(300), color:'white', alignSelf:'center'}}>
        <TouchableOpacity
          onPress={async () => GoogleSignIn()}
          style={{
            width:'90%',
            backgroundColor:'#f5f5f5',
            borderWidth:1,
            borderColor:'#949494',
            borderRadius:5,
            justifyContent:'center',
            alignSelf:'center',
            paddingVertical: Responsive(7),
            flexDirection:'row'
          }}>
          <Image 
            style={{width: 22, height: 22, marginRight:Responsive(8)}}
            source={require('../assets/googleicon.png')}
            resizeMode='cover'/>
          <Text style={{color:'#949494',fontSize:18,}}>Sign in with Google</Text>
        </TouchableOpacity>
        <View style={{paddingVertical:Responsive(14)}}>
          <Text style={{textAlign:'center', color:'gray', fontSize:Responsive(18)}}>or</Text>
        </View>
        <Input
          inputContainerStyle={form.inputContainer}
          containerStyle={form.inputView}
          inputStyle={form.inputText}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          inputContainerStyle={form.inputContainer}
          containerStyle={form.inputView}
          inputStyle={form.inputText}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={[ form.termsText, { color: theme.colors.grey3, alignItems:'center', textAlign:'center',alignSelf: 'center' } ]}>By clicking Create Account, I agree to the Terms of Service and Privacy Policy</Text>
        <Button
          buttonStyle={(form.button, {width:'90%', alignSelf:'center'})}
          title="CREATE ACCOUNT"
          onPress={() => signIn({ email, password })} />
      </Card>
    </SafeAreaView>
  );
}

export default withTheme(SignInScreen);
