import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../../Firebase'
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
export default class LoginScreen extends React.Component {
  state={
    email:"",
    password:""
  }

  Login = (email, password) => {

    try {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(data=>{
          showMessage({
          message: "Başarılı",
          description: "Giriş Yapılıyor.",
          type: "success",
        }),
        console.log('Home',data.user.uid)
        this.props.navigation.navigate('Home',data.user.uid)
        
      }
         ).catch(error=>{
          showMessage({
            message: "Uyarı",
            description: "Girdiğiniz Bİlgiler Hatalı.",
            type: "info",
          });
         });

} catch (error) {
      //console.log(error.toString(error));
      
    }

  };


  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Time Sheet</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            keyboardType="email-address"
            autoCapitalize="none"
             onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Şifre..." 
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Şifrenizi Mi Unuttunuz?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.Login(this.state.email,this.state.password)} style={styles.loginBtn}>
    <Text style={styles.loginText}>GİRİŞ YAP </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.loginText}>Kaydol</Text>
        </TouchableOpacity>

        <FlashMessage position="bottom" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9C27B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#FFFFFF",
    marginBottom:40,
    fontFamily:"Roboto"
  },
  inputView:{
    width:"80%",
    backgroundColor:"#FFFFFF",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#fb5b5a",
    fontWeight:"bold",
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});