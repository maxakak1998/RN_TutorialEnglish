import React, { Component } from "react";
import Icon from "react-native-vector-icons/Entypo";

import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
  Alert
} from "react-native";
import { Navigation } from "react-native-navigation";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
import faker from "faker";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
const ViewTypes = {
  SimpleRow: 0
};
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
var Play;
class TopicContainer extends Component {

  componentDidMount(){
    console.log('component did mount : ');
    console.log(this.props._componentID);
    console.log("Topic name is " + this.props.topicName);
  }
  constructor(args) {
    super(args);
    this._generateLessons();
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1, r2;
      }).cloneWithRows(this._lessons)
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
  
  // async componentDidMount(){
  //   Play = await Icon.getImageSource("controller-play", 15, "blue");
  //   console.log(Play);
  // }
  _rowRenderer = (type, data) => {
    console.log("row renderer : ");
    console.log(data);
    console.log(`this.props._componentId + ${this.props._componentId}`)
    return (
      <TouchableOpacity
       onPress={() => {
    Navigation.push(this.props._componentId, {
      component: {
              name: "ListeningDetail",
              passProps:{
                title:data.name,
                topicName:this.props.topicName
              },
              options:{
                animations:{
                  push:{
                    enabled:false
                  }
                },
                topBar:{
                  title:{
                    text:'Listening lessons'
                  },
                  
                  // drawBehind:true,
                  // hideOnScroll:true,
                  

                  

                },
               
              }
            }
    });
  }}
  activeOpacity={10}
      >
<ImageBackground
      style={{
      height: screenWidth / 2 - 10,
      width: screenWidth,
      justifyContent: "flex-end"
      }}
      source={{ uri: data.image }}
      
      >
      <View style={{ backgroundColor: "rgba(0, 0, 0, .3)", padding: 10 }}>
      <Text  
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 20,
          marginRight: 10
        }}
      >
        {data.name}
      </Text>
      </View>
      </ImageBackground> 
      </TouchableOpacity>
      
    );
  };
  _generateLessons() {
    this._lessons = [];
    let lessonNumber = 20;
    console.log("generate lessons");
    for (let i = 0; i < lessonNumber; i++) {
      this._lessons.push({
        name: faker.name.jobTitle(),
        image: faker.image.image()
      
      });
    }
    console.log("lessons array length is : " + this._lessons.length);
    console.log(this._lessons);
  }

  render() {

    return (
      <RecyclerListView
        dataProvider={this.state.dataProvider}
        layoutProvider={this._layoutProvider}
        rowRenderer={this._rowRenderer}
        showsVerticalScrollIndicator={false}


      />
    );
  }
}
export default class ListeningScreen extends Component {
  componentWillMount() {
    console.log("ListeningScreen class");
    console.log("Will mount");
  }
  componentDidMount() {
    console.log("Did mount");

  }

  constructor(args) {
    super(args);
    console.log("constructor");
    this._generateArray();
  }
  _generateArray() {
    this.nameArray = [];
    console.log("Old array is ");
    console.log(this.props.data);
    const data = this.props.data;
    for (let i = 0; i < data.length; i++) {
      this.nameArray.push(data[i]);
    }
    console.log("New array is ");
    console.log(this.nameArray);
  }
  _initialPage=()=>{
    console.log("InitialPage goes !");
    console.log("The index is "+this.props.index);
    if(this.props.isFromLearning===true){
      console.log("Is From Learing is true !");
      return this.props.index;
    }else
    {
      return 0;
    }
  }


  render() {
    console.log("Render array is :")
    console.log(this.nameArray);
    return (
      <ScrollableTabView renderTabBar={() => <ScrollableTabBar
       underlineStyle={styles.scrollableTabStyle} 
       />}
       initialPage={this._initialPage()}
       
      >
        {this.nameArray.map(e => (
          <TopicContainer 
          tabLabel={e.topicName}
          _componentId={this.props.componentId}
          topicName={e.topicName}
          
          />
        ))}
      </ScrollableTabView>

    );
  }
}

const styles = StyleSheet.create({
  scrollableTabStyle:{
   height:null 
  }
});
