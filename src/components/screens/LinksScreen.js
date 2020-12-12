import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from '../MenuButton';

export default class LinksScreen extends React.Component {

    render()
    {
        return(
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation}/>

                <Text>Link Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:30,
  }
});
