import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, 
  Linking, Button
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { createStackNavigator } from '@react-navigation/stack';
import getGlobalColors from '../../Colors';
import { getAllProducts, getProductDetails, getLotDetails } from '../../api/Database';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import LotInformation from '../LotInformation/LotInformation';
import {getString} from "../../StringsArray";

var colors = getGlobalColors();
const stack =  createStackNavigator()

export default function Product(props) {
  console.log('Product Called');
  console.log(props);

  const [lotInfo, setLotInfo] = useState();
  useEffect(() => {
    console.log('Use Effect Entered from Product');

    getLotDetails(props.src.id).then((result) => {
      console.log('getLotDetails Called from Product');
      var queryResults = JSON.parse(result);
      
      console.log('getLotDetails Result from Product: ' + JSON.stringify(queryResults.output[0]));
      
      setLotInfo(queryResults.output) 
    })
  }, [])

  
  useEffect(() => {
    console.log('Use Effect Entered from Product');

    getLotDetails(props.src.id).then((result) => {
      console.log('getLotDetails Called from Product');

      var queryResults = JSON.parse(result);
      setLotInfo(queryResults.output) 
    })
  }, [])

  if(lotInfo) {
    console.log('Lot Info Set');
    return (
    <TouchableOpacity style={styles.card} onPress={() => {Linking.openURL( props.src.productPageURL );}}>
      <Image
      resizeMode={'cover'}
        style={styles.thumb}
        source={{uri:props.src.photoURL}}/>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{props.src.product_name}</Text>
        <Text style={styles.sub}>{getString('product_description')}: {props.src.product_specification}</Text>
      </View>
      {lotInfo && <LotInformation src={lotInfo[0]}/>}
      <Button onPress={()=>{global.feedbackExpirationDate = lotInfo[0].bestBeforeDate; global.feedbackProduct = props.src.product_name; global.feedbackLotId = props.src.id ;global.gotofeedback()}} title={getString('product_leavefeedback')}/>

      </TouchableOpacity>
    );
  } else {
    console.log('Lot Info NOT Set');
    return null
  }
}

const styles = StyleSheet.create({
  

  textDescription: {
    marginLeft: 10,
    color: colors.foregroundTextPrimary
  },
  card: {
    backgroundColor: colors.foreground,
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
  height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.foregroundTextPrimary
  },
  sub: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.foregroundTextPrimary
  },
});
