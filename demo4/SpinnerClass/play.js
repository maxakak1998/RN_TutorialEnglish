import Play from 'react-native-vector-icons/Entypo';
import React, { Component } from "react";
import {
  View
} from "react-native";
import Spinner from "react-native-spinkit";
import { Navigation } from 'react-native-navigation';
export default class PlayClass extends Component {  
     render(){
        return(
          <View style={{flex:1}}>
              <Play name={"controller-play"} size={20}/>
          </View>
        );
      }
}
