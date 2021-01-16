import React from 'react';
import {
  StyleSheet, Text, View, Dimensions, SafeAreaView, StatusBar, Modal,
  Button, Picker, TouchableHighlight, TextInput, Vibration, TouchableWithoutFeedback, TouchableOpacity
  , Keyboard
} from 'react-native';

import MenuButton from '../MenuButton'
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs';
import 'dayjs/locale/tr'
import tr from 'dayjs/locale/tr';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from '../../../Firebase'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SimpleLineIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var cellSelector;

export default class HomeScreen extends React.Component {
  state = {
    error: "",
    modalVisible: false,
    modalId: -1,
    modalStartDate: "",
    modalEndDate: "",
    title: "",
    description: "",
    events: [],
    myUid: "",
    dateTimePickerStartDateChange: null,
    openStartDatePicker: false,
    openStartTimePicker: false,
    dateTimePickerEndDateChange: null,
    openEndDatePicker: false,
    openEndTimePicker: false
  }



  async componentDidMount() {

    await this.setState({
      myUid: firebase.auth().currentUser.uid
    })
    var a = [];
    try {
      firebase.firestore()
        .collection('Users').doc(this.state.myUid)
        .collection("Jobs")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc && doc.exists) {
              a.push
                ({
                  id: doc.id,
                  title: doc.data().title,
                  description: doc.data().description,
                  start: doc.data().startDate.toDate(),
                  end: doc.data().endDate.toDate(),
                }
                )
            }
          });
          this.setState({ events: a })
        });

    } catch (error) {
    }



  }


  cellClick = async (e) => {
    Vibration.vibrate(10)
    cellSelector = e;

    var year = new Date(e).getFullYear();
    var month = new Date(e).getMonth();
    var day = new Date(e).getDate();
    var hour = new Date(e).getHours();
    var minute = new Date(e).getMinutes();
    await this.setState({
      modalStartDate: day + "/" + month + "/" + year + " " + hour + ":" + minute,
      modalEndDate: day + "/" + month + "/" + year + " " + hour + ":" + minute,
      dateTimePickerStartDateChange: new Date(cellSelector),
      dateTimePickerEndDateChange: new Date(cellSelector)

    })
    // this.endItemCreater();
    this.setModalVisible();
  }

  eventClick = async (e) => {
    Vibration.vibrate(10)

    cellSelector = e;

    var title = e.title;
    var description = e.description;

    var startyear = new Date(e.start).getFullYear();
    var startmonth = new Date(e.start).getMonth();
    var startday = new Date(e.start).getDate();
    var starthour = new Date(e.start).getHours();
    var startminute = new Date(e.start).getMinutes();
    var newStartDate = new Date(startyear, startmonth, startday, starthour, startminute)

    var endyear = new Date(e.end).getFullYear();
    var endmonth = new Date(e.end).getMonth();
    var endday = new Date(e.end).getDate();
    var endhour = new Date(e.end).getHours();
    var endminute = new Date(e.end).getMinutes();
    var newEndDate = new Date(endyear, endmonth, endday, endhour, endminute)

    await this.setState({
      modalId: e.id,
      modalStartDate: startday + "/" + startmonth + "/" + startyear + " " + starthour + ":" + startminute,
      dateTimePickerStartDateChange: newStartDate,


      modalEndDate: endday + "/" + endmonth + "/" + endyear + " " + endhour + ":" + endminute,
      dateTimePickerEndDateChange: newEndDate,


      title: title,
      description: description
    })
    // this.endItemCreater();
    this.setModalVisible();

  }

  setModalVisible = (control) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      error: ""
    });
    if (control === "iptal") {
      this.resetState();
    }
  }

  resetState = async () => {
    await this.setState({
      error: "",
      modalId: -1,
      modalStartDate: "",
      modalEndDate: "",
      title: "",
      description: "",
      dateTimePickerStartDateChange: null,
      openStartDatePicker: false,
      openStartTimePicker: false,
      dateTimePickerEndDateChange: null,
      openEndDatePicker: false,
      openEndTimePicker: false
    });

  }

  addMyEvent() {///////AYI GÖNDERİRKEN 1 FAZLA GÖNDER ÇEKERKEN 1 EKSİLT DİZİSİ 0 OLARAK BAŞLIYOR
    if (this.state.dateTimePickerStartDateChange !== null) {

      if (this.state.modalId === -1) {
        try {
          firebase.firestore().
            collection('Users').
            doc(this.state.myUid).
            collection("Jobs")
            .add({
              title: this.state.title,
              description: this.state.description,
              startDate: firebase.firestore.Timestamp.fromDate(new Date(this.state.dateTimePickerStartDateChange)),
              endDate: firebase.firestore.Timestamp.fromDate(new Date(this.state.dateTimePickerEndDateChange))
            })
            .then(querySnapshot => {
              this.resetState();
              this.componentDidMount();
            });
        } catch (error) {

        }
      }

      else {
        try {
          firebase.firestore().
            collection('Users').
            doc(this.state.myUid).
            collection("Jobs").doc(this.state.modalId)
            .set({
              title: this.state.title,
              description: this.state.description,
              startDate: firebase.firestore.Timestamp.fromDate(new Date(this.state.dateTimePickerStartDateChange)),
              endDate: firebase.firestore.Timestamp.fromDate(new Date(this.state.dateTimePickerEndDateChange))
            })
            .then(querySnapshot => {
              this.resetState();
              this.componentDidMount();
            });
        } catch (error) {

        }

      }



      this.setModalVisible();
      this.setState({
        error: ""
      })
    }
    else {
      this.setState({ error: "Saat Seçimi Hatalı" })
    }

  }

  dateTimePickerStartDateChange = async (date) => {

    var year = new Date(date.nativeEvent.timestamp).getFullYear();
    var month = new Date(date.nativeEvent.timestamp).getMonth();
    var day = new Date(date.nativeEvent.timestamp).getDate();
    var hour;
    var minute;
    if (cellSelector.start) {
      hour = new Date(cellSelector.start).getHours();
      minute = new Date(cellSelector.start).getMinutes();
    }
    else {
      hour = new Date(cellSelector).getHours();
      minute = new Date(cellSelector).getMinutes();
    }

    var newDate = new Date(year, month, day, hour, minute)
    console.log("cellSelector", cellSelector)
    if (date.type === "set") {
      await this.setState(
        {
          openStartDatePicker: false,
          openStartTimePicker: true,
          dateTimePickerStartDateChange: newDate
        }
      )

    }
    else {
      await this.setState(
        {
          openStartDatePicker: false

        }
      )
    }
  }

  dateTimePickerStartTimeChange = async (time) => {
    var year = new Date(this.state.dateTimePickerStartDateChange).getFullYear();
    var month = new Date(this.state.dateTimePickerStartDateChange).getMonth();
    var day = new Date(this.state.dateTimePickerStartDateChange).getDate();
    var hour = new Date(time.nativeEvent.timestamp).getHours();
    var minute = new Date(time.nativeEvent.timestamp).getMinutes();

    var newDate = new Date(year, month, day, hour, minute)

    if (time.type === "set") {
      await this.setState(
        {
          openStartTimePicker: false,
          dateTimePickerStartDateChange: newDate,
          modalStartDate: day + "/" + month + "/" + year + " " + hour + ":" + minute
        }
      )

    }
    else {
      await this.setState(
        {
          openStartTimePicker: false

        }
      )
    }
  }


  dateTimePickerEndDateChange = async (date) => {

    var year = new Date(date.nativeEvent.timestamp).getFullYear();
    var month = new Date(date.nativeEvent.timestamp).getMonth();
    var day = new Date(date.nativeEvent.timestamp).getDate();

    var hour;
    var minute;
    if (cellSelector.start) {
      hour = new Date(cellSelector.end).getHours();
      minute = new Date(cellSelector.end).getMinutes();
    }
    else {
      hour = new Date(cellSelector).getHours();
      minute = new Date(cellSelector).getMinutes();
    }

    var newDate = new Date(year, month, day, hour, minute)



    if (date.type === "set") {
      await this.setState(
        {
          openEndDatePicker: false,
          openEndTimePicker: true,
          dateTimePickerEndDateChange: newDate
        }
      )

    }
    else {
      await this.setState(
        {
          openEndDatePicker: false,

        }
      )
    }
  }

  dateTimePickerEndTimeChange = async (time) => {
    var year = new Date(this.state.dateTimePickerEndDateChange).getFullYear();
    var month = new Date(this.state.dateTimePickerEndDateChange).getMonth();
    var day = new Date(this.state.dateTimePickerEndDateChange).getDate();
    var hour = new Date(time.nativeEvent.timestamp).getHours();
    var minute = new Date(time.nativeEvent.timestamp).getMinutes();

    var newDate = new Date(year, month, day, hour, minute)

    if (time.type === "set") {
      await this.setState(
        {
          openEndTimePicker: false,
          dateTimePickerEndDateChange: newDate,
          modalEndDate: day + "/" + month + "/" + year + " " + hour + ":" + minute
        }
      )

    }
    else {
      await this.setState(
        {
          openEndTimePicker: false,

        }
      )
    }
  }


  render() {
    const { modalVisible } = this.state;

    return (

      <SafeAreaView style={styles.safeArea} >

        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          <MenuButton navigation={this.props.navigation} />

          <Calendar

            style={styles.calendar}
            height={Dimensions.get('window').height - 150}
            events={this.state.events}
            onPressCell={

              (e) => this.cellClick(e)

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

                        <TouchableOpacity onPress={() => { this.setState({ openStartDatePicker: true }) }}>
                          <Text style={styles.modalText}>Başlangıç:</Text>
                          <View style={styles.calendarMain}>
                            <View style={styles.calendarInside}>
                              <SimpleLineIcons name="calendar" size={24} color="black" />
                              <Text style={styles.modalText}>{this.state.modalStartDate}</Text>
                            </View>
                          </View>
                        </TouchableOpacity >

                        {this.state.openStartDatePicker ? (
                          <DateTimePicker
                            style={{ width: 20 }}

                            value={new Date(this.state.dateTimePickerStartDateChange)
                            }
                            mode="date"
                            display="spinner"
                            onChange={(date) => {
                              this.dateTimePickerStartDateChange(date);

                            }}
                          />


                        ) : (null)}

                        {this.state.openStartTimePicker ? (
                          <DateTimePicker
                            style={{ width: 20 }}

                            value={new Date(this.state.dateTimePickerStartDateChange)
                            }
                            is24Hour={true}
                            minuteInterval={30}
                            mode="time"
                            display="spinner"
                            onChange={(time) => {
                              this.dateTimePickerStartTimeChange(time);

                            }}
                          />


                        ) : (null)}

                      </View>
                      <View style={styles.modalStartDateContainer} >



                        <TouchableOpacity onPress={() => { this.setState({ openEndDatePicker: true }) }}>
                          <Text style={styles.modalText}>Bitiş:</Text>
                          <View style={styles.calendarMain}>
                            <View style={styles.calendarInside}>
                              <SimpleLineIcons name="calendar" size={24} color="black" />
                              <Text style={styles.modalText}>{this.state.modalEndDate}</Text>
                            </View>
                          </View>
                        </TouchableOpacity >










                        {this.state.openEndDatePicker ? (
                          <DateTimePicker
                            style={{ width: 20 }}

                            value={new Date(this.state.dateTimePickerEndDateChange)
                            }
                            mode="date"
                            display="spinner"
                            onChange={(date) => {
                              this.dateTimePickerEndDateChange(date);

                            }}
                          />


                        ) : (null)}

                        {this.state.openEndTimePicker ? (
                          <DateTimePicker
                            style={{ width: 20 }}

                            value={new Date(this.state.dateTimePickerEndDateChange)
                            }
                            is24Hour={true}
                            minuteInterval={30}
                            mode="time"
                            display="spinner"
                            onChange={(time) => {
                              this.dateTimePickerEndTimeChange(time);

                            }}
                          />


                        ) : (null)}

                      </View>
                    </View>
                    <View style={styles.modalInputGroup}>

                      <View style={styles.inputView} >
                        <TextInput
                          style={styles.inputText}
                          placeholder="Başlık..."
                          placeholderTextColor="#003f5c"
                          value={this.state.title}
                          onChangeText={text => this.setState({ title: text })} />
                      </View>
                      <View style={styles.inputView} >
                        <TextInput
                          style={styles.inputText}
                          placeholder="Açıklama..."
                          placeholderTextColor="#003f5c"
                          value={this.state.description}
                          onChangeText={text => this.setState({ description: text })} />
                      </View>
                    </View>
                    <View style={styles.modalButtonGroup}>
                      <Text> {this.state.error}</Text>
                      <TouchableHighlight onPress={() => { this.setModalVisible("iptal") }}
                        style={styles.modalButton}>
                        {/* <Button title="İptal Et" onPress={this.setModalVisible.bind()} /> */}
                        <Text style={styles.textStyle}>İptal Et</Text>

                      </TouchableHighlight >

                      <TouchableHighlight onPress={() => { this.addMyEvent() }}
                        style={styles.modalButton}>
                        <Text style={styles.textStyle}>Kaydet</Text>
                      </TouchableHighlight >

                    </View>


                  </View>
                </View>
              </TouchableWithoutFeedback>

            </Modal>

          </View>

        </View>

      </SafeAreaView >

    )
  }
}

