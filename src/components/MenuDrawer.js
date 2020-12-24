import React from 'react'
import
{
    ScrollView,
    Platform,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import firebase from '../../Firebase'


const WIDTH =Dimensions.get('window').width
const HEIGHT= Dimensions.get('window').height;

export default class MenuDrawer extends React.Component{

  state={
    userName:"",
    userSurname:"",
  }
LogOut=() =>{
  let that = this ;

  firebase.auth().signOut().then(function() {
    console.log("ÇIKIŞ YAPTI")
    that.props.navigation.navigate("Login")
      }).catch(function(error) {
    // An error happened.
    console.log("HATA",error)

  });
}
   componentDidMount (){
    try {
      console.log("GİRDİDİD")
        firebase.firestore().collection("UserInfo").doc(firebase.auth().currentUser.uid)
        .get()
      .then(querySnapshot => {
        this.setState({
          userName:querySnapshot.data().name,
          userSurname:querySnapshot.data().surname
        })
      });
      
    } catch (error) {
      console.log(error)
      
    }

  }

    navLink(nav,text){
        return(
            <TouchableOpacity style={{height:50}} onPress={() => this.props.navigation.navigate(nav)} >
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }
    render(){
      console.log("MENUDRAW",this.props.navigation.navigate.params)
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scroller}>
                    <View style={styles.topLinks}>
                    <View style={styles.profile}>
                            <View style={styles.imgView}>
                                <Image style={styles.img} source={require("../../assets/icon.png")}/>
                            </View>
                            <View style={styles.profileText}>
                                <Text style={styles.name}>{this.state.userName} {this.state.userSurname}</Text>
                            </View>
                    </View>
                    </View>
                    <View style={styles.buttonLinks}>

                        {this.navLink('Home','Anasayfa')}
                        {this.navLink('Today','Günlük İşler')}
                        {this.navLink('Settings','Ayarlar')}
                        

                    </View>
           
                
                    </ScrollView>

                    <View style={styles.footer}>
                      <View style={styles.footerinfo}>
                      <Text style={styles.description}>Timesheet</Text>
                        
                        <Text style={styles.version}>v1.0</Text>
                      </View>
                


                        <View style={styles.imageView}>
                    <TouchableOpacity onPress={() => this.LogOut()}>

                  <Image source={require('../images/logout.png')}/>
                  </TouchableOpacity>

                    </View>
                    </View>
            </View>
        )
    }
    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroller:{
      flex:1,
  },
  profile: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#777777",
  },
  profileText:{
    flex:3,
    flexDirection:'column',
    justifyContent:'center',

  },
  name:{
    fontSize:0.045*WIDTH,
    paddingBottom:5,
    color:'white',
    textAlign:'left'
  },
  imgView:{
    flex: 1,
    paddingLeft:20,
    paddingRight:20,

  },
  img:{
    height:HEIGHT*0.08,
    width: WIDTH*0.16,
    borderRadius: 50,
  },
  topLinks:{
    height:HEIGHT*0.2,
    backgroundColor:'black'
  },
  bottomLinks:{
    flex:1,
    backgroundColor:'white',
    paddingTop:10,
    paddingBottom:450,
  },
  link:{
      flex:1,
      fontSize:WIDTH*0.06,
      padding:6,
      paddingLeft:14,
      margin:5,
      textAlign:'left',
  },
  footer:{
      height:HEIGHT*0.1,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'white',
      borderTopWidth:1,
      borderTopColor:'lightgray'
    },
    footerinfo:
    {
      width:WIDTH*0.5,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'white',

    },
    version:{
        flex:1,
        fontSize:WIDTH*0.03,
        textAlign:'right',
        marginRight:20,
        color:'gray',
        },
    description:{
        flex:1,
        marginLeft:20,
        fontSize:WIDTH*0.04,
    },
    imageView:{
      height:HEIGHT*0.06,
      width: WIDTH*0.06,       
        },
        image:{
        
        }
});
