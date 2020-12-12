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
var finishItems=[];
export default class HomeScreen extends React.Component {
  state={
    modalVisible: false,
    modalStartDate:"",
    modalFinishDate:"",
    modalSelectedStartMinute:0,
    modalSelectedFinishHour:12,
    modalSelectedFinishMinute:0,
    job:"",
    events:[]
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
      modalStartDate:day+"/"+month+"/"+year+" "+hour+":",
      modalFinishDate:day+"/"+month+"/"+year,
      modalSelectedFinishHour:hour
    })
this.finishItemCreater();
    this.setModalVisible();
  }

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  addMyEvent(e)
  {///////AYI GÖNDERİRKEN 1 FAZLA GÖNDER ÇEKERKEN 1 EKSİLT DİZİSİ 0 OLARAK BAŞLIYOR
    var a=[]
    var year=new Date(cellSelector).getFullYear(); 
    var month=new Date(cellSelector).getMonth();
    var day=new Date(cellSelector).getDate();
    var hour=new Date(cellSelector).getHours(); 
    var minute=new Date(cellSelector).getMinutes(); 
    console.log(year+","+month+","+day+","+hour+","+minute);
   a.push
  (  {
   title: this.state.job,
    start: new Date(year,month, day, hour, this.state.modalSelectedStartMinute).toLocaleString("tr"),
    end: new Date(year, month, day, this.state.modalSelectedFinishHour, this.state.modalSelectedFinishMinute).toLocaleString("tr"),
    }
  )
   this.setModalVisible();
    this.setState({events:a })
    console.log("ADMMY",a)
  }

  finishItemCreater()
  {
    finishItems=[];
    console.log("GELEENENNN",this.state.modalSelectedFinishHour)
    for (let index = this.state.modalSelectedFinishHour; index < 24 ; index++) {
      finishItems.push( {label: index.toString(), value: index})
      
    }
    console.log("ITEMSFİNİSHH",finishItems);
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
          onPressEvent={(e) => alert(e.title)}
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

        <Text style={styles.modalText}>Bitiş: {this.state.modalFinishDate}</Text>
        <DropDownPicker
        placeholder={"Saat"}
style={styles.modalDrop}
items={finishItems}
containerStyle={{height: 30}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
  modalSelectedFinishHour: item.value
})}
/>

<DropDownPicker
style={styles.modalDrop}
items={[
{label: '00', value: 0},
{label: '30', value: 30},
]}
defaultValue={this.state.modalSelectedFinishMinute}
containerStyle={{height: 30}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={item => this.setState({
  modalSelectedFinishMinute: item.value
})}
/>
              
            </View>
            <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="İşi Giriniz..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({job:text})}/>
        </View>

  <View style={styles.modalButtonGroup}>
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
  inputView:{
    width:"80%",
    backgroundColor:"#FFFFFF",
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
