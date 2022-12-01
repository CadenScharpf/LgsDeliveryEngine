
 import React, { Component, useState } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image
 } from 'react-native';
 import Timeline from 'react-native-timeline-flatlist'
 import { createStackNavigator } from '@react-navigation/stack';
 import getGlobalColors from '../../Colors';
 import {getString} from "../../StringsArray";
import { getAllQRScans } from '../../api/Database';

 var colors = getGlobalColors();
 
 export default class QrData extends Component {
   constructor(props){
     super()
     const { navigation, scanHistory } = props;
     this.onEventPress = this.onEventPress.bind(this)
     this.renderSelected = this.renderSelected.bind(this)
     this.renderDetail = this.renderDetail.bind(this)
     this.unit = require('../../data/qrdata.json')[0]
     this.scanData = this.unit.scans;
     this.data = [];
     for(i=scanHistory.length-1;i>=0; i--) {
      var scan = scanHistory[i]
      var iconpath = "./farmer.png";
      var lineColor = ""
      switch(scan.accountType){
          case "farmer":
            iconpath = require("./farmer.png");
            lineColor = "#808080"
          break;
          case "distributor":
            iconpath = require("./distributor.png");
            lineColor = "#0077ff"
          break;
          case "retailer":
            iconpath = require("./retailer.png");
            lineColor = "#00FF00"
          break;
          case "consumer":
            iconpath = require("./consumer.png");
            lineColor = "#808080"
          break;
      }

      

      this.data.push(
        {
          time: this.processDateString(scan), 
          title: scan.date_time, 
          description: this.processDescriptionString(scan.user_scanned, scan.accountType , scan.geolocation_lat, scan.geolocation_lon, scan.company),
          lineColor: lineColor,
          icon: iconpath,
          imageUrl: `https://maps.googleapis.com/maps/api/staticmap?center=33.447612811244085,%20-112.07044719604862&zoom=13&size=600x300&maptype=roadmap&markers=color:red|label:|${scan.geolocation_lat},${scan.geolocation_lon}&key=AIzaSyB_7GjJGWkDE-xnnhzYVnHeMdgIO70OSdc`
          
        }
      )
     }
     this.state = {selected: null, qrScans: []}
   } 

   processDateString(scanData)
   {
    return this.processDescriptionString(scanData.user_email, scanData.accountType , scanData.geolocation_lat, scanData.geolocation_lon, scanData.company)
   }

   processDescriptionString(usr, type, lat, lon, company)
   {
    var line1, line2, line3 = "";
    switch(type){
      case "consumer":
        return getString('qrdata_consumer') + " " + usr + " " + getString('qrdata_atlocation') + " [" + lat + "," + lon + "]";
        break;
      case "retailer":
        line1 = getString('qrdata_retailer') + " " + company + " " + getString('qrdata_atlocation') + " [" + lat + "," + lon + "]\n";
        line2 = getString('qrdata_user_collected') + ": " + usr;
        return line1 + line2;
        break;
        case "distributor":
          line1 = getString('qrdata_distributor') + " " + company + " " + getString('qrdata_atlocation') + " [" + lat + "," + lon + "]\n";
          line2 = getString('qrdata_user_dispatched') + ": " + usr;
          return line1 + line2;
        break;
        case "farmer":
          line1 = getString('qrdata_farmer') + " " + company + " " + getString('qrdata_atlocation') + " [" + lat + "," + lon + "]\n";
          line2 = getString('qrdata_user_dispatched') + ": " + usr;
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
         <Text style={styles.baseText}>{getString('qrdata_history')}:</Text>
         <Timeline 
           style={styles.list}
           data={this.data}
           circleColor='rgba(0,0,0,0)'
           lineColor='rgb(45,156,219)'
           timeContainerStyle={{minWidth:72, marginTop: -5}}
           timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
           descriptionStyle={{color:'gray'}}
           options={{
             style:{paddingTop:5}
           }}
           innerCircle={'icon'}
           
          iconStyle={styles.iconStyle}
          circleSize={30}
          lineWidth={5}
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
   baseText: {
    color: colors.foregroundTextPrimary,
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 10,
  },
   list: {
     flex: 1,
     marginTop:0,
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
     width: 80,
     height: 80,
     borderRadius: 50
   },
   textDescription: {
     marginLeft: 10,
     color: colors.backgroundTextSecondary
   },
   iconStyle: {

   },
   circleStyle: {
    width: 20
   }
 });
 