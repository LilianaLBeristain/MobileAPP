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

function SubscriptionScreen() {
    const navigation = useNavigation();

    const [selected, setSelected] = useState({
        twelveMonths:true,
        sixMonths:false,
        threeMonths:false
    })
  
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
                <Ionicons name="chevron-back" size={16} style={{paddingLeft:Responsive(20), paddingTop:Responsive(12), color:"gray"}} />
                <Text style={{color:'gray', marginLeft:Responsive(2), marginTop:Responsive(12)}}>Settings</Text>
            </TouchableOpacity>
            <View style={{marginTop: Responsive(8), marginBottom:Responsive(10),flex:1}}>
                <View style={{flex:1, marginLeft:Responsive(20)}}>
                    <Text style={{color: '#3a3b3c', fontWeight:'bold', fontSize: 20, marginTop:Responsive(4), marginLeft:Responsive(16), marginBottom:Responsive(8)}}>Please Select a subscription</Text>             
                </View>
                <View style={{flex:1, marginLeft:Responsive(16), flexDirection:'row'}}>
                    <Ionicons name="ios-checkmark-circle-outline" size={24} style={{marginLeft:Responsive(12), paddingTop:Responsive(8), color:"#008B8B"}} />
                    <Text style={{color:'gray', marginTop:Responsive(8), marginLeft:Responsive(8), fontSize:17, alignSelf:'center', flexWrap:'wrap', flexShrink:1}}>Unlimited access to all courses and lessons</Text>   
                </View>
                <View style={{flex:1, marginLeft:Responsive(16), flexDirection:'row'}}>
                    <Ionicons name="ios-checkmark-circle-outline" size={24} style={{marginLeft:Responsive(12), paddingTop:Responsive(8), color:"#008B8B"}} />
                    <Text style={{color:'gray', marginTop:Responsive(8), marginLeft:Responsive(8), fontSize:17, alignSelf:'center'}}>Unlimited downloadable materials</Text>   
                </View>
                <View style={{flex:1, marginLeft:Responsive(16), flexDirection:'row'}}>
                    <Ionicons name="ios-checkmark-circle-outline" size={24} style={{marginLeft:Responsive(12), paddingTop:Responsive(8), color:"#008B8B"}} />
                    <Text style={{color:'gray', marginTop:Responsive(8), marginLeft:Responsive(8), fontSize:17, alignSelf:'center',flexWrap:'wrap', flexShrink:1}}>Personalized courses with practical learning path</Text>   
                </View>
            </View>
            {!selected.twelveMonths && <TouchableOpacity onPress={()=>setSelected({twelveMonths:true,sixMonths:false,threeMonths:false})} style={{marginTop:Responsive(8), width:'90%', alignSelf:'center', borderRadius: 5, backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom:Responsive(8)}}>
                <Text style={{color:'black', fontSize:18, marginLeft:Responsive(14), marginTop:Responsive(10), fontWeight:'bold'}}>12 months</Text>
                <Text style={{color:'#008B8B', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(7)}}>$8.00 per month</Text>
                <Text style={{color:'gray', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(4), marginBottom:Responsive(10)}}>$96 charged every 12 months</Text>
            </TouchableOpacity>}
            {selected.twelveMonths && <TouchableOpacity onPress={()=>setSelected({twelveMonths:false,sixMonths:false,threeMonths:false})} style={{marginTop:Responsive(8), width:'90%', alignSelf:'center', borderRadius: 5, backgroundColor:"#e6ffe6", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom:Responsive(8)}}>
                <Text style={{color:'black', fontSize:18, marginLeft:Responsive(14), marginTop:Responsive(10), fontWeight:'bold'}}>12 months</Text>
                <Text style={{color:'#008B8B', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(7)}}>$8.00 per month</Text>
                <Text style={{color:'gray', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(4), marginBottom:Responsive(10)}}>$96 charged every 12 months</Text>
            </TouchableOpacity>}
            {!selected.sixMonths && <TouchableOpacity onPress={()=>setSelected({twelveMonths:false,sixMonths:true,threeMonths:false})} style={{marginTop:Responsive(8), width:'90%', alignSelf:'center', borderRadius: 5, backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom:Responsive(8)}}>
                <Text style={{color:'black', fontSize:18, marginLeft:Responsive(14), marginTop:Responsive(10), fontWeight:'bold'}}>6 months</Text>
                <Text style={{color:'#008B8B', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(7)}}>$10.00 per month</Text>
                <Text style={{color:'gray', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(4), marginBottom:Responsive(10)}}>$60 charged every 6 months</Text>
            </TouchableOpacity>}
            {selected.sixMonths && <TouchableOpacity onPress={()=>setSelected({twelveMonths:false,sixMonths:false,threeMonths:false})} style={{marginTop:Responsive(8), width:'90%', alignSelf:'center', borderRadius: 5, backgroundColor:"#e6ffe6", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom:Responsive(8)}}>
                <Text style={{color:'black', fontSize:18, marginLeft:Responsive(14), marginTop:Responsive(10), fontWeight:'bold'}}>6 months</Text>
                <Text style={{color:'#008B8B', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(7)}}>$10.00 per month</Text>
                <Text style={{color:'gray', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(4), marginBottom:Responsive(10)}}>$60 charged every 6 months</Text>
            </TouchableOpacity>}
            {!selected.threeMonths && <TouchableOpacity onPress={()=>setSelected({twelveMonths:false,sixMonths:false,threeMonths:true})} style={{marginTop:Responsive(8), width:'90%', alignSelf:'center', borderRadius: 5, backgroundColor:"white", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom:Responsive(8)}}>
                <Text style={{color:'black', fontSize:18, marginLeft:Responsive(14), marginTop:Responsive(10), fontWeight:'bold'}}>3 months</Text>
                <Text style={{color:'#008B8B', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(7)}}>$12.00 per month</Text>
                <Text style={{color:'gray', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(4), marginBottom:Responsive(10)}}>$36 charged every 3 months</Text>
            </TouchableOpacity>}
            {selected.threeMonths && <TouchableOpacity onPress={()=>setSelected({twelveMonths:false,sixMonths:false,threeMonths:false})} style={{marginTop:Responsive(8), width:'90%', alignSelf:'center', borderRadius: 5, backgroundColor:"#e6ffe6", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom:Responsive(8)}}>
                <Text style={{color:'black', fontSize:18, marginLeft:Responsive(14), marginTop:Responsive(10), fontWeight:'bold'}}>3 months</Text>
                <Text style={{color:'#008B8B', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(7)}}>$12.00 per month</Text>
                <Text style={{color:'gray', fontSize:15, marginLeft:Responsive(14), marginTop:Responsive(4), marginBottom:Responsive(10)}}>$36 charged every 3 months</Text>
            </TouchableOpacity>}
            <TouchableOpacity style={{marginTop:Responsive(16), width:'50%', alignSelf:'center', borderRadius: 5, backgroundColor:"#008B8B", shadowColor: '#000', shadowOffset:{width:0, height:2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom:Responsive(4)}}>
                <Text style={{color:'white', fontSize:18, marginVertical:Responsive(10), alignSelf:'center'}}>Subscribe Now</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
  
  export default SubscriptionScreen;