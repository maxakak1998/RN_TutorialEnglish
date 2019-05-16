
import { registerScreens } from './src/screen';
import { Navigation } from 'react-native-navigation';


 registerScreens();

 Navigation.events().registerAppLaunchedListener(()=>{
     Navigation.setRoot({
         root:{
             sideMenu:{
                left:{
                    component:{
                        name:'LeftDrawer'
                    }
                },
                center:{
                    stack:{
                        children:[
                            {
                                component:{
                                    name:'SpeakingDetail'
                                },
                                component:{
                                    name:'Speaking'
                                },
                                component:{
                                    name:'Learning'
                                },
                                component:{
                                    name:'Welcome'
                                }
                            }
                        ]
                    }
                }

             }
         }
     });
 });
 console.disableYellowBox = true;
 
