
 import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image
 } from 'react-native';
 import Timeline from 'react-native-timeline-flatlist'
 import { createStackNavigator } from '@react-navigation/stack';
 import getGlobalColors from '../../../Colors';

 var colors = getGlobalColors();
 
 export default class QrData extends Component {
   constructor(props){
     super()
     const { navigation } = props;
     this.onEventPress = this.onEventPress.bind(this)
     this.renderSelected = this.renderSelected.bind(this)
     this.renderDetail = this.renderDetail.bind(this)
     this.unit = require('../../../data/qrdata.json')[0]
     this.scanData = this.unit.scans;
     this.data = [
       {
         time: this.processDescriptionString(this.scanData[0].user_id, this.scanData[0].accountType , this.scanData[0].geolocation_lat, this.scanData[0].geolocation_lon, this.scanData[0].company), 
         title: this.scanData[2].date_time, 
         description: this.processDescriptionString(this.scanData[2].user_scanned, this.scanData[2].accountType , this.scanData[2].geolocation_lat, this.scanData[2].geolocation_lon, this.scanData[2].company),
         lineColor:'#009688', 
         icon: require('./distributer.png'),
         imageUrl: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/compass_blogpost_screenshot.max-1000x1000.png'
       },
       {
         time: this.processDateString(this.scanData[1]), 
         title: this.scanData[1].date_time, 
         description: this.processDescriptionString(this.scanData[1].user_scanned, this.scanData[1].accountType, this.scanData[1].geolocation_lat, this.scanData[1].geolocation_lon, this.scanData[1].company), 
         icon: require('./retailer.png'),
         imageUrl: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/compass_blogpost_screenshot.max-1000x1000.png'
       },
       {
         time: this.processDateString(this.scanData[0]), 
         title: this.scanData[0].date_time, 
         description: this.processDescriptionString(this.scanData[0].user_scanned, this.scanData[0].accountType , this.scanData[0].geolocation_lat, this.scanData[0].geolocation_lon, this.scanData[0].company), 
         icon: require('./consumer.png'),
         imageUrl: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/compass_blogpost_screenshot.max-1000x1000.png'
       }
     ]
     this.state = {selected: null}
   } 

   processDateString(scanData)
   {
    return this.processDescriptionString(scanData.user_id, scanData.accountType , scanData.geolocation_lat, scanData.geolocation_lon, scanData.company)
   }

   processDescriptionString(usr, type, lat, lon, company)
   {
    var line1, line2, line3 = "";
    switch(type){
      case "consumer":
        return "Delivered to consumer " + usr + " at location [" + lat + "," + lon + "]";
        break;
      case "retailer":
        line1 = "Recieved by retailer " + company + " at location [" + lat + "," + lon + "]\n";
        line2 = "Collected by user: " + usr;
        return line1 + line2;
        break;
        case "distributor":
          line1 = "Product left distributer " + company + " at location [" + lat + "," + lon + "]\n";
          line2 = "Dispatched by user: " + usr;
          return line1 + line2;
        break;
    }
   }
   processDstring2(obj) 
   {
    this.processDescriptionString(obj.user_id, obj.accountType , obj.geolocation_lat, obj.geolocation_lon, obj.company)
   }
 
   onEventPress(data){
     this.setState({selected: data})
   }
 
   renderSelected(){
       if(this.state.selected)
         return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
   }
 
   renderDetail(rowData, sectionID, rowID) {
     let title = <Text style={[styles.title]}>{rowData.title}</Text>
     var desc = null
     if(rowData.description && rowData.imageUrl)
       desc = (
         <View style={styles.descriptionContainer}>   
           <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
           <Text style={[styles.textDescription]}>{rowData.description}</Text>
         </View>
       )
     
     return (
       <View style={{flex:1}}>
         {title}
         {desc}
       </View>
     )
   }
 
   render() {
     return (
       <View style={styles.container}>
         {/* {this.renderSelected()} */}
         <Timeline 
           style={styles.list}
           data={this.data}
           circleSize={20}
           circleColor='rgba(0,0,0,0)'
           lineColor='rgb(45,156,219)'
           timeContainerStyle={{minWidth:72, marginTop: -5}}
           timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
           descriptionStyle={{color:'gray'}}
           options={{
             style:{paddingTop:5}
           }}
           innerCircle={'icon'}
           onEventPress={this.onEventPress}
           renderDetail={this.renderDetail}
           showTime={false}
         />
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 0,
   paddingTop:0,
   backgroundColor: colors.background,
   },
   list: {
     flex: 1,
     marginTop:20,
   },
   title:{
     fontSize:16,
     fontWeight: 'bold',
     color: colors.backgroundTextPrimary
   },
   descriptionContainer:{
     flexDirection: 'row',
     paddingRight: 50
   },
   image:{
     width: 50,
     height: 50,
     borderRadius: 25
   },
   textDescription: {
     marginLeft: 10,
     color: colors.backgroundTextSecondary
   }
 });
 