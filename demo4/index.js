
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
                            {component:{
                                name:'ListeningDetail',
                                
                              
                                
                            },
                                component:{
                                    name:'SpeakingDetail',
                                    options:{
                                        topBar:{
                                            leftButtons:{
                                                color:'red'
                                              }
                                        }
                                    }
                                  
                                    
                                },

                                component:{
                                    name:'Listening'
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
 
 
