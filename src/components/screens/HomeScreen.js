import React from 'react';
import { StyleSheet, Text, View,Dimensions, SafeAreaView, StatusBar,Modal, 
  Button,Picker,TouchableHighlight,TextInput,Vibration,TouchableWithoutFeedback  
,Keyboard
} from 'react-native';

import MenuButton from '../MenuButton'
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs';
import 'dayjs/locale/tr'
import tr from 'dayjs/locale/tr';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from '../../../Firebase'

const WIDTH= Dimensions.get('window').width;
const HEIGHT= Dimensions.get('window').height;

var cellSelector;
var endItems=[];
export default class HomeScreen extends React.Component {
  state={
    error:"",
    modalVisible: false,
    modalId:-1,
    modalStartDate:"",
    modalEndDate:"",
    modalSelectedStartHour:-1,
    modalSelectedStartMinute:0,
    modalSelectedEndHour:-1,
    modalSelectedEndMinute:0,
    title:"",
    description:"",
    events:[],
    myUid:""
  }



 async componentDidMount (){
    await this.setState({
      myUid:firebase.auth().currentUser.uid
    })
  var a=[];
  try {
    firebase.firestore()
    .collection('Users').doc(this.state.myUid)
    .collection("Jobs")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc && doc.exists) {
         // console.log("DİDİDİD",doc.id)
          a.push
          (  {
            id:doc.id,
           title: doc.data().title,
           description:doc.data().description,
            start: doc.data().startDate.toDate(),
            end: doc.data().endDate.toDate(),
            }
          )
        }
      });
  this.setState({events:a})
    });
  
  } catch (error) {
    console.log("ERROR",error)
  }



  }


  cellClick = async(e) => {
    Vibration.vibrate(10)
    console.log("CELLCLİK",e)
    cellSelector=e;
    var year=new Date(e).getFullYear(); 
    var month=new Date(e).getMonth();
    var day=new Date(e).getDate();
    var hour=new Date(e).getHours(); 
    var minute=new Date(e).getMinutes(); 
  await  this.setState({
      modalStartDate:day+"/"+month+"/"+year,
      modalEndDate:day+"/"+month+"/"+year,
      modalSelectedEndHour:hour
        })
this.endItemCreater();
    this.setModalVisible();
  }

  eventClick = async(e) => {
    console.log("EVENTCLİCK",e)
    Vibration.vibrate(10)

    cellSelector=e;

    var title=e.title;
    var description=e.description;
    var year=new Date(e.start).getFullYear(); 
    var month=new Date(e.start).getMonth();
    var day=new Date(e.start).getDate();

    var startHour=new Date(e.start).getHours(); 
    var startMinute=new Date(e.start).getMinutes(); 
    var endHour=new Date(e.end).getHours(); 
    var endMinute=new Date(e.end).getMinutes(); 
  await  this.setState({
      modalId:e.id,
      modalStartDate:day+"/"+month+"/"+year,
      modalSelectedStartHour:startHour,
      modalSelectedStartMinute:startMinute,
      
      modalEndDate:day+"/"+month+"/"+year,
      modalSelectedEndHour:endHour,
      modalSelectedEndMinute:endMinute,
      title:title,
      description:description
    })
    this.endItemCreater();
    this.setModalVisible();

  }

  setModalVisible = (control) => {
    this.setState({ 
      modalVisible: !this.state.modalVisible,
    error:""
    });
    if(control==="iptal")
{
  this.resetState();
}
  }

  resetState =async() =>{
   await this.setState({ 
    error:"",
    modalId:-1,
    modalStartDate:"",
    modalEndDate:"",
    modalSelectedStartHour:-1,
    modalSelectedStartMinute:0,
    modalSelectedEndHour:-1,
    modalSelectedEndMinute:0,
    title:"",
    description:""
    });

  }

  addMyEvent()
  {///////AYI GÖNDERİRKEN 1 FAZLA GÖNDER ÇEKERKEN 1 EKSİLT DİZİSİ 0 OLARAK BAŞLIYOR
    if(this.state.modalSelectedStartHour!==-1&& this.state.modalSelectedEndHour!==-1)
    {
    
      if(this.state.modalId===-1)
      {
        var year=new Date(cellSelector).getFullYear(); 
        var month=new Date(cellSelector).getMonth();
        var day=new Date(cellSelector).getDate();
        try{
          console.log("ADD",this.state.myUid)
          firebase.firestore().
          collection('Users').
          doc(this.state.myUid).
          collection("Jobs")
          .add({
            title:this.state.title,
            description:this.state.description,
            startDate: firebase.firestore.Timestamp.fromDate(new Date(year,month, day, this.state.modalSelectedStartHour, this.state.modalSelectedStartMinute)),
            endDate:  firebase.firestore.Timestamp.fromDate(new Date(year,month, day, this.state.modalSelectedEndHour, this.state.modalSelectedEndMinute))
          })
          .then(querySnapshot => {
            this.resetState();
            this.componentDidMount();
            });
        }catch(error){
          console.log("addFirebaseERROR",error);
    
        }
      }

    else{
      var year=new Date(cellSelector.start).getFullYear(); 
      var month=new Date(cellSelector.start).getMonth();
      var day=new Date(cellSelector.start).getDate();
      try{
        firebase.firestore().
        collection('Users').
        doc(this.state.myUid).
        collection("Jobs").doc(this.state.modalId)
        .set({
          title:this.state.title,
          description:this.state.description,
          startDate: firebase.firestore.Timestamp.fromDate(new Date(year,month, day, this.state.modalSelectedStartHour, this.state.modalSelectedStartMinute)),
          endDate:  firebase.firestore.Timestamp.fromDate(new Date(year,month, day, this.state.modalSelectedEndHour, this.state.modalSelectedEndMinute))
        })
        .then(querySnapshot => {
          this.resetState();
          this.componentDidMount();
          });
      }catch(error){
        console.log("addFirebaseERROR",error);
  
      }

    }



     this.setModalVisible();
      this.setState({
        modalSelectedStartHour:-1,
        modalSelectedStartMinute:0,
        modalSelectedEndHour:-1,
        modalSelectedEndMinute:0,
        error:""
       })
    }
    else
    {
      this.setState({error:"Saat Seçimi Hatalı"})
    }

  }


  endItemCreater()
  {
    endItems=[];
   // this.state.modalSelectedEndHour
    for (let index = 0; index < 24 ; index++) {
      endItems.push( {label: index.toString(), value: index})
      
    }
  }
  
    render()
    {
      const { modalVisible } = this.state;

              return(

                <SafeAreaView style={styles.safeArea} >

            <View style={styles.container}>
      <StatusBar barStyle="light-content" />
    
                <MenuButton navigation={this.props.navigation}/>

                <Calendar

        style={styles.calendar}
        height={Dimensions.get('window').height - 150}
        events={this.state.events}
          onPressCell={
           
            (e) =>  this.cellClick(e)
          
          }
          onPressEvent={(e) => this.eventClick(e)}
        mode="3days"
        scrollOffsetMinutes={480}
        weekStartsOn={1}
        locale="tr"
/>

<View style={styles.containerModal}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        > 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

          <View style={styles.centeredView}>
         
            <View style={styles.modalView}>
            <View style={styles.modalStartDateTopRowContainer}>

              <View style={styles.modalStartDate1Container} >
<Text style={styles.modalText}>Başlangıç: {"\n"}{this.state.modalStartDate}</Text>
<View style={styles.modalStartDateRowContainer} >

<DropDownPicker
        placeholder={"Saat"}
style={styles.modalDropTop}
items={endItems}
containerStyle={{height: "100%",width:"100%"}}
itemStyle={{
justifyContent: 'flex-start'
}}

dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
  modalSelectedStartHour: item.value
})}
/>
<DropDownPicker
style={styles.modalDrop}
items={[
{label: '00', value: 0},
{label: '30', value: 30},
]}
defaultValue={this.state.modalSelectedStartMinute}
containerStyle={{height: "100%",width:"100%"}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
modalSelectedStartMinute: item.value
})}
/>
</View>
              </View>
              <View style={styles.modalStartDateContainer} >

        <Text style={styles.modalText}>Bitiş: {"\n"}{this.state.modalEndDate}</Text>
        <View style={styles.modalStartDateRowContainer} >

        <DropDownPicker
        placeholder={"Saat"}
