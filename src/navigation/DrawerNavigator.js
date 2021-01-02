import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createAppContainer} from'react-navigation';
import {createDrawerNavigator} from'react-navigation-drawer';

import HomeScreen from '../components/screens/HomeScreen';
import TodayScreen from '../components/screens/TodayScreen'
import SettingsScreen from '../components/screens/SettingsScreen'
import MenuDrawer from '../components/MenuDrawer';
import LoginScreen from '../components/LoginComponent/LoginScreen';
import Tab from '../components/tab/Tab'

const WIDTH= Dimensions.get('window').width;
const DrawerConfig={
    drawerWidth: WIDTH*0.63,
    contentComponent: ({navigation}) =>{
        return(<MenuDrawer navigation={navigation} />)
    }

}
const DrawerNavigator = createDrawerNavigator(
    {
        Home:{
        screen:HomeScreen
        },
        Today:{
            screen:Tab
        },
        Settings:{
            screen:SettingsScreen
        },
        Login:{
            screen:LoginScreen
        }
        
        
   },
   DrawerConfig
   
);

export default createAppContainer(DrawerNavigator);

