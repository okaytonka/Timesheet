import React from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, Text, View } from 'react-native';
import MenuButton from '../MenuButton';
import Timeline from 'react-native-timeline-flatlist'
import firebase from '../../../Firebase'
import dayjs from 'dayjs';
import 'dayjs/locale/tr'
import tr from 'dayjs/locale/tr';
let icons=[
  require("../../images/icons/alien.png"),
  require("../../images/icons/astronaut.png"),
  require("../../images/icons/darth.png"),
  require("../../images/icons/earth.png"),
  require("../../images/icons/moon.png"),
  require("../../images/icons/saturn.png"),
  require("../../images/icons/ship.png"),
  require("../../images/icons/shuttle.png")
]
export default class TodayScreen extends React.Component {

  constructor(){
    super()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  } 


state={
  myUid:"",
  data:[],
  isRefreshing: false,      
      waiting: false,
}


  async componentDidMount (){
    console.log("RASTELE İCO",)
    await this.setState({
      myUid:firebase.auth().currentUser.uid
    })
  var a=[];
  try {
    firebase.firestore()
    .collection('Users').doc(this.state.myUid)
    .collection("Jobs").orderBy('startDate','asc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc && doc.exists) {
          console.log("GELEN ", new Date(doc.data().startDate.toDate()).toDateString())
          console.log("BUGÜN ", new Date().toDateString())

          if(new Date(doc.data().startDate.toDate()).toDateString() === new Date().toDateString())
         {
          console.log("GELEN saat", new Date(doc.data().startDate.toDate()).toLocaleTimeString())
          a.push
          (  {
            time:new Date(doc.data().startDate.toDate()).toLocaleTimeString(),
           title: doc.data().title,
           description: doc.data().description,
           icon:icons[Math.floor(Math.random() * 8)]

          }
          )

          console.log("GELEN a", a)


         }
      
        }
      });
  this.setState({data:a})
    });
  
  } catch (error) {
    console.log("ERROR",error)
  }



  }



  onRefresh(){
    this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      var data = this.state.data.concat(
        [
          {time: '00:00', title: 'Liste Güncelleniyor', description: 'Liste Güncelleniyor'},
          {time: '00:00', title: 'Liste Güncelleniyor', description: 'Liste Güncelleniyor'},
          {time: '00:00', title: 'Liste Güncelleniyor', description: 'Liste Güncelleniyor'},

        ]
        )
      //this.componentDidMount();
      this.setState({
        isRefreshing: false,
        data: data,

      });
    }, 500);  }
   
  onEndReached() {
    if (!this.state.waiting) {
      this.setState({waiting: true});

      //fetch and concat data
      setTimeout(() => {

        //refresh to initial data
        this.componentDidMount();
        this.setState({
          waiting: false
        });
      }, 500);
  }  }
   
  renderFooter() {
      //show loading indicator
      if (this.state.waiting) {
          return <ActivityIndicator />;
      } else {
          return <Text>~</Text>;
      }
  }


    render()
    {
        return(
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation}/>
                <View style={styles.timelinecontainer}>
                <Timeline
                  style={styles.list}
                innerCircle={'icon'}
               data={this.state.data}
               columnFormat='two-column'
               circleSize={30}
               circleColor='rgb(45,156,219)'
               lineColor='rgb(45,156,219)'
               timeContainerStyle={{minWidth:52}}
               timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:10, borderRadius:13}}
               descriptionStyle={{color:'gray'}}
               options={{
                 style:{paddingTop:5},
                 refreshControl: (
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh}
                  />
                ),
                renderFooter: this.renderFooter,
                onEndReached: this.onEndReached
                 
               }}
               
               
               />
                </View>
        
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',

  },
  timelinecontainer:{
    flex:1,

  },
  text:{
    fontSize:30,
  },
  list: {
    flex: 1,
    marginTop:80,
    width:250
  },
});
