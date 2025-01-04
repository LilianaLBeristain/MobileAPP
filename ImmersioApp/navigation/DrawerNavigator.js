import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import Responsive from '../components/responsive'
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import FillBlanksScreen from '../screens/FillBlanksScreen';
import LanguageScreen from '../screens/LanguageScreen';
import LevelScreen from '../screens/LevelScreen';
import LevelScreenLatin from '../screens/LevelScreen_Original';
import LearningPathScreen from '../screens/LearningPathScreen';
import TopicScreen from '../screens/TopicScreen';
import CourseScreen from '../screens/CourseScreen';
import LessonTitlePageScreen from '../screens/LessonTitlePageScreen';
import LessonIntroScreen from '../screens/LessonIntroScreen';
import SelectAndListenScreen1 from '../screens/SelectAndListenScreen1';
import SelectAndListenScreen2 from '../screens/SelectAndListenScreen2';
import SelectAndListenScreen3 from '../screens/SelectAndListenScreen3';
import VideoScreen from '../screens/VideoScreen';
import GrammarScreen from '../screens/GrammarScreen';
import RasaChatScreen from '../screens/RasaChatScreen';
import LessonSummaryScreen from '../screens/LessonSummaryScreen';
import QandAScreen from '../screens/QandA';
import ProfileScreen from '../screens/ProfileScreen'
import UserSettingScreen from '../screens/UserSettingScreen';
import MessagesScreen from '../screens/MessagesScreen';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import ClassicalStudiesScholarScreen from'../screens/ClassicalStudiesScholarScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import newQandAScreen from '../screens/newQandAScreen'
import drill2 from '../screens/Drill2QandA';
import preChatbotScreen from '../screens/PreChatbotScreen';
import EuropaIntroScreen from '../screens/EuropaIntroScreen';
import AfricaIntroScreen from '../screens/AfricaIntroScreen';
import AsiaIntroScreen from '../screens/AsiaIntroScreen';
import SelectAndListenScreen4 from '../screens/SelectAndListenScreen4';
import SelectAndListenScreen5 from '../screens/SelectAndListenScreen5';
import FillBlanksScreen2 from '../screens/FillBlanksScreen2';
import ReviewConversationScreen from '../screens/ReviewConversationScreen';

//CREE
import GeneralCommunicationScreen from '../screens/GeneralCommunicationScreen';
import TopicCreeScreen from '../screens/TopicCreeScreen';
import GreetingsIntroduction from '../screens/Greetings&Introduction';
import IntroducingYourself from '../screens/CardAudioScreen1';
import CardAudioScreen2 from '../screens/CardAudioScreen2';
import CardAudioScreen3 from '../screens/CardAudioScreen3';
import CardAudioScreen4 from '../screens/CardAudioScreen4';
import CreeChoose1 from '../screens/CreeChooseAnswer';
import CreeChoose2 from '../screens/CreeChooseAnswer2';
import CreeChoose3 from '../screens/CreeChooseAnswer3';
import CreeChoose4 from '../screens/CreeChooseAnswer4';
import SelectCreeAndListenScreen1 from '../screens/SelectCreeAndListenScreen1';
import SelectCreeAndListenScreen2 from '../screens/SelectCreeAndListenScreen2';
import SelectCreeAndListenScreen3 from '../screens/SelectCreeAndListenScreen3';
import SelectCreeAndListenScreen4 from '../screens/SelectCreeAndListenScreen4';
import SelectCreeAndListenScreen5 from '../screens/SelectCreeAndListenScreen5';
import SelectCreeAndListenScreen6 from '../screens/SelectCreeAndListenScreen6';
import ReviewCreeConversationScreen from '../screens/ReviewCreeConversationScreen';
import FinishCreeLessonScreen from '../screens/FinishCreeLessonScreen';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Language Selection" component={LanguageNavigator} options={{title:'Learning path', drawerIcon: ({focused,size})=>(
        <AntDesign name="switcher" size={22} style={{color:'#363130'}}/>
      )}}/>
      <Drawer.Screen name="Profile" component={ProfileNavigator} options={{title:'Profile', drawerIcon: ({focused,size})=>(
        <AntDesign name="user" size={22} style={{color:'#363130'}}/>
      )}}/>
      <Drawer.Screen name="Lesson Summary" component={LessonSummaryNavigator} options={{title:'All courses', drawerIcon: ({focused,size})=>(
        <AntDesign name="windowso" size={22} style={{color:'#363130'}}/>
      )}}/>
      <Drawer.Screen name="Chat With Immersio" component={RasaChatNavigator} options={{title:'Have a conversation', drawerIcon: ({focused,size})=>(
        <Ionicons name="chatbox-ellipses-outline" size={22} style={{color:'#363130'}}/>
      )}}/>
      <Drawer.Screen name="Settings" component={SettingsNavigator} options={{title:'Settings', drawerIcon: ({focused,size})=>(
        <AntDesign name="setting" size={22} style={{color:'#363130'}}/>
      )}}/>
      {/* <Drawer.Screen name="Review Exercise" component={QandANavigator} /> */}
      {/* <Drawer.Screen name="Select and Listen" component={SelectAndListenNavigator} /> */}
      {/* <Drawer.Screen name="Fill in the blank" component={FillBlanksNavigator} /> */}
    </Drawer.Navigator>
  )
}

