import React, { Component } from "react";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {
  View,
  Style,
  Text,
  BackHandler,
  Button,
  ScrollView,
  Dimensions,
  ImageBackground,
  Alert,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity 
} from "react-native";
import { Navigation } from "react-native-navigation";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
import faker from "faker";
const ViewTypes = {
  Speaking_Type: 0,
  Listening_Type: 1,
  RecentLessons_Type: 2,
  Simple_Row: 3
};
const width = Dimensions.get("window").width;

let speakingObj = { imageUri: "", topicName: "" };
let listeningObj = { imageUri: "", topicName: "" };
let recentLessonsObj = { imageUri: "", nameLesson: "" };

let fakeSpeakingData = [];
let fakeListeningData = [];
let fakeRecentLessonsData = [];
const fontSize = 18;

export default class LearningScreen extends Component {
  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: "Learning"
        }
      }
    });
  }
  constructor(args) {
    {
      console.log("constructor");
    }
    super(args);
    for (let i = 0; i < 10; i++) {
      fakeSpeakingData.push(
        (speakingObj = {
          imageUri: faker.image.avatar(),
          topicName: faker.name.jobTitle(),
          index:i,
          type:"Speaking"
        })
      );

      fakeListeningData.push(
        (listeningObj = {
          imageUri: faker.image.avatar(),
          topicName: faker.name.jobTitle(),
          index:i,
          type:"Listening"
        })
      );

      fakeRecentLessonsData.push(
        (recentLessonsObj = {
          imageUri: faker.image.avatar(),
          lessonName: faker.name.jobTitle(),
          index:i
        })
      );
    }

    console.log(fakeSpeakingData);
    console.log(fakeListeningData);
    console.log(fakeRecentLessonsData);

    //dinh ngia layout provider cho child va parent
    this._generateData();

    this._childLayoutProvider = new LayoutProvider(
      index => {
        console.log(index);
        return ViewTypes.Simple_Row;
      },
      (type, dim) => {
        dim.height = 170;
        dim.width = width / 3;
      }
    );

    this._parentLayoutProvider = new LayoutProvider(
      index => {
        if (index % 3 == 0) {
          console.log(ViewTypes.Speaking_Type + " parent layout");
          return ViewTypes.Speaking_Type;
        } else if (index % 3 == 1) {
          console.log(ViewTypes.Listening_Type + " parent layout");
          return ViewTypes.Listening_Type;
        } else if (index % 3 == 2) {
          console.log(ViewTypes.RecentLessons_Type + " parent layout");
          return ViewTypes.RecentLessons_Type;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.Speaking_Type:
            console.log("set type,dim for type: " + type + " in parent layout");
            dim.height = 250 + fontSize;
            dim.width = width;
            break;
          case ViewTypes.Listening_Type:
            console.log(
              "set type,dim for type: " + type + " in parent  layout"
            );
            dim.height = 250 + fontSize;
            dim.width = width;
            break;
          case ViewTypes.RecentLessons_Type:
            console.log("set type,dim for type: " + type + " in parent layout");
            dim.height = 250 + fontSize;
            dim.width = width;
            break;
          default:
            dim.height = 0;
            dim.width = 0;
            break;
        }
      }
    );
    {
      console.log("ready to go to state");
    }

    this.state = {
      parentDataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(this._parentArray)
    };
    {
      console.log("ready to end constructor");
    }
  }

  _generateData() {
    this._parentArray = [];
    console.log("Generate Data");

    for (let i = 0; i < 3; i++) {
      if (i == 0) {
        this._parentArray[i] = {
          dataProvider: new DataProvider((r1, r2) => {
            return r1 !== r2;
          }).cloneWithRows(fakeSpeakingData)
        };
      } else if (i == 1) {
        this._parentArray[i] = {
          dataProvider: new DataProvider((r1, r2) => {
            return r1 !== r2;
          }).cloneWithRows(fakeListeningData)
        };
      } else if (i == 2) {
        this._parentArray[i] = {
          dataProvider: new DataProvider((r1, r2) => {
            return r1 !== r2;
          }).cloneWithRows(fakeRecentLessonsData)
        };
      }
    }
  }
 

  _childRowRenderer = (type, data) => {
    console.log("Child Row Renderer");
    console.log(data);
    if (type === ViewTypes.Simple_Row) {
      if (Object.keys(data)[1] == "topicName") {
        return (
         <TouchableOpacity 
            onPress={()=>{
              Navigation.push(this.props.componentId,{
                    component:{
                            name:data.type==='Speaking'?'Speaking':'Listening', 
                            passProps:{
                              data:data.type==="Speaking"?fakeSpeakingData:fakeListeningData,
                              isFromLearning:true,
                              index:data.index
                            },options:{
                              topBar:{
                                title:{
                                  text:data.type==='Speaking'?'Speaking':'Listening'
                                }
                              }
                            }
                          } 
                  })
            }}
         >
            <View
            style={{ height: 200, elevation: 3, margin: 5, borderRadius: 2 }}
          >
            <Image
              style={{
                height: 120,
                width: null,
                borderRadius: 2,
                alignItems: "center",
                justifyContent: "center"
              }}
              source={{ uri: data.imageUri }}
              resizeMode="stretch"
            />
            <View style={{ flex: 1, marginTop: 5, justifyContent: "center" }}>
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: fontSize
                }}
              >
                {data.topicName}
              </Text>
            </View>
          </View>
         </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
           onPress={()=>{
            // Navigation.push(this.props.componentId,{
            //       component:{
            //               name:'Speaking',
            //               passProps:{
            //                 data:fakeSpeakingData,
            //                 isFromLearning:true,
            //                 index:data.index
            //               },options:{
            //                 topBar:{
            //                   title:{
            //                     text:'Recent Lesson'
            //                   }
            //                 }
            //               }
            //             } 
            //     })
          }}
          >
  <View
            style={{ height: 200, elevation: 3, margin: 5, borderRadius: 2 }}
          >
            <Image
              style={{
                height: 120,
                width: null,
                borderRadius: 2,
                alignItems: "center",
                justifyContent: "center"
              }}
              source={{ uri: data.imageUri }}
              resizeMode="stretch"
            />
            <View style={{ flex: 1, marginTop: 5, justifyContent: "center" }}>
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: fontSize
                }}
              >
                {data.lessonName}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
        
        );
      }
    }
  };

  _parentRowRenderer = (type, data) => {
    // Alert.alert(type+"");
    console.log("Parent Row Renderer");
    console.log(type);
    console.log(data);
    if (type === ViewTypes.Speaking_Type) {
      console.log("Speaking type in parent row renderer");
      console.log(data);
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", padding: 2, margin: 5 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
              >
                Speaking topics
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  padding: 5,
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ff471a",
                  justifyContent: "flex-end"
                }}
                onPress={() => {
                  Navigation.push(this.props.componentId,{
                    component:{
                            name:'Speaking',
                            passProps:{
                              data:fakeSpeakingData,
                            },options:{
                              topBar:{
                                title:{
                                  text:'Speaking'
                                }
                              }
                            }
                          } 
                  })
                  
                }}
              >
                See all
              </Text>
              <AntDesignIcon
                style={{ marginEnd: 5 }}
                name="doubleright"
                color="#ff471a"
                size={10}
              />
            </View>
          </View>

          <RecyclerListView
            style={{ padding: 2 }}
            // showsHorizontalScrollIndicator={false}

            rowRenderer={this._childRowRenderer}
            layoutProvider={this._childLayoutProvider}
            dataProvider={data.dataProvider}
            isHorizontal={true}
          />
        </View>
      );
    } else if (type === ViewTypes.Listening_Type) {
      console.log("Listening type in parent row renderer");
      console.log(data);
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", padding: 2, margin: 5 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
              >
                Listening topics
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  padding: 5,
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ff471a",
                  justifyContent: "flex-end"
                }}
                onPress={() => {
                  Navigation.push(this.props.componentId,{
                    component:{
                            name:'Listening',
                            passProps:{
                              data:fakeListeningData,
                            },options:{
                              topBar:{
                                title:{
                                  text:'Listening Lessons'
                                }
                              }
                            }
                          } 
                  })
                }}
              >
                See all
              </Text>
              <AntDesignIcon
                style={{ marginEnd: 5 }}
                name="doubleright"
                color="#ff471a"
                size={10}
              />
            </View>
          </View>

          <RecyclerListView
            style={{ padding: 2 }}
            // showsHorizontalScrollIndicator={false}

            rowRenderer={this._childRowRenderer}
            layoutProvider={this._childLayoutProvider}
            dataProvider={data.dataProvider}
            isHorizontal={true}
          />
        </View>
      );
    } else if (type === ViewTypes.RecentLessons_Type) {
      console.log("Recent type in parent row renderer");
      console.log(data);
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", padding: 2, margin: 5 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
              >
                RecentLessons
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  padding: 5,
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ff471a",
                  justifyContent: "flex-end"
                }}
                onPress={() => {
                  Alert.alert("nhất");
                }}
              >
                See all
              </Text>
              <AntDesignIcon
                style={{ marginEnd: 5 }}
                name="doubleright"
                color="#ff471a"
                size={10}
              />
            </View>
          </View>

          <RecyclerListView
            style={{ padding: 2 }}
            showsHorizontalScrollIndicator={false}
            rowRenderer={this._childRowRenderer}
            layoutProvider={this._childLayoutProvider}
            dataProvider={data.dataProvider}
            isHorizontal={true}
          />
        </View>
      );
    }
  };

  render() {
    console.log("Render");
    return (
      <RecyclerListView
        rowRenderer={this._parentRowRenderer}
        showsHorizontalScrollIndicator={false}
        dataProvider={this.state.parentDataProvider}
        layoutProvider={this._parentLayoutProvider}
      
      >

      </RecyclerListView>
    
    );  
  }
}

const styles = {
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#00a1f1"
  },
  containerGridLeft: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffbb00"
  },
  containerGridRight: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#7cbb00"
  },
  childStyle: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    borderColor: "#FFFFFF",
    borderWidth: 5,
    backgroundColor: "#F0F0F0"
  }
};
