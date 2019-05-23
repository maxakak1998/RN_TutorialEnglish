import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  ActivityIndicator,
  Button
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
// import Sound from 'react-native-sound';
import AudioRecorderPlayer from "react-native-audio-recorder-player";
const sounder = new AudioRecorderPlayer();
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
      currentTime: 0,
      duration: 0,
      durationTimeInSecs: 0,
      currentTimePlayerInSecs: 0
    };
  }
  componentDidMount() {
    console.log("did mount");
  }
  componentWillMount() {
    console.log("will mount");
  }

  componentWillUpdate() {
    console.log("will update");
    console.log("is loading:" + this.state.isLoading);
    console.log("is playing: " + this.state.isPlaying);
  }

   componentDidUpdate(prevPro,prevState) {
    if(this.state.isLoading!=prevState.isLoading){
       console.log('different');
        this.playAudio();  
    }
   
  }

  onStopPlayer = async () => {
    console.log("stop player");
    sounder.stopPlayer();
    sounder.removePlayBackListener();
  };

  onStartPlayer = async () => {
    console.log("onStartPlayer goes");
    const msg =  await sounder.startPlayer(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    );
    console.log("onStartPlayer: go go go");
    //set state for isLoading to false
      this.setState({ isLoading: false });
      console.log(msg);
  };

  playAudio() {
     this.onStartPlayer();
    // this.getCurrentTimePlayer();
    // this.getDurationTime();
    // this.getDurationTimeInSecs();
    // this.getCurrentTimePlayerInSecs();
  }

  stopAudio() {
    this.onStopPlayer();
  }

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
      console.log("duration time in secs: " + this.state.durationTimeInSecs);
    });
  }

  render() {
    console.log("render");
    console.log('is loading at renderer is : '+this.state.isLoading);
    console.log('is playing at renderer is : '+this.state.isPlaying);
    const pauseConst = (
      <PauseIcon
        onPress={() => {
          this.setState({ isPlaying: false });
          console.log("set state in pause const");
          this.stopAudio();
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
        onPress={ () => {
          this.setState({ isPlaying: true });
          this.setState({ isLoading: true });
          console.log("set state in playconst");
          console.log("is playing at playConst: " + this.state.isPlaying);
        }}
        name="play"
        size={35}
        color="black"
        style={styles.playIconStyle}
      />
    );

    const recordConst = (
      <RecIcon
        onPress={() => {
          if ((this.state.isRecording === true)) {
            this.setState({ isRecording: false });
          } else {
            this.setState({ isRecording: true });
          }
        }}
        name="record"
        size={35}
        color="black"
        style={styles.recIconStyle}
      />
    );
    const saveRecordConst = (
      <RecIconForPlaying
        onPress={() => {
          if (this.state.isRecording === true) {
            this.setState({ isRecording: false });
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
            {this.state.isRecording ? saveRecordConst : recordConst}
            <Text style={{ color: "black" }}>Record</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {/* {(this.state.isLoading&&this.state.isPlaying)?loaderConst:(this.state.isPlaying?pauseConst:playConst)} */}
            {/* {this.state.isPlaying?pauseConst:playConst} */}
            {this.state.isLoading ? loaderConst : playConst}

            {/* {playConst} */}
            <Text style={{ color: "black" }}>Play</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CheckIcon name="speaker-wireless" size={35} />
            <Text style={{ color: "black" }}>Replay</Text>
          </View>
        </View>
      </View>

      //    {this.state.isReplaying?{color:'red'}:{color:'black'}}
    );
  }
}

export default class SpeakingDetailScreen extends Component {
  componentDidMount() {
    console.log(this.props.title);
  }
  
  constructor(args) {
    super(args);
  }

  render() {
    return (
      <View style={styles.parentViewStyle}>
        <Text style={styles.titleStyle}>{this.props.title}</Text>
        <Text style={styles.lessonTextStyle} textBreakStrategy="highQuality">
          {faker.lorem.paragraph(8)}
        </Text>
        <View style={styles.crossinglineStlye} />
       

        <ButtonsComponent />
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