const WelcomeStack = createStackNavigator();

function WelcomeNavigator() {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
    </WelcomeStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name="Settings"
        component={UserSettingScreen}
        options={{animationEnabled: false}}
        />
      <ProfileStack.Screen
        name="Languages"
        component={LanguageSelectScreen}
        />
      <ProfileStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{animationEnabled: false}}
        />
      <ProfileStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        />
      
    </ProfileStack.Navigator>
  )
}

const QandAStack = createStackNavigator();

function QandANavigator() {
  return (
    <QandAStack.Navigator>
      <QandAStack.Screen
        name="Review Exercise"
        component={QandAScreen}
      />
    </QandAStack.Navigator>
  );
};

const RasaChatStack = createStackNavigator();

function RasaChatNavigator() {
  return (
    <RasaChatStack.Navigator initialRouteName="Chat With Immersio">
      <RasaChatStack.Screen
        name="Chat With Immersio"
        component={RasaChatScreen}
      />
      
    </RasaChatStack.Navigator>
  )
}

const SettingsStack = createStackNavigator();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={UserSettingScreen}
      />
      <SettingsStack.Screen
        name="Languages"
        component={LanguageSelectScreen}
        />
      <SettingsStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
      />
    </SettingsStack.Navigator>
  );
};

const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="Language"
        component={LanguageScreen}
      />
    </HomeStack.Navigator>
  );
};


const FillBlanksStack = createStackNavigator();

function FillBlanksNavigator() {
  return (
    <FillBlanksStack.Navigator>
      <FillBlanksStack.Screen
        name="Fill in the blanks screen"
        component={FillBlanksScreen}
      />
    </FillBlanksStack.Navigator>
  );
};

const LessonSummaryStack = createStackNavigator();

function LessonSummaryNavigator(){
return (
  <LessonSummaryStack.Navigator>
      <LessonSummaryStack.Screen
        name="Lesson Summary"
        component={LessonSummaryScreen}
      />
    </LessonSummaryStack.Navigator>
  );
};


const LanguageStack = createStackNavigator();

function LanguageNavigator() {
  return (
    <LanguageStack.Navigator>
      <LanguageStack.Screen
        name="Language"
        component={LanguageScreen}
        />
      <LanguageStack.Screen
        name="Level"
        component={LevelScreen}
        />
      <LanguageStack.Screen
        name="Classical Studies Scholar"
        component={ClassicalStudiesScholarScreen}
        />
      <LanguageStack.Screen
        name="Topic"
        component={TopicScreen}
        />
      <LanguageStack.Screen
        name="Lesson Video"
        component={VideoScreen}
      />
      <LanguageStack.Screen
        name="Imperium Romanum"
        component={LessonIntroScreen}
      />
      <LanguageStack.Screen
        name="Eurōpa"
        component={EuropaIntroScreen}
      />
      <LanguageStack.Screen
        name="Āfrica"
        component={AfricaIntroScreen}
      />
      <LanguageStack.Screen
        name="Asia"
        component={AsiaIntroScreen}
      />
      <LanguageStack.Screen
        name="Fill in the blanks screen"
        component={FillBlanksScreen}
      />
       <LanguageStack.Screen
        name="Quid est?"
        component={SelectAndListenScreen1}
      />
      <LanguageStack.Screen
        name="Ecce, est..."
        component={SelectAndListenScreen2}
      />
      <LanguageStack.Screen
        name="Ubi est?"
        component={SelectAndListenScreen3}
      />
      <LanguageStack.Screen
        name="Ubi est"
        component={SelectAndListenScreen4}
      />
      <LanguageStack.Screen
        name="Estne"
        component={SelectAndListenScreen5}
      />
      <LanguageStack.Screen
        name="Grammar Lesson"
        component={GrammarScreen}
      />
      <LanguageStack.Screen
        name="Where is Rome"
        component={newQandAScreen}
      />
      <LanguageStack.Screen
        name="Where is Rome?"
        component={drill2}
      />
      <LanguageStack.Screen
        name="Review"
        component={ReviewConversationScreen}
      />
      <LanguageStack.Screen
        name="Summary"
        component={FillBlanksScreen2}
      />
      <LanguageStack.Screen
        name="Have a conversation"
        component={preChatbotScreen}
      />



      <LanguageStack.Screen
        name="level"
        component={LevelScreenLatin}
      />





      <LanguageStack.Screen
        name="General Communication"
        component={GeneralCommunicationScreen}
      />
      <LanguageStack.Screen
        name="Topic Cree"
        component={TopicCreeScreen}
      />
      <LanguageStack.Screen
        name="Greetings & Introduction"
        component={GreetingsIntroduction}
      />
      <LanguageStack.Screen
        name="Introducing yourself"
        component={IntroducingYourself}
      />
      <LanguageStack.Screen
        name="Kâ"
        component={CardAudioScreen2}
      />
      <LanguageStack.Screen
        name="Nešta"
        component={CardAudioScreen3}
      />
      <LanguageStack.Screen
        name="Kîla"
        component={CardAudioScreen4}
      />
      <LanguageStack.Screen
        name="wâciye"
        component={CreeChoose1}
      />
      <LanguageStack.Screen
        name="Wâciye"
        component={CreeChoose2}
      />
      <LanguageStack.Screen
        name="What is your name?"
        component={CreeChoose3}
      />
      <LanguageStack.Screen
        name="tâni"
        component={SelectCreeAndListenScreen1}
      />
      <LanguageStack.Screen
        name="tâni e-išinihkâsoyan?"
        component={SelectCreeAndListenScreen2}
      />
      <LanguageStack.Screen
        name="nitišinihkâson"
        component={SelectCreeAndListenScreen3}
      />
      <LanguageStack.Screen
        name="My name is..."
        component={CreeChoose4}
      />
      <LanguageStack.Screen
        name="nitôhcîn"
        component={SelectCreeAndListenScreen4}
      />
      <LanguageStack.Screen
        name="Moose Factory Nitôhcîn"
        component={SelectCreeAndListenScreen5}
      />
      <LanguageStack.Screen
        name="nešta kîla"
        component={SelectCreeAndListenScreen6}
      />





      <LanguageStack.Screen
        name="review"
        component={ReviewCreeConversationScreen}
      />
      <LanguageStack.Screen
        name="Greetings & introduction"
        component={FinishCreeLessonScreen}
      />




    </LanguageStack.Navigator>
  );
};


const LessonIntroStack = createStackNavigator();

function LessonIntroNavigator() {
  return (
    <LessonIntroStack.Navigator>
      <LessonIntroStack.Screen
        name="Title Page"
        component={LessonTitlePageScreen}
      />
      <LessonIntroStack.Screen
        name="Lesson Introduction"
        component={LessonIntroScreen}
      />
      <LessonIntroStack.Screen
        name="Lesson Video"
        component={VideoScreen}
      />
      <LessonIntroStack.Screen
        name="Fill in the blanks screen"
        component={FillBlanksScreen}
      />
       <LessonIntroStack.Screen
        name="Select and Listen Activity 1"
        component={SelectAndListenScreen1}
      />
      <LessonIntroStack.Screen
        name="Select and Listen Activity 2"
        component={SelectAndListenScreen2}
      />
      <LessonIntroStack.Screen
        name="Select and Listen Activity 3"
        component={SelectAndListenScreen3}
      />
      <LessonIntroStack.Screen
        name="Grammar Lesson"
        component={GrammarScreen}
      />
      <LessonIntroStack.Screen
        name="Review Exercise"
        component={QandAScreen}
      />
    </LessonIntroStack.Navigator>
  );
};


const SelectAndListen1Stack = createStackNavigator();
const SelectAndListen2Stack = createStackNavigator();
const SelectAndListen3Stack = createStackNavigator();

function SelectAndListenNavigator() {
  return (
    <SelectAndListen1Stack.Navigator>
      <SelectAndListen1Stack.Screen
        name="Select and Listen Activity 1"
        component={SelectAndListenScreen1}
      />
      <SelectAndListen2Stack.Screen
        name="Select and Listen Activity 2"
        component={SelectAndListenScreen2}
      />
      <SelectAndListen3Stack.Screen
        name="Select and Listen Activity 3"
        component={SelectAndListenScreen3}
      />
    </SelectAndListen1Stack.Navigator>
  );
};
