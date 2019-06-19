import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  ActivityIndicator,
  Button,
  BackHandler,
  ToastAndroid
} from "react-native";
import faker from "faker";
import { Navigation } from "react-native-navigation";
import Slider from "@react-native-community/slider";

import PlayIcon from "react-native-vector-icons/AntDesign"; //play

import RecIcon from "react-native-vector-icons/MaterialCommunityIcons"; //record
import CheckIcon from "react-native-vector-icons/MaterialCommunityIcons"; //speaker-wireless

import PauseIcon from "react-native-vector-icons/MaterialCommunityIcons"; //pause-circle
import RecIconForPlaying from "react-native-vector-icons/Foundation"; //record
import CheckIconForPlaying from "react-native-vector-icons/MaterialCommunityIcons"; //speaker-wireless
import Sound from "react-native-sound";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import * as RNFS from "react-native-fs";
let sounder = new AudioRecorderPlayer();
// let sounder1 = new Sound(
//   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
// );
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
let currentPlayerTime = 0;
class SliderComponent extends Component {
  constructor(args) {
    super(args);

    this.state = {
      isDrag: false
    };
  }

  _onSlidingComplete(value) {
    sounder.seekToPlayer(value);
  }

  render() {
    return (
      <View style={styles.sliderContainer}>
        <Text style={styles.currentPositionSecStyle}>
          {this.props.currentTime}
        </Text>

        <Slider
          style={styles.sliderStyle}
          minimumValue={0}
          maximumValue={this.props.durationPlayerTimeInSecs}
          value={this.props.currentTimePlayerInSecs}
          onSlidingComplete={this._onSlidingComplete.bind(this)}
        />

        <Text style={styles.durationPlayerTime}>{this.props.durationTime}</Text>
      </View>
    );
  }
}

class ButtonsComponent extends Component {
  constructor(args) {
    super(args);
    this.state = {
      isLoading: false,
      isPlaying: false,
      isRecording: false,
      isReplaying: false,
      isPause:false,
      currentTime: 0,
      duration: 0,
      durationTimeInSecs: 0,
      currentTimePlayerInSecs: 0
    };

  }

  sentDataFromParent=async ()=>{
    console.log("sentDataFromParent goes !");
    await this.props.callBackFromParent(this.state.isLoading,this.state.isReplaying,this.state.isPlaying,this.state.isRecording);
  }
  // componentDidMount() {
  //   console.log("did mount");
  // }
  // componentWillMount() {
  //   console.log("will mount");
  // }

  // componentWillUpdate() {
  //   console.log("will update");
  //   console.log("is loading at will update: " + this.state.isLoading);
  //   console.log("is playing at will update: " + this.state.isPlaying);
  // }

  componentDidUpdate(prevPro, prevState) {  
    if(prevState.isLoading != this.state.isLoading  || prevState.isPlaying != this.state.isPlaying 
      || prevState.isReplaying!= this.state.isReplaying || prevState.isRecording!= this.state.isRecording){
        this.sentDataFromParent();
      }
  }

  onStopPlayer = async () => {
    console.log("Stop player");
    console.log(`is pause is : ${this.state.isPause}`);

    if(this.state.isPause===true){
      sounder.resumePlayer();
      this.setState({isPause:false});
    }
    await sounder.stopPlayer();
    this.setState({currentTimePlayerInSecs:0,durationPlayerTimeInSecs:0});
  
  };
  onStartPlayer = async () => {
   
    console.log("onStartPlayer goes");
    setTimeout(async () => {
      const msg = await sounder.startPlayer(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      );
      this.setState({ isLoading: false });
      console.log(msg);
    }, 0);
  };

  playAudio = () => {
    this.onStartPlayer();
    this.getCurrentTimePlayer();
    this.getDurationTime();
    this.getDurationTimeInSecs();
    this.getCurrentTimePlayerInSecs();
  };


