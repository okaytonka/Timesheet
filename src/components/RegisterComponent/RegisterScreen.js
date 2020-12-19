import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../../../Firebase'
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
export default class RegisterScreen extends React.Component {
  state={
    name:"",
    surname:"",
    email:"",
    password:""
  }

  Register = (email, password) => {
      firebase
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then(data => {
           ()=>showMessage({
          message: "Başarılı",
          description: "Kayıt Yapılıyor.",
          type: "success",
        }),

        firebase
  .firestore()
  .collection("UserInfo")
  .doc(data.user.uid)
  .set(
    {
    id:data.user.uid,
    name: this.state.name,
    surname: this.state.surname,
    mail:this.state.email

  })
  .then((ref) => { 
     this.props.navigation.navigate('Home',data.user.uid)

   });

      }
         ).catch(error=>{
           console.log("HATA",error)
          showMessage({
            message: "Uyarı",
            description: "Girdiğiniz Bİlgiler Hatalı.",
            type: "info",
          });
         });


        

  };



  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Kayıt Ekranı</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Ad..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({name:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Soyad..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({surname:text})}/>
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

        <TouchableOpacity style={styles.registerBtn} onPress={() => this.Register(this.state.email, this.state.password)}>
    <Text style={styles.registerText}>KAYDOL</Text>
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
  registerBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  registerText:{
    color:"white"
  }
});