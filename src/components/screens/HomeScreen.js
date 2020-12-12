import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';

import MenuButton from '../MenuButton'
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs';

const WIDTH= Dimensions.get('window').width;

const events = [
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
    start: dayjs().add(2, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(2, 'day').set('hour', 13).set('minute', 30).toDate(),
  },
  {
    title: 'Repair my car2',
    start: dayjs().add(1,'day').set(13,'date').set(12,'month').set('hour', 7).set('minute', 45).toDate(),
    end:   dayjs().add(1,'day').set(13,'date').set(12,'month').set('hour', 13).set('minute', 30).toDate(),
  },
];


export default class HomeScreen extends React.Component {
  

  
  componentDidMount(){
    console.log("EVENTS",events)

  }
  addMyEvent(e)
  {
    console.log("console",e)
  }
  
    render()
    {
      
              return(
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation}/>
                <Calendar
        style={styles.calendar}
        height={Dimensions.get('window').height - 50}
          events={events}
          //onChangeDate={this.addMyEvent.bind()}
          onPressCell={this.addMyEvent.bind()}
          onPressEvent={(e) => alert(e.title)}
        mode="3days"
        scrollOffsetMinutes={20}
      />
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
});
