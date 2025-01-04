import React, { useEffect , useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, View, Text, Button, Image, SafeAreaView, Slider, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, PanResponder, Animated} from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Responsive from '../components/responsive';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import { ScrollView,  } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Video , AVPlaybackStatus} from 'expo-av';

function LevelScreen({route, props}) {
  const navigation = useNavigation();
  const { Language } = route.params;

  // ------------------ OPTIONS ------------------------ //
  // (Use props._VALUE_ in this section if needed)
  const name = "Level";
  const icon = "star-outline";
  const minBoundary = 0;
  const maxBoundary = 3;
  const initVal = 1;
  const colorHighlight = "#1EA896";

  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon/>
    });
  });

  const [modalVisible, setModalVisible] = useState({
    modalVisible:false,
    video1:false,
    video2:false,
    video3:false,
    video4:false
  })

  // ----------------- Slider ----------------------- //
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [forceRender, setForceRender] = React.useState(0);
  const animState = React.useRef(
  {
    displayMinVal:0,
    sliderWidth:0,
    stepWidth:0,
    minBoundary:0,
    maxBoundary:0,
    minBoundaryPosition:0,
    maxBoundaryPosition:0,
    offSet: 0,
    clampOffSet: 0,
    initOffSet: 0,
  }).current;

  const [sliderHeight, setSliderHeight] = React.useState(0);
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const [sliderCenter, setSliderCenter] = React.useState(0);
  const [initOffset, setInitOffset] = React.useState(0);
  const [minBoundaryPosition, setMinBoundaryPosition] = React.useState(0);
  const [maxBoundaryPosition, setMaxBoundaryPosition] = React.useState(0);
  const setSliderSize = (height, width) =>
  {
    setSliderHeight(height);
    const sWidth = width - height // - height : Avoid the slider to overlap the borders
    setSliderWidth(sWidth);
    animState.sliderHeight = height;
    animState.sliderWidth = sWidth;
    const stepWidth = sWidth / (maxBoundary - minBoundary);
    animState.stepWidth = stepWidth;
    animState.minBoundary = minBoundary;
    animState.maxBoundary = maxBoundary;

    const center = sWidth / 2;
    setSliderCenter(center);
    const initOff = (initVal - ((maxBoundary - minBoundary) / 2)) * stepWidth;
    setInitOffset(initOff);
    animState.initOffSet = initOff;
    animState.minBoundaryPosition = (-sWidth / 2) - initOff;
    animState.maxBoundaryPosition = (sWidth / 2) - initOff;
    setMinBoundaryPosition((-sWidth / 2) - initOff);
    setMaxBoundaryPosition((sWidth / 2) - initOff);

    placeSlider();
  };

  const placeSlider = () =>
  {
    const newVal =
      pan.x._value +
      animState.offSet +
      animState.initOffSet -
      animState.clampOffSet;
    setForceRender(newVal); // Update the state so the render function is called (and elements are updated on screen)
    
    let filterVal = Math.trunc((newVal + animState.sliderWidth/2 + animState.stepWidth/2) / animState.stepWidth);
    filterVal = Math.min(maxBoundary, filterVal);
    filterVal = Math.max(minBoundary, filterVal);
    animState.displayMinVal = filterVal;
  };

  const getPanResponder = () =>
  {
    return PanResponder.create(
    {
        onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
        onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () =>
        {
          const clamp = Math.max(animState.minBoundaryPosition, Math.min(animState.maxBoundaryPosition, pan.x._value));
          animState.clampOffSet = animState.clampOffSet + pan.x._value - clamp;
          pan.setOffset({x:clamp, y:0});
        },
        onPanResponderMove: (e, gesture) =>
        {
          placeSlider();
          Animated.event([null, { dx: pan.x, dy: pan.y }], {})(e, {dx:gesture.dx, dy:0});
        },
        onPanResponderRelease: (e, gesture) =>
        {
          animState.offSet = animState.offSet + pan.x._value;
          pan.flattenOffset();
        }
    });
  };
  const [panResponder, setPanResponder] = React.useState(getPanResponder());

  return (
    <SafeAreaView style={main.safeAreaContainer}>
        <View style={{flex: 0.2,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginVertical:Responsive(32)}}>
            <View style={main.languageTitle}>
                <Image 
                    style={{width: 20, height: 40}}
                    source={require('../assets/PolygonLeft.png')}
                    resizeMode='contain' />
                <Text style={main.languageTitleText}>{ Language }</Text>
                <Image 
                    style={{width: 20, height: 40}}
                    source={require('../assets/PolygonRight.png')}
                    resizeMode='contain' />
            </View>
        </View>        

        <View style={s.mainContainer}>
      <View style={s.container}>
        <View style={s.labelValue}>
          <Text style={s.labelValueText}>{animState.displayMinVal}</Text>
        </View>
        <View
          style={s.sliderContainer}
          onLayout={(event) => setSliderSize(event.nativeEvent.layout.height, event.nativeEvent.layout.width)}
        >
          <View style={s.lineContainer}>
            <Animated.View style={[
              s.line,
              [{ translateX: pan.x.interpolate(
                {
                  inputRange: [Math.min(minBoundaryPosition, maxBoundaryPosition), Math.max(minBoundaryPosition, maxBoundaryPosition)],
                  outputRange: [
                    Math.min(minBoundaryPosition + initOffset - sliderWidth/2, maxBoundaryPosition + initOffset - sliderWidth/2),
                    Math.max(minBoundaryPosition + initOffset - sliderWidth/2, maxBoundaryPosition + initOffset - sliderWidth/2)
                  ],
                  extrapolate: 'clamp'
                })
              }],
              ]} />
          </View>
          <Animated.View
            style={[
              s.draggable,
              { transform:
                [{ translateX: pan.x.interpolate(
                  {
                    inputRange: [Math.min(minBoundaryPosition, maxBoundaryPosition), Math.max(minBoundaryPosition, maxBoundaryPosition)],
                    outputRange: [Math.min(minBoundaryPosition, maxBoundaryPosition), Math.max(minBoundaryPosition, maxBoundaryPosition)],
                    extrapolate: 'clamp'
                  })
                }]
              },
              {left:sliderCenter + initOffset}
            ]}
            {...panResponder.panHandlers}
          >
            <View style={s.circle}>
              <View style={s.icon}>
                <MaterialCommunityIcons name={icon} size={25} color={colorHighlight} />
              </View>
              <View style={s.labelContainer}>
                <Text style={s.label}>{name}</Text>
              </View>
            </View>
          </Animated.View>
          <View style={[s.boundary, {left:0 }]}/>
        </View>
        <View style={s.labelValue}>
          <Text style={s.labelValueText}>{animState.displayMinVal}</Text>
        </View>
      </View>
    </View>
    
    <View>
      <Text style={s.labelValueText2}>None</Text>
      <Text style={s.labelValueText3}>Fluent</Text>
    </View>



    <View style={{flex:1}}>
      <Text style={{color:'gray', fontSize:Responsive(16), alignSelf:'center', marginTop:Responsive(34)}}>Select your learning path</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: Responsive(32)}}>

        <TouchableOpacity style={{width:180 ,marginLeft: Responsive(16), borderRadius:10, backgroundColor:'#1EA896', maxHeight:Responsive(110)}} onPress = {()=>{navigation.navigate("General Communication")}}>
          <Ionicons name="alert-circle" size={23} style={{position:'absolute', top:3, right:3,color:"white"}}/>
          <Text style={{fontWeight:'bold',fontSize:Responsive(14),color:'white', textAlign:'center', marginHorizontal:Responsive(10), marginTop:Responsive(30)}}>General Communication</Text>
          <Text style={{fontSize:Responsive(12),color:'white', alignSelf:'center',marginBottom:Responsive(30),marginTop:Responsive(5)}}>5 courses</Text>   
        </TouchableOpacity>

        <TouchableOpacity style={{width:180 ,marginLeft: Responsive(16), borderRadius:10, backgroundColor:'gray', maxHeight:Responsive(110)}}>
          <Ionicons name="alert-circle" size={23} style={{position:'absolute', top:3, right:3,color:"white"}}/>
          <Text style={{fontWeight:'bold',fontSize:Responsive(14),color:'white', alignSelf:'center', marginHorizontal:Responsive(10), marginTop:Responsive(35)}}>Art & Culture</Text>
          <Text style={{fontSize:Responsive(12),color:'white', alignSelf:'center',marginBottom:Responsive(30),marginTop:Responsive(5)}}>5 courses</Text>
        </TouchableOpacity>


      {/*OTHER EXAMPLES*/}      
      <TouchableOpacity style={{width:180 ,marginLeft: Responsive(16), borderRadius:10, backgroundColor:'#1EA896', maxHeight:Responsive(110)}} onPress={()=>{/*navigation.navigate("Topic")*/}}>
        <TouchableOpacity onPress={()=>setModalVisible({video3:true,modalVisible:true})}>
          <Ionicons name="alert-circle" size={23} style={{position:'absolute', top:3, right:3,color:"white"}}/>
        </TouchableOpacity>
        <Text style={{fontWeight:'bold',fontSize:Responsive(14),color:'white', textAlign:'center', marginHorizontal:Responsive(10), marginTop:Responsive(35)}}>Coming soon...</Text>
        <Text style={{fontSize:Responsive(12),color:'white', alignSelf:'center',marginBottom:Responsive(30),marginTop:Responsive(5)}}>More courses</Text>   
      </TouchableOpacity>


      </ScrollView>
    </View>



        
    <View style={{alignSelf:'center', position: 'absolute', bottom:0, marginBottom:Responsive(26)}}>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: "#1EA896",
        marginBottom: 10, width:'100%'}}
        onPress={()=>{navigation.navigate("Language")}}>
        <Text style={main.navButtonText}> BACK </Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}

