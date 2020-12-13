import React from 'react';
import { StyleSheet, Text, View,Dimensions, SafeAreaView, StatusBar,Modal, Button,Picker,TouchableHighlight,TextInput } from 'react-native';

import MenuButton from '../MenuButton'
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs';
import 'dayjs/locale/tr'
import tr from 'dayjs/locale/tr';
import DropDownPicker from 'react-native-dropdown-picker';

const WIDTH= Dimensions.get('window').width;

var cellSelector;
var endItems=[];
export default class HomeScreen extends React.Component {
  state={
    error:"",
    modalVisible: false,
    modalStartDate:"",
    modalEndDate:"",
    modalSelectedStartHour:-1,
    modalSelectedStartMinute:0,
    modalSelectedEndHour:-1,
    modalSelectedEndMinute:0,
    title:"",
    events:[{
      title: 'Coffee break',
      start: dayjs().set('hour', 14).set('minute', 30).toDate(),
      end: dayjs().set('hour', 15).set('minute', 30).toDate(),
    }]
  }

  
  componentDidMount(){
  
  }


  cellClick = async(e) => {
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

    console.log("EVENVT E FİNİSH",e)
    var title=e.title
    var year=new Date(e.start).getFullYear(); 
    var month=new Date(e.start).getMonth();
    var day=new Date(e.start).getDate();

    var startHour=new Date(e.start).getHours(); 
    var startMinute=new Date(e.start).getMinutes(); 
    var endHour=new Date(e.end).getHours(); 
    var endMinute=new Date(e.end).getMinutes(); 
console.log("EVENCTCLİK",year,month,day,startHour,startMinute,endHour,endMinute)
  await  this.setState({
      modalStartDate:day+"/"+month+"/"+year,
      modalSelectedStartHour:startHour,
      modalSelectedStartMinute:startMinute,
      
      modalEndDate:day+"/"+month+"/"+year,
      modalSelectedEndHour:endHour,
      modalSelectedEndMinute:endMinute,
      title:title
    })
    this.endItemCreater();
    this.setModalVisible();

  }

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible,
    error:""
    });
  }

  addMyEvent(e)
  {///////AYI GÖNDERİRKEN 1 FAZLA GÖNDER ÇEKERKEN 1 EKSİLT DİZİSİ 0 OLARAK BAŞLIYOR
    if(this.state.modalSelectedStartHour!==-1&& this.state.modalSelectedEndHour!==-1)
    {
      var a=[]
      var year=new Date(cellSelector).getFullYear(); 
      var month=new Date(cellSelector).getMonth();
      var day=new Date(cellSelector).getDate();
      var hour=new Date(cellSelector).getHours(); 
      var minute=new Date(cellSelector).getMinutes(); 
      console.log(year+","+month+","+day+","+hour+","+minute);
     a.push
    (  {
     title: this.state.title,
      start: new Date(year,month, day, this.state.modalSelectedStartHour, this.state.modalSelectedStartMinute).toLocaleString("tr"),
      end: new Date(year, month, day, this.state.modalSelectedEndHour, this.state.modalSelectedEndMinute).toLocaleString("tr"),
      }
    )
     this.setModalVisible();
      this.setState({events:a,
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
    for (let index = this.state.modalSelectedEndHour; index < 24 ; index++) {
      endItems.push( {label: index.toString(), value: index})
      
    }
  }
  
    render()
    {
      const { modalVisible } = this.state;

              return(
                
            <View style={styles.container}>
      <StatusBar barStyle="light-content" />
    
                <MenuButton navigation={this.props.navigation}/>
                <SafeAreaView style={styles.safeArea} >
                <Calendar

        style={styles.calendar}
        height={Dimensions.get('window').height - 150}
        events={this.state.events}
          //onChangeDate={this.addMyEvent.bind()}
          onPressCell={
            //this.addMyEvent.bind(this)
           
            this.cellClick.bind(this)
          
          }
          onPressEvent={(e) => this.eventClick(e)}
        mode="3days"
        scrollOffsetMinutes={480}
        weekStartsOn={1}
        locale="tr"
/>

        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        > 
          <View style={styles.centeredView}>
         
            <View style={styles.modalView}>
              <View style={styles.modalStartDateContainer} >
<Text style={styles.modalText}>Başlangıç: {this.state.modalStartDate}</Text>
<DropDownPicker
        placeholder={"Saat"}
style={styles.modalDrop}
items={endItems}
containerStyle={{height: 30}}
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
containerStyle={{height: 30}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
modalSelectedStartMinute: item.value
})}
/>
              </View>
              <View style={styles.modalStartDateContainer} >

        <Text style={styles.modalText}>Bitiş: {this.state.modalEndDate}</Text>
        <DropDownPicker
        placeholder={"Saat"}
style={styles.modalDrop}
items={endItems}
containerStyle={{height: 30}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
  modalSelectedEndHour: item.value
})}
/>

<DropDownPicker
style={styles.modalDrop}
items={[
{label: '00', value: 0},
{label: '30', value: 30},
]}
defaultValue={this.state.modalSelectedEndMinute}
containerStyle={{height: 30}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
  modalSelectedEndMinute: item.value
})}
/>
              
            </View>
            <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="İşi Giriniz..." 
            placeholderTextColor="#003f5c"
            value={this.state.title}
            onChangeText={text => this.setState({title:text})}/>
        </View>

  <View style={styles.modalButtonGroup}>
   <Text> {this.state.error}</Text> 
  <TouchableHighlight  onPress={() => {this.setModalVisible()}}
                style ={styles.modalButton}>
   {/* <Button title="İptal Et" onPress={this.setModalVisible.bind()} /> */}
   <Text style ={styles.textStyle}>İptal Et</Text>

          </TouchableHighlight > 

          <TouchableHighlight   onPress={() => {this.addMyEvent()}}
                style ={styles.modalButton}>
                  <Text style ={styles.textStyle}>Kaydet</Text>
          </TouchableHighlight > 
          {/* <Button title="Kaydet" onPress={this.addMyEvent.bind()} />    */}

  </View>
            

            </View>
          </View> 
        </Modal>
</SafeAreaView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
  inputText:{
    height:50,
    color:"#fb5b5a",
    fontWeight:"bold",

  },
  inputView:{
    width:"80%",
    backgroundColor:"lightgray",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
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
    marginTop: 22
  },
  modalView: {
    width:350,
    height:350,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:22,
    marginBottom: 15,
    textAlign: "center"
  },
  modalStartDateContainer:{
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  modalDrop:{
    backgroundColor: '#fafafa',
    width:70
  },
  modalButtonGroup:{
    
    padding:20,
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  modalButton:{
    zIndex:3,
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    width:120,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginRight:10,
    marginBottom:10
  }

});