  getCurrentTimePlayer() {
    sounder.addPlayBackListener(e => {
      this.setState({
        currentTime: sounder.mmss(Math.floor(e.current_position / 1000))
      });
    });
  }
  getCurrentTimePlayerInSecs() {
    sounder.addPlayBackListener(e => {
      this.setState({
        currentTimePlayerInSecs: Math.floor(e.current_position / 1000)
      });
    });
  }
  getDurationTime() {
    sounder.addPlayBackListener(e => {
      this.setState({ duration: sounder.mmss(Math.floor(e.duration / 1000)) });
    });
  }
  getDurationTimeInSecs() {
    sounder.addPlayBackListener(e => {
      this.setState({ durationTimeInSecs: Math.floor(e.duration / 1000) });
      // console.log("duration time in secs: " + this.state.durationTimeInSecs);
    });
  }
  audioController(){
    console.log("audio controller");
    console.log(this.state.isPlaying);
    if(this.state.isPlaying===true){
      if(this.state.currentTimePlayerInSecs >0 && this.state.currentTimePlayerInSecs<this.state.durationTimeInSecs)
      {
        console.log("current time is higher than 0");
        console.log(this.state.currentTimePlayerInSecs);
        if(this.state.currentTimePlayerInSecs!=this.state.durationTimeInSecs){
          console.log("current time is lower than duration player")
          console.log("duration time  : "+this.state.durationTimeInSecs);
          console.log("current time : "+this.state.currentTimePlayerInSecs);
          sounder.resumePlayer(); 
        }
      }
      else
      {
        console.log("Begin player ");
        console.log(this.state.currentTimePlayerInSecs);
        this.setState({ isLoading: true }, () => {
        this.playAudio();
      });
      console.log("set state in playConst");
      console.log("is playing at playConst: " + this.state.isPlaying);

      }
    }
  }
  createPath(){
    //The path is :id/Speaking/TopicName/LessonName
    return `sdcard/Kiet123/Speaking/${this.props.topicName}/${this.props.title}/record.mp4`
  }
  onStartRecord(){
    console.log("onStartRecord goes !")
    console.log("Ready to start rec");
      const startRecordResult= sounder.startRecorder(this.createPath());
      console.log("Completed start rec");
      console.log(startRecordResult);
  }
  onStopRecord(){
    console.log("Stop rec");
    const stopRecordResult= sounder.stopRecorder();  
    sounder.removeRecordBackListener();
    console.log(stopRecordResult);
    
  }

  onReplayingStart(){
    setTimeout(async()=>{
              console.log("OnReplayingStart goes !");
              await this.onStopPlayer();
              const result=await sounder.startPlayer(this.createPath());
              console.log(`result is : ${result}`);
              sounder.addPlayBackListener((e)=>{
              if(e.current_position==e.duration){
                //End the replay 
                sounder.stopPlayer();
                sounder.removePlayBackListener();
                console.log("End the replay")
                this.setState({isReplaying:false});
              }
            });
          },0
          );
          console.log("Path is "+this.createPath());
  }

  render() {
    const pauseConst = (
      <PauseIcon
        onPress={() => {
          this.setState({ isPlaying: false });
          this.setState({isPause:true});
          console.log("set state in pause const");
          if(this.state.currentTimePlayerInSecs!=this.state.durationPlayerTimeInSecs){
            sounder.pausePlayer();
            console.log("Pause !");
          }
          else if (this.state.currentTimePlayerInSecs==this.state.durationTimeInSecs){
            sounder.stopPlayer();
            console.log("Stop !");
          }
        }}
        name="pause"
        size={35}
        color="red"
        style={styles.playIconStyle}
      />
    );

    const loaderConst = <ActivityIndicator size="large" color="#0000ff" />;
      
    const playConst = (
      <PlayIcon
        onPress={() => {
          this.setState({ isPlaying: true },this.audioController);
          this.setState({isPause:false});
        }}
        name="play"
        size={35}
        color="black"
        style={styles.playIconStyle}
      />
    );

    const inactivePlayConst = (
      <PlayIcon
        name="play"
        size={35}
        color="grey"
        style={styles.playIconStyle}
      />
    );

    const recordConst = (
      <RecIcon
        onPress={() => {
          if (this.state.isRecording === true) {
            this.setState({ isRecording: false});
          } 
          else {
            this.setState({ isRecording: true },this.onStartRecord);
          }

          
        }}
        name="record"
        size={35}
        color="black"
        style={styles.recIconStyle}
      />
    );
    const inactiveRecordConst = (
      <RecIcon
        name="record"
        size={35}
        color="grey"
        style={styles.recIconStyle}
      />
    );
    
    const replayConst = (
      <CheckIcon name="speaker-wireless" size={35} color="black" 
        onPress={async ()=>{
          console.log("Replay pressed !");
          let isExists=await RNFS.exists(this.createPath());
          console.log(`Is exist : ${isExists}`);
          if(isExists){
              this.setState({isReplaying:true},()=>{this.onReplayingStart()});
             
          }
          else{
            console.log("Record not found !");
              ToastAndroid.showWithGravity("Not found the record",ToastAndroid.SHORT,ToastAndroid.BOTTOM);
          }
        }}     
       />
    );
    const inactiveReplayConst = (
      <CheckIcon name="speaker-wireless" size={35} color="grey" />
    );
    const saveRecordConst = (
      <RecIconForPlaying
        onPress={() => {
          if (this.state.isRecording === true) {
            this.setState({ isRecording: false },this.onStopRecord);

          } else {
            this.setState({ isRecording: true });
          }

        }}
        name="record"
        size={35}
        color="red"
        style={styles.recIconStyle}
      />
    );

    return (
      <View style={styles.buttonContainer}>
        <SliderComponent
          //truyen currentSecs va duration vao
          currentTime={this.state.currentTime}
          durationTime={this.state.duration}
          durationPlayerTimeInSecs={this.state.durationTimeInSecs}
          currentTimePlayerInSecs={this.state.currentTimePlayerInSecs}
        />
        <View style={styles.playAndRecContainerStyle}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {this.state.isPlaying === true || this.state.isReplaying
              ? inactiveRecordConst
              : this.state.isRecording
              ? saveRecordConst
              : recordConst}
            <Text style={{ color: "black" }}>Record</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {(this.state.isRecording===true||this.state.isReplaying===true?(inactivePlayConst):(this.state.isLoading // nếu mà isLoading là true,là sẽ hiện cái nút quay quay ra
              ? loaderConst //còn không thì thì sẽ là nút play hoặc nút pause
              : this.state.isPlaying
              ? pauseConst
              : playConst))}

            <Text style={{ color: "black" }}>Play</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {this.state.isPlaying === true || this.state.isRecording === true
              ? inactiveReplayConst
              : replayConst}
            <Text style={{ color: "black" }}>Replay</Text>
          </View>
        </View>
      </View>

    );
  }
}

