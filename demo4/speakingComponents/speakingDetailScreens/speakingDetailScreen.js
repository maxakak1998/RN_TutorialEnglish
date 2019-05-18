import React,{Component} from 'react';
import {View,StyleSheet,Alert,Text,Dimensions} from 'react-native';
import faker from 'faker';
import { Navigation } from 'react-native-navigation';
import Slider from '@react-native-community/slider';

import PlayIcon from 'react-native-vector-icons/AntDesign' //play
import RecIcon from 'react-native-vector-icons/MaterialCommunityIcons' //record
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons' //speaker-wireless

import PauseIcon from 'react-native-vector-icons/MaterialCommunityIcons' //pause-circle
import RecIconForPlaying from 'react-native-vector-icons/Foundation' //record
import CheckIconForPlaying from 'react-native-vector-icons/MaterialCommunityIcons' //speaker-wireless
// import Sound from 'react-native-sound';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const sounder = new AudioRecorderPlayer();
const screenWidth=Dimensions.get('screen').width;
const screenHeight=Dimensions.get('screen').height;

class SliderComponent extends Component{
    constructor(args){
        super(args);
    }
    render(){
        return(
            <View 
            style={styles.sliderContainer}
            >

            <Text
            style={styles.currentPositionSecStyle}
            >
            0
            </Text>
                
            <Slider
            style={styles.sliderStyle}
            />

            <Text
            style={styles.durationPlayerTime}
            >
            4:10
            </Text>
            </View>
            
        );
    }

}

class ButtonsComponent extends Component{
    constructor(args){
        super(args);
        this.state={
            isPlaying:false,
            isRecording:false,
            isReplaying:false
        }

    }

  
    onStopPlayer=async()=>{
        console.log('stop player');
        sounder.stopPlayer();
        sounder.removePlayBackListener();
    }

    onStartPlayer=async()=>{
        console.log('start player');
        const msg=await sounder.startPlayer('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        // sounder.addPlayBackListener((e)=>{
        //     console.log(e);
        // });
        // console.log('msg: '+msg);
    }


    audioController(){

        if(this.state.isPlaying){
            this.onStopPlayer();
        }else
        {
           this.onStartPlayer();
        }

    }
    render(){
        const pauseConst=<PauseIcon onPress={()=>{
           this.setState({isPlaying:false});
            this.audioController();
        }} 
        name='pause' size={35} color='red' style={styles.playIconStyle}/>;

        const playConst= <PlayIcon onPress={()=>{
           this.setState({isPlaying:true});
            this.audioController();

        }} 
        name='play' size={35} color='black' style={styles.playIconStyle}/>;

        const recordConst=<RecIcon onPress={()=>{
            if(this.state.isRecording===true){
                this.setState({isRecording:false});
            }else
            {
                this.setState({isRecording:true});
            }
        }}name='record' size={35} color='black' style={styles.recIconStyle} />;
        const saveRecordConst=<RecIconForPlaying onPress={()=>{
            if(this.state.isRecording===true){
                this.setState({isRecording:false});
            }else
            {
                this.setState({isRecording:true});
            }
        }} name='record' size={35} color='red' style={styles.recIconStyle} />;


        return(
             <View style={styles.buttonContainer}>
                             <SliderComponent/>
                             <View style={styles.playAndRecContainerStyle}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                 {this.state.isRecording?saveRecordConst:recordConst}       
                <Text style={{color:'black'}}>Record</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                {this.state.isPlaying?pauseConst:playConst}       
                <Text style={{color:'black'}}>Play</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <CheckIcon name='speaker-wireless' size={35}/>
                <Text style={{color:'black'}}>Replay</Text>
            </View>
        </View>

             </View>   
         
        //    {this.state.isReplaying?{color:'red'}:{color:'black'}}
        );
    }
}

export default class SpeakingDetailScreen extends Component{
    componentDidMount(){
        console.log(this.props.title);
    }
    constructor(args){
        super(args);
        this.state={
            isPlaying:false,
            isRecording:false,
            isReplaying:false
        }

    }
    render(){

        return(
            <View style={styles.parentViewStyle}>
            <Text style={styles.titleStyle}>
            {this.props.title}
            </Text>
            <Text style={styles.lessonTextStyle}
            textBreakStrategy='highQuality'
            >
                {faker.lorem.paragraph(10)}

            </Text>
            <View style={styles.crossinglineStlye}/>
            <ButtonsComponent
            />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    parentViewStyle:{
        flex:1,
        backgroundColor:'rgba(179, 255, 255,.3)'
    },
    titleStyle:{
        fontSize:28,
        fontWeight:'bold',
        color:'black',
        fontStyle:'italic',
        alignSelf:'center',
        margin:10,
        textAlign:'center'
    },
    lessonTextStyle:{
        fontWeight:'300',
        fontSize:18,
        color:'black',
        marginLeft:3,
        marginTop:15,
    },
    crossinglineStlye:{
        flexDirection:'row',
        height:1,
        backgroundColor:'grey',
        marginTop:30,
        opacity:1
        
    },
    playAndRecContainerStyle:{
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        justifyContent:'space-around'

    },
    playIconStyle:{
        
    },
    sliderStyle:{
        height:50,
        width:screenWidth-100,

    },
    sliderContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        flexDirection:'row'
    }
    ,
    buttonContainer:{
        flex:1
    }
    ,
    childView:{
        flex:1
    },
    currentPositionSecStyle:{
        color:'black',
        fontWeight:'bold',
        fontSize:15
    },
    durationPlayerTime:{
        color:'black',
        fontWeight:'bold',
        fontSize:15
        }

});