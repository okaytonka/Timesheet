import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/components/screens/HomeScreen';
import DrawerNavigator from './src/navigation/DrawerNavigator'
export default class App extends React.Component {
render()
{
  return(
    <View style={styles.container}>
      <DrawerNavigator/>
      </View> 
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
