import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
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

        <View style={styles.imageView}>
                  <Image style={styles.image} source={require('../../images/timesheet.png')}/>
        </View>

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
          <Text style={styles.registerText}>Kaydol</Text>
        </TouchableOpacity>

        <FlashMessage position="bottom" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3ece7'
   },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#FFFFFF",
    marginBottom:40,
    fontFamily:"Roboto"
  },
  imageView:{
marginBottom:20,

 
  },
  image:{
    width:300,
height:100,
 resizeMode:"contain"
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
  loginBtn:{
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00b5ec",

  },
  loginText:{
    color:"white"
  },
  registerText:{
    color:"#999"
  }
});