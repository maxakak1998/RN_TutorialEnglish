import React,{Component} from 'react';
import {View,StyleSheet,Alert,Text} from 'react-native';
import faker from 'faker';
import { Navigation } from 'react-native-navigation';

import PlayIcon from 'react-native-vector-icons/AntDesign' //play
import RecIcon from 'react-native-vector-icons/MaterialCommunityIcons' //record
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons' //speaker-wireless

import PauseIcon from 'react-native-vector-icons/MaterialCommunityIcons' //pause-circle
import RecIconForPlaying from 'react-native-vector-icons/Foundation' //record
import CheckIconForPlaying from 'react-native-vector-icons/MaterialCommunityIcons' //speaker-wireless
import Sound from 'react-native-sound';

class ButtonsComponent extends Component{
    constructor(args){
        super(args);
        this.state={
            isPlaying:false,
            isRecording:false,
            isReplaying:false
        }

    }

    play(){
        AudioPlayer.playWithUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

    }
    render(){
        const pauseConst=<PauseIcon onPress={()=>{
            if(this.state.isPlaying===true){
                this.setState({isPlaying:false});

            }else
            {
                this.setState({isPlaying:true});

                
            }
        }} 
        name='pause' size={35} color='red' style={styles.playIconStyle}/>;

        const playConst= <PlayIcon onPress={()=>{
            if(this.state.isPlaying===true){
                this.setState({isPlaying:false});

            }else
            {
                this.setState({isPlaying:true});
              

            }
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
            <ButtonsComponent/>

    
          
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
        
    }

});