style={styles.modalDrop2}
items={endItems}
containerStyle={{height: "100%",width:"100%"}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
  modalSelectedEndHour: item.value
})}
/>

<DropDownPicker
style={styles.modalDrop2}
items={[
{label: '00', value: 0},
{label: '30', value: 30},
]}
defaultValue={this.state.modalSelectedEndMinute}
containerStyle={{height: "100%",width:"100%"}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
  modalSelectedEndMinute: item.value
})}
/>
            </View>  
            </View>
            </View>
            <View style={styles.modalInputGroup}>
  
            <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Başlık..." 
            placeholderTextColor="#003f5c"
            value={this.state.title}
            onChangeText={text => this.setState({title:text})}/>
        </View>
            <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Açıklama..." 
            placeholderTextColor="#003f5c"
            value={this.state.description}
            onChangeText={text => this.setState({description:text})}/>
        </View>
        </View>
  <View style={styles.modalButtonGroup}>
   <Text> {this.state.error}</Text> 
  <TouchableHighlight  onPress={() => {this.setModalVisible("iptal")}}
                style ={styles.modalButton}>
   {/* <Button title="İptal Et" onPress={this.setModalVisible.bind()} /> */}
   <Text style ={styles.textStyle}>İptal Et</Text>

          </TouchableHighlight > 

          <TouchableHighlight   onPress={() => {this.addMyEvent()}}
                style ={styles.modalButton}>
                  <Text style ={styles.textStyle}>Kaydet</Text>
          </TouchableHighlight > 

  </View>
            

            </View>
          </View> 
          </TouchableWithoutFeedback>

        </Modal>

        </View>

            </View>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
  inputText:{

    color:"#616161",
    fontWeight:"bold",

  },
  inputView:{
    zIndex:-1,
    width:"100%",
    height:"50%",

    backgroundColor:"#f5f5f5",
    borderRadius:25,
    marginBottom:"2%",
    justifyContent:"center",
    padding:5
  },
  containerModal:
  {
  },
  container: {
    backgroundColor: '#f8f8f8',
    height: '100%',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FF5236'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    width:WIDTH*0.85,
    height:HEIGHT*0.5,
    flexDirection: 'column', 

    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  
  modalText: {
    fontSize:0.04*WIDTH,
    marginBottom: 15,
    textAlign: "center"
  },
  modalStartDateTopRowContainer:{

    flexDirection: 'row', 
    marginBottom:HEIGHT*0.05

  },

  modalStartDateRowContainer:{
    width:"50%",
    height:"50%",
    flexDirection: 'row', 
  },
  modalStartDate1Container:{
    width:WIDTH*0.4,
    height:HEIGHT*0.1,
    flexDirection: 'column', 
  },
  modalStartDateContainer:{
    width:WIDTH*0.4,
    height:HEIGHT*0.1,
    flexDirection: 'column', 
  },
  modalDropTop:{
    zIndex:100,
    backgroundColor: '#fafafa',

  },
  modalDrop:{
    backgroundColor: '#fafafa',
  },
  modalDrop2:{
    backgroundColor: '#fafafa',
  },
  modalInputGroup:{
    zIndex:-1,
    flexDirection: 'column', 
    width:"100%",
    height:"33%",
    marginBottom:HEIGHT*0.05
    },

  modalButtonGroup:{
    zIndex:-1,
    padding:0,
    flexDirection: 'row', 
    width:"100%",
    height:"35%",
    marginTop:"15%"
  },
  modalButton:{
    borderWidth:3,
    borderColor:"gray",
    backgroundColor:"white",
    borderRadius:25,
    height:"40%",
    width:"50%",
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
    marginBottom:10
  },
  textStyle: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center"
  },

});
