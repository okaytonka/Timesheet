import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/components/LoginComponent/LoginScreen';
import RegisterScreen from './src/components/RegisterComponent/RegisterScreen';
import DrawerNavigator from './src/navigation/DrawerNavigator'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export const StackNav = createStackNavigator(
	{
		Login: {
			screen: LoginScreen,
			navigationOptions: {
				headerMode: "none",
				header: null
			}
		},
		Register: {
			screen: RegisterScreen,
			navigationOptions: {
				headerMode: "none",
				header: null
			}
    },
    Home:{
      screen:DrawerNavigator,
      navigationOptions: {
				headerMode: "none",
				header: null
			}
    }
	},
	{
		initialRouteName: "Login"
	}
);
export default createAppContainer(StackNav);
