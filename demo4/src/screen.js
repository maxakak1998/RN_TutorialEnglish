import {Navigation} from 'react-native-navigation'
import App from '../App'
import WelcomeScreen from '../Welcome components/welcomeScreen/welcomeScreen.js'
import  LearningScreen  from './../Learning Component/learningScreen.js'
import LeftDrawer from '../Welcome components/welcomeScreen/leftDrawer.js'
import SpeakingScreen from './../speakingComponents/speakingScreens/speakingScreen';
import ListeningScreen from '../listeningComponents/listeningScreens/listeningScreen';
import RecentLessonsScreen from './../recentLessonsComponents/recentLessonsScreens/recentLessonsScreen';
import SpeakingDetailScreen from './../speakingComponents/speakingDetailScreens/speakingDetailScreen';
export function registerScreens(){
    Navigation.registerComponent('Welcome',()=>WelcomeScreen);    
    Navigation.registerComponent('Learning',()=>LearningScreen);    
    Navigation.registerComponent('LeftDrawer',()=>LeftDrawer);   
    Navigation.registerComponent('Speaking',()=>SpeakingScreen);
    Navigation.registerComponent('Listening',()=>ListeningScreen);
    Navigation.registerComponent('RecentLessons',()=>RecentLessonsScreen); 
    Navigation.registerComponent('App',()=>App);   
    Navigation.registerComponent('SpeakingDetail',()=>SpeakingDetailScreen);



}