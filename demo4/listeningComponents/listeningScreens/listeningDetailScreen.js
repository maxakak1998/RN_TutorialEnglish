import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Picker,
  Button,
  Alert
} from "react-native";
import Play from "react-native-vector-icons/Entypo";
import Back from "react-native-vector-icons/Entypo";
import Forward from "react-native-vector-icons/Entypo";
import Pause from "react-native-vector-icons/Entypo";
import faker from "faker";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
import Spinner from "react-native-spinkit";
import { Navigation } from 'react-native-navigation';
import AudioRecorderPlayer from "react-native-audio-recorder-player";
let sounder=new AudioRecorderPlayer();
let height = Dimensions.get("window").height;
let width = Dimensions.get("window").width;
let count;
class QuestionRow extends Component {
  constructor(args) {
    super(args);
    this.state = {
      language: "None"
    };
  }
  render() {
    return (
      <View style={styles.questionContainer}>
        <View >
        <Text
          style={styles.questionText}
          numberOfLines={3}
          lineBreakMode="tail"
        >
          {this.props.question}
        </Text>

        <Play name="controller-play" size={20} color="red"/>

        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.answer}>Chosse your answer here:</Text>
          <Picker
            selectedValue={this.state.language}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
            itemStyle={{ textAlign: "center" }}
          >
            <Picker.Item value="A" label={this.props.answerA} />
            <Picker.Item value="B" label={this.props.answerB} />
            <Picker.Item value="C" label={this.props.answerC} />
            <Picker.Item value="D" label={this.props.answerD} />
          </Picker>
        </View>



      </View>
    );
  }
}
const ViewTypes = {
  SimpleRow: 0
};
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;


export default class LearingDetailScreen extends Component {
  constructor(args) {
    super(args);
    this.state={
      isLoading:false
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.createQuestionArray();
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1, r2;
      }).cloneWithRows(this._questionArray)
    };

    this._layoutProvider = new LayoutProvider(
      index => {
        return ViewTypes.SimpleRow;
      },
      (type, dim) => {
        dim.height = screenWidth / 2 - 10;
        dim.width = screenWidth;
      }
    );
  }
  componentDidMount(){
    Navigation.mergeOptions(this.props.componentId,{
      topBar:{
        rightButtons:{
          id:"rightBtn",
          icon:require("../../image/images.png")
        }
      }
   });
  }
 
  

   async navigationButtonPressed({ buttonId }) {
    // will be called when "buttonOne" is clicked
    if(buttonId=="rightBtn"){
      // Alert.alert("A");

      const msg = await sounder.startPlayer(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      );
      console.log(msg);


     
    }
  }
  getRandomNumber() {
    return Math.random() * (+6 - 2) + 2;
  }
  createQuestionArray() {
    console.log("createQuestionArray goes !");
    this._questionArray = [];
    for (let i = 0; i < 12; i++) {
      this._questionArray.push({
        question:
          i+1+". " +
          faker.lorem.words(this.getRandomNumber()) +
          " ___ " +
          faker.lorem.words(this.getRandomNumber()) +
          ".",
        answerA: faker.hacker.abbreviation(),
        answerB: faker.hacker.adjective(),
        answerC: faker.hacker.ingverb(),
        answerD: faker.hacker.noun(),
        answer: "A"
      });
      console.log(`Question ${i} is created`);
    }
    console.log("The questionArray is :");
    console.log(this._questionArray);
  }

  _rowRenderer = (type, data) => {
    console.log("_rowRenderer goes !");
    console.log("data in rowrenderer is :");
    console.log(data);
    
    if (type == ViewTypes.SimpleRow) {
      return (
        <View 
        >
          <View style={styles.rowRenderer}>
          <QuestionRow
            answerA={data.answerA}
            answerB={data.answerB}
            answerC={data.answerC}
            answerD={data.answerD}
            answer={data.answer}
            question={data.question}
          />
        </View>
        <View style={styles.crossLine}>
          </View>
        </View>
      );

    }
  };
  
  render() {
    return (
      <RecyclerListView
        style={styles.recyerListView}
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
        showsVerticalScrollIndicator={false}
        renderFooter={()=>{
          return(<Button
          onPress={()=>{Alert.alert("CLicked")}}
          title="Submit"
          >
          </Button>)
        }}
      >
      <View>
        <Text>
        </Text>
      </View>
      </RecyclerListView>
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    height: 35,
    padding: 5,
    marginTop: 3
  },
  pickerStyle: {
    height: 28,
    width: 150
  },
  questionContainer: {
    
  },
  buttonSubmit:{
    width:50
  },
  questionText: {
    fontSize: 18,
    color: "black",
    padding: 5
  },
  answer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red"
  },
  rowRenderer: {
    padding:2,
  },
  crossLine:{
    backgroundColor:"grey",
    height:1,
    marginTop:15
  },
  recyerListView:{
    backgroundColor: "rgba(179, 255, 255,.3)",
    flex:1
  }
});
