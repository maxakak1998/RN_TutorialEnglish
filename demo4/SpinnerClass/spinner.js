
import React, { Component } from "react";
import {
  View
} from "react-native";
import Spinner from "react-native-spinkit";
import { Navigation } from 'react-native-navigation';
export default class SpinnerClass extends Component {  
    render(){
        return(
          <View style={{flex:1}}>
              <Spinner 
          isVisible={true}
          size={30}
          type="ChasingDots"
          color="red"
          />
          </View>
        );
      }
}
