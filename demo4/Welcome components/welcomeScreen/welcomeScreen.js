import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { View, StyleSheet, Image, Text, Dimensions,Alert } from "react-native";
import App from "./../../App";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import Swiper from "react-native-swiper";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
let pageIndex=0;
 
export default class WelcomeScreen extends Component {

  componentWillMount(){
    console.log('Component will mount !');
  }
  componentDidMount(){
    console.log('Component did mount !');
    Navigation.mergeOptions(this.props.componentId,{
      topBar:{
        drawBehind:true,
        visible:false,
        animate:false,
        height:0,
      },
      sideMenu:{
        left:{
          enabled:false
        }
      }
    });

  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('Component will update !');

  }

  onSwipeRight(gestureState){
    console.log("Right");
    console.log(gestureState.dx);

  }
  onSwipeLeft(gestureState) {
    console.log("Left");
    console.log(gestureState.dx);

    // console.log(pageIndex);
    if(pageIndex==2)
    {
      Navigation.push(this.props.componentId,{
        component:{
          name:'Learning',
          options:{
            animations:{
              push:{
                enabled:false
              }
            }
          }
        }
        
      });
    }

  }
  render() {
    console.log('Render');

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
        <Swiper
        onIndexChanged={index => {
          pageIndex= index;

        }}
        loop={false}


      >
       
        <View style={styles.pagerStyle}>
       
          <GestureRecognizer
           style={styles.pagerStyle}
           onSwipeLeft={(state) => this.onSwipeLeft(state)}
           onSwipeRight={(state) => this.onSwipeRight(state)}

           config={this.config}

          >

          <Image
            style={styles.itemStyle}
            resizeMode="stretch"
            // source={require('../../image/1.png')}
            //  source={{uri:('https://www.ryanfoland.com/wp-content/uploads/the-more-you-talk-the-less-people-listen-ryan-foland-1000x600.jpg')}}
            source={{
              uri:
                "https://s-media-cache-ak0.pinimg.com/originals/f4/d1/08/f4d1086218db41af03896d20d7249f65.jpg"
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: 30
              }}
            >
              Learning English with many interesting topics
            </Text>
          </View>
          </GestureRecognizer>
        </View>

        <View style={styles.pagerStyle}>
       <GestureRecognizer
       style={{flex:1}}
       config={this.config}
       onSwipeLeft={(state) => this.onSwipeLeft(state)}
       onSwipeRight={(state) => this.onSwipeRight(state)}


       >
       <Image
            style={styles.itemStyle}
            resizeMode="stretch"
            source={require("../../image/1.png")}
            //  source={{uri:('https://www.ryanfoland.com/wp-content/uploads/the-more-you-talk-the-less-people-listen-ryan-foland-1000x600.jpg')}}
            //   source={{uri:('https://s-media-cache-ak0.pinimg.com/originals/f4/d1/08/f4d1086218db41af03896d20d7249f65.jpg')}}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: 30
              }}
            >
              Learning English with many interesting topics
            </Text>
          </View>
       </GestureRecognizer>
        </View>

        <View style={styles.pagerStyle}>
              <GestureRecognizer
              style={{flex:1}}
              config={this.config}
              onSwipeLeft={(state)=>{this.onSwipeLeft(state)}}
              onSwipeRight={(state) => this.onSwipeRight(state)}

              >
              <Image
            style={styles.itemStyle}
            resizeMode="stretch"
            source={require("../../image/Picture1.jpg")}
            //  source={{uri:('https://www.ryanfoland.com/wp-content/uploads/the-more-you-talk-the-less-people-listen-ryan-foland-1000x600.jpg')}}
            //   source={{uri:('https://s-media-cache-ak0.pinimg.com/originals/f4/d1/08/f4d1086218db41af03896d20d7249f65.jpg')}}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: 30
              }}
            >
              Learning English with many interesting topics
            </Text>
          </View>
              </GestureRecognizer>
        </View>
      </Swiper>
    );

    
  }
  getTheIndex(){
     <Swiper onIndexChanged={(index)=>{return index}}/>
  }

}

const styles = StyleSheet.create({
  itemStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 2 + 30,
    width: null,
    borderRadius: 5
  },
  pagerStyle: {
    flex: 1,
    padding: 5
  }
});
// tạo ra một function ở dưới và return giá trị của index dưới dạng <Swiper return onIndexChanged=....a