import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { RecyclerListView } from 'recyclerlistview';
import faker from 'faker';

export default class ListeningScreen extends Component{

    componentWillMount(){
        console.log('Will mount');
    }
    componentDidMount(){
        console.log('Did mount');
    }

    constructor(args){
        super(args);
        console.log('constructor');
    }

    render(){
        return(

            <View>
                <Text>
                    Listening Screen
                </Text>
            </View>
        );
    }


}