const s = StyleSheet.create({
  mainContainer:
  {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width:"100%",
    aspectRatio:4,
  },
  container:
  {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
  },

  labelValue:
  {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flex: 1,
  },
  labelValueText:
  {
    fontSize:14,
  },
  labelValueText2:
  {
    fontSize:18,
    textAlign: "left",
    left: 20,
    color: '#808080',
  },
  labelValueText3:
  {
    fontSize:18,
    textAlign: "right",
    right: 15,
    top: -21,
    color: '#808080',
  },

  sliderContainer:
  {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height:"100%",
    flex: 8,
  },
  lineContainer:
  {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height:4,
    width:"80%",
    flexDirection:'row',
    position: "absolute",
    left:"10%",
    top:"50%",
    marginTop:-3,
    borderRadius: 60,
    backgroundColor:"#1EA896",
  },
  line:
  {
    height:"100%",
    width:"300%",
    backgroundColor:"#1EA896",
  },
  draggable:
  {
    alignItems: "center",
    justifyContent: "center",
    height:"100%",
    aspectRatio:1,
    position:'absolute',
    top:-5,
    borderRadius:100,
    overflow: "visible",
  },
  circle:
  {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 2.8,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    aspectRatio: 1,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderWidth: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f1f1f1",
    overflow: "visible",
  },
  icon:
  {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height:"100%",
    width:"80%",
    paddingBottom:10
  },
  labelContainer:
  {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width:"100%",
    aspectRatio:3,
    position:'absolute',
    bottom:0,
  },
  label:
  {
    fontSize:9,
  },
});

export default LevelScreen;