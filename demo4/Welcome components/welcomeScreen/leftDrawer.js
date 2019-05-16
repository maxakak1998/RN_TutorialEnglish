import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  ImageBackground,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Navigation } from "react-native-navigation";

const height = Dimensions.get("window").height;
export default class LeftDrawerFromLearning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpeakingOn:false,
      isListeningOn:false,
      isRecentLessonsOn:false,
      pressedButtonColor:'#ebebe0',
      normalButtonColor:'white'
    };
  }
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
      >
        <View style={{  height: height / 4 }}>
          <ImageBackground
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: height / 4,
              width: null
            }}
            source={require("../../image/head_sideMenu.png")}
          >
            <Text
              style={{
                marginBottom: height / 8 - 5,
                marginLeft: height / 8,
                fontSize: 30,
                color: "black"
              }}
            >
              Learning
            </Text>
          </ImageBackground>
        </View>

        <View
          style={{
            marginTop: 10,
            padding:10,
            
          }}
        >
          <TouchableOpacity nativeID="speakingView"  onPress={() => {
                this.setState({ isSpeakingOn:true,isListeningOn:false,isRecentLessonsOn:false });
              }}
              style={[styles.button, this.state.isSpeakingOn?{backgroundColor:this.state.pressedButtonColor}:{ backgroundColor: this.state.normalButtonColor }]}
          >
            <View style={styles.itemContainer}>
            <Icon name="record-voice-over" size={20} color='black' style={{padding:5}}/>
            <Text style={styles.textStyle}>Speaking</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity nativeID="writingView"  onPress={() => {
                  this.setState({ isSpeakingOn:false,isListeningOn:true,isRecentLessonsOn:false });
              }}
              style={[styles.button, this.state.isListeningOn?{backgroundColor:this.state.pressedButtonColor}:{ backgroundColor: this.state.normalButtonColor }]}
          >
            <View style={styles.itemContainer}>
              <Icon name='hearing' size={20} color='black' style={{padding:5}}/>
              <Text style={styles.textStyle}>Listening</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity nativeID="recentLessonsView"  onPress={() => {
                  this.setState({ isSpeakingOn:false,isListeningOn:false,isRecentLessonsOn:true });
              }}
              style={[styles.button, this.state.isRecentLessonsOn?{backgroundColor:this.state.pressedButtonColor}:{ backgroundColor: this.state.normalButtonColor }]}
          >
            <View style={styles.itemContainer}>
            <Icon name='history' size={20} color='black' style={{padding:5}}/>

              <Text style={styles.textStyle}>Recent Lessons</Text>
            </View>
          </TouchableOpacity>

      </View>
      </View>

    );
    
  }}


const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("screen").width,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop:25,
    borderRadius:5
  },
  textStyle:{
    fontSize:20,
    fontWeight:'bold',
    padding: 5,
    color:'black',
    marginLeft:3,
  },
  itemContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }
});

