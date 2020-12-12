import React from 'react';
import { StyleSheet, Text, View,Dimensions, SafeAreaView, StatusBar,Modal, Button } from 'react-native';

import MenuButton from '../MenuButton'
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs';
import 'dayjs/locale/tr'
import tr from 'dayjs/locale/tr';
import { TouchableHighlight } from 'react-native-gesture-handler';

const WIDTH= Dimensions.get('window').width;



export default class HomeScreen extends React.Component {
  state={
    modalVisible: false,
    events:[
      {
        title: 'Meeting',
        start: dayjs().set('hour', 10).set('minute', 0).toDate(),
        end: dayjs().set('hour', 10).set('minute', 30).toDate(),
      },
      {
        title: 'Coffee break',
        start: dayjs().set('hour', 14).set('minute', 30).toDate(),
        end: dayjs().set('hour', 15).set('minute', 30).toDate(),
      },
      {
        title: 'Repair my car',
        start: dayjs().add(2, 'day').set('hour', 8).set('minute', 0).toDate(),
        end: dayjs().add(2, 'day').set('hour', 13).set('minute', 30).toDate(),
      },
      {
        title: 'Repair my car2',
        start: dayjs().add(1,'day').set(13,'date').set(12,'month').set('hour', 8).set('minute', 0).toDate(),
        end:   dayjs().add(1,'day').set(13,'date').set(12,'month').set('hour', 13).set('minute', 30).toDate(),
      },
    ]
  }

  
  componentDidMount(){
    
    console.log("EVENTS",this.state.events)

  }
  setModalVisible = () => {
    console.log("GİRDİİİ",this.state.modalVisible)
    this.setState({ modalVisible: !this.state.modalVisible });
    
  }

  addMyEvent(e)
  {///////AYI GÖNDERİRKEN 1 FAZLA GÖNDER ÇEKERKEN 1 EKSİLT DİZİSİ 0 OLARAK BAŞLIYOR
    console.log("ADDDATE",e)
    console.log("ADDDATEPARSE", new Date(e).getDate()    )
    console.log("ADDDATEPARSE", new Date(e).toJSON()    )
    var year=new Date(e).getFullYear(); 
    var month=new Date(e).getMonth();
    var day=new Date(e).getDate();
    var hour=new Date(e).getHours(); 
    var minute=new Date(e).getMinutes(); 
    console.log(year+","+month+","+day+","+hour+","+minute);
  var a=[
    {
      // title: 'deneme',
      // start: dayjs().add(2020,'year').set(13,'date').set(12,'month').set('hour', 8).set('minute', 0).toDate(),
      // end:   dayjs().add(2020,'year').set(13,'date').set(12,'month').set('hour', 13).set('minute', 30).toDate(),
   title: 'Tanışma',
    start: new Date(year,month, day, hour, minute).toLocaleString("tr"),
    end: new Date(2020, 11, 12, 10, 30).toLocaleString("tr"),
  
    }
  ]
   
    this.setState({events:a })
    console.log("ADMMY",a)
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
           // this.addMyEvent.bind(this)
           
           () => {
            this.setModalVisible();
          }
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
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        > 
          <View style={styles.centeredView}>
         
            <View style={styles.modalView}>
        <Text style={styles.modalText}>Modal:{modalVisible}</Text>

              <Text style={styles.modalText}>Hello World!</Text>

            <Button title="Hide modal" onPress={this.setModalVisible.bind()} />

           

            </View>
          </View> 
        </Modal>
</SafeAreaView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    flex:1,
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
    marginBottom: 15,
    textAlign: "center"
  }
});