export default class SpeakingDetailScreen extends Component {
  
  constructor(args) {
    super(args);
    // this.onBackPress = this.onBackPress.bind(this);
    // Navigation.events().bindComponent(this); 
  }

  getData=(isLoading,isReplaying,isPlaying,isRecording)=>{
    //get data
    console.log("get data goes");
    console.log(`isloading is : ${isLoading}`);
    console.log(`isReplaying is : ${isReplaying}`);
    console.log(`isPlaying is : ${isPlaying}`);
    console.log(`isRecoding is : ${isRecording}`)

    this.isLoading=isLoading;
    this.isReplaying=isReplaying;
    this.isPlaying=isPlaying;
    this.isRecording=isRecording;
  }
 
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // console.log("The topic name is : "+this.props.topicName, this.props.title);
    // Kiet123/speaking/topic name/lesson name/your record
    RNFS.mkdir(`sdcard/Kiet123/Speaking/${this.props.topicName}/${this.props.title}`);
    
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }


  onBackPress = () => {
    const { screen, navigator } = this.props;
    if(sounder._isPlaying===true){
      sounder.stopPlayer();
      sounder.removePlayBackListener();
    }
    if(this.isRecording===true){
      sounder.stopRecorder();
      sounder.removeRecordBackListener();
    }
    if(this.isReplaying===true){
      sounder.stopPlayer();
      sounder.removePlayBackListener();
    }
    Navigation.pop();
    console.log('Back');
  }
  render() {
    return (
      <View style={styles.parentViewStyle}>
        <Text style={styles.titleStyle}>{this.props.title}</Text>
        <Text style={styles.lessonTextStyle} textBreakStrategy="highQuality">
          {faker.lorem.paragraph(8)}
        </Text>
        <View style={styles.crossinglineStlye} />
        <ButtonsComponent title={this.props.title} topicName={this.props.topicName} callBackFromParent={this.getData}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentViewStyle: {
    flex: 1,
    backgroundColor: "rgba(179, 255, 255,.3)"
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    fontStyle: "italic",
    alignSelf: "center",
    margin: 10,
    textAlign: "center"
  },
  lessonTextStyle: {
    fontWeight: "300",
    fontSize: 18,
    color: "black",
    marginLeft: 3,
    marginTop: 15
  },
  crossinglineStlye: {
    flexDirection: "row",
    height: 1,
    backgroundColor: "grey",
    marginTop: 30,
    opacity: 1
  },
  playAndRecContainerStyle: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  playIconStyle: {},
  sliderStyle: {
    height: 50,
    width: screenWidth - 100
  },
  sliderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 1
  },
  childView: {
    flex: 1
  },
  currentPositionSecStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15
  },
  durationPlayerTime: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15
  },
  loaderStyle: {}
});
