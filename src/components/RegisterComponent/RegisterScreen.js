import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
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
        <View style={styles.imageView}>
                  <Image style={styles.image} source={require('../../images/register.png')}/>
        </View>
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
    backgroundColor: '#f3ece7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView:{
marginBottom:20
 
  },
  image:{
    height:100,
    width: 300,
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
  registerBtn:{
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00b5ec",
  },
  registerText:{
    color:"white"
  }
});