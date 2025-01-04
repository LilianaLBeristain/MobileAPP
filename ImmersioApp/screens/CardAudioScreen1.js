/*
 * Author:  Liliana Mayte Lopez Beristain
 * Date:    November 2022
 * Project: Language learning APP Mock
 * Purpose: View of a screen for a interactive language learning application
 */
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import MenuIcon from '../components/MenuIcon';
import main from '../styles/main';
import Responsive from '../components/responsive';

/*
 * Stores the current state of the application.
 * Waits until AsyncStorage.setItem() returns a promise.
 */
const _storeData = async (value) => {
    try {
        var key = 'lessonIntro'
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
};

/*
 * Main function of the screen
 */
function App() {
    /* Constants */
    const [disable, setDisable] = useState(false);
    const [sound, setSound] = useState();
    const navigation = useNavigation();

    /*
     * Hard coded variables. 
     */
    var lessonIntroDescription = "This refers to the Roman Empire, whoses borders expanded and contracted throughout its many centuries. The borders you see here are from the year 117 anno Domini. They represent the empire's greatest extent until the death of the emperor Trajan."
    var lessonIntroImage = '../assets/Cree/waciye.png'
    var explanation1 = "wâciye"
    var explanation2 = "can mean hello, good bye, welcome"
    var lessonTitle = 'Introducing yourself'

    const [isVisible, trackVisible] = useState({
        visible: false,
    })

    const disableRepeat = () => {
        setDisable(true);
        setTimeout(() => { setDisable(false); }, 2000);
    }

    /* Retrieves the audio file and plays the sound */
    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/Cree/waciye.mp3'));
        setSound(sound);
        await sound.playAsync();
        trackVisible({ visible: true })
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: (StackHeaderLeftButtonProps) => <MenuIcon />
        });
    });

    /* Generates a view for the APP */
    return (
        <SafeAreaView style={main.safeAreaContainer}>
            <View style={main.lessonNameAreaLatin}>
                <View style={main.lessonTitleBar}>
                    <TouchableOpacity onPress={() => {
                        _storeData('done');
                        stopSound();
                        navigation.navigate("Greetings & Introduction")
                    }}>
                        <Image
                            source={require('../assets/TriangleLeft.png')}
                            resizeMode='contain' style={{ marginVertical: Responsive(3) }} />
                    </TouchableOpacity>
                    <Text style={main.lessonTitleText}>{lessonTitle}</Text>
                    <TouchableOpacity onPress={() => {
                        _storeData('done');
                        stopSound();
                        navigation.navigate("Kâ")
                    }}>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={main.lessonContentArea}>
                <View style={styles.introductionScreen}>
                    <Image style={styles.image} source={require(lessonIntroImage)} resizeMode='contain' />
                    {isVisible.visible && <Text style={{ color: 'gray', fontSize: Responsive(18), marginTop: 25, fontWeight: 'bold' }}> {explanation1} </Text>}
                    {isVisible.visible && <Text style={{ color: 'gray', fontSize: Responsive(18) }}> {explanation2} </Text>}
                </View>
            </View>
            <View style={main.lessonNavButtonArea}>
                <TouchableOpacity
                    disabled={disable}
                    onPress={() => {
                        disableRepeat(),
                            _storeData('done');
                        playSound();
                    }}>
                    <Text style={main.lessonContinueButtonText}>
                        wâciye
                    </Text>
                </TouchableOpacity>
                {isVisible.visible && <TouchableOpacity
                    disabled={disable}
                    onPress={() => {
                        navigation.navigate("Kâ")
                        disableRepeat(),
                            _storeData('done');
                    }}>
                    <Image
                        source={require('../assets/next.png')}
                        resizeMode='contain' style={{ width: 55 }} />
                </TouchableOpacity>}
                <View>
                    <Image
                        source={require('../assets/voice.png')}
                        resizeMode='contain' style={{ width: 35 }} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default App;