const styles = StyleSheet.create({
  inputText: {

    color: "#616161",
    fontWeight: "bold",

  },
  inputView: {
    zIndex: -1,
    width: "100%",
    height: "50%",

    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    marginBottom: "2%",
    justifyContent: "center",
    padding: 5
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
    width: WIDTH * 0.85,
    height: HEIGHT * 0.5,
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
    fontSize: 0.04 * WIDTH,
    marginBottom: 15,
    textAlign: "center"
  },
  modalStartDateTopRowContainer: {

    flexDirection: 'row',
    marginBottom: HEIGHT * 0.05
  },

  modalStartDateRowContainer: {
    width: "50%",
    height: "50%",
    flexDirection: 'row',
  },
  modalStartDate1Container: {
    width: WIDTH * 0.4,
    height: HEIGHT * 0.1,
    flexDirection: 'column',
  },
  modalStartDateContainer: {
    width: WIDTH * 0.4,
    height: HEIGHT * 0.1,
    flexDirection: 'column',
    marginLeft: WIDTH * 0.02
  },
  modalDropTop: {
    zIndex: 100,
    backgroundColor: '#fafafa',

  },
  modalDrop: {
    backgroundColor: '#fafafa',
  },
  modalDrop2: {
    backgroundColor: '#fafafa',
  },
  modalInputGroup: {
    zIndex: -1,
    flexDirection: 'column',
    width: "100%",
    height: "33%",
    marginBottom: HEIGHT * 0.05
  },

  modalButtonGroup: {
    zIndex: -1,
    padding: 0,
    flexDirection: 'row',
    width: "100%",
    height: "35%",
    marginTop: "15%"
  },
  modalButton: {
    borderWidth: 3,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 25,
    height: "40%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 10
  },
  textStyle: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center"
  },
  calendarMain:
  {
    borderWidth: 2,
    borderRadius: 10
  },
  calendarInside: {
    justifyContent: "center",
    alignItems: "center", flexDirection: "row", padding: 5
  }
});
