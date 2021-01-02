import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,
  SafeAreaView,Dimensions,TouchableWithoutFeedback,Keyboard} from 'react-native';
import MenuButton from '../MenuButton';
import firebase from '../../../Firebase'
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
const WIDTH= Dimensions.get('window').width;
const HEIGHT= Dimensions.get('window').height;
export default class SettingsScreen extends React.Component {
  state={
    myUid:"",
    name:"",
    surname:"",
    password:"",
    email:""
  }
async componentDidMount(){
  await this.setState({
    myUid:firebase.auth().currentUser.uid
  })
  try {
    firebase.firestore()
    .collection('UserInfo').doc(this.state.myUid)
    .get()
    .then(querySnapshot => {
      this.setState({
        name:querySnapshot.data().name,
        surname:querySnapshot.data().surname,
        email:querySnapshot.data().mail,
      })
      });
  
  } catch (error) {
  }

}

updateInfo(){
  try{
    firebase.firestore().
    collection('UserInfo').
    doc(this.state.myUid).
    update({
    name:this.state.name,
    surname:this.state.surname 
    })
    .then(querySnapshot => {
      this.componentDidMount();
      });
  }catch(error){
  }
}


    render()
    {
        return(      
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
         
          <SafeAreaView style={styles.safeArea} >

          <View style={styles.container}>
             <MenuButton navigation={this.props.navigation}/>
             <View style={styles.imageView}>
                  <Image style={styles.image} source={require('../../images/update.png')}/>
        </View>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Ad..." 
              placeholderTextColor="#003f5c"
              value={this.state.name}
              onChangeText={text => this.setState({name:text})}/>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Soyad..." 
              placeholderTextColor="#003f5c"
              value={this.state.surname}
              onChangeText={text => this.setState({surname:text})}/>
          </View>
          <View style={styles.inputView} >
            <Text
              style={styles.inputText}
              >{this.state.email}</Text>
          </View>
  
          <TouchableOpacity style={styles.updateBtn} onPress={() => this.updateInfo()}>
      <Text style={styles.updateText}>Güncelle</Text>
          </TouchableOpacity>
  
  
          <FlashMessage position="bottom" />
  
        </View>

        </SafeAreaView>
        </TouchableWithoutFeedback>

        )
    }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FF5236'
  },
  container: {
    flex: 1,
    backgroundColor: '#f3ece7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView:{
marginBottom:30
 
  },
  image:{
    width:250,
    height:80,
     resizeMode:"contain"
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#FFFFFF",
    marginBottom:40,
    fontFamily:"Roboto"
  },
  inputView:{
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputText:{
    backgroundColor: '#fff',
    flex: 1,
    height: 45,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ebcfc4',
    padding: 10,
    marginVertical: 10,

  },
  forgot:{
    color:"black",
    fontSize:11,
    paddingBottom:20
  },
  updateBtn:{
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00b5ec",
  },
  updateText:{
    color:"white"
  }
});
