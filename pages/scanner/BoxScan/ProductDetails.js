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
import getGlobalColors from '../../../Colors';
import { getAllProducts, getProductDetails, getLotDetails } from '../../../api/Database'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import LotInformation from '../../../components/LotInformation/LotInformation';
import { getString } from '../../../StringsArray';
import Product from '../../../components/product/Product';


var colors = getGlobalColors();
const stack = createStackNavigator()



export default function ProductDetails(props) {
  const [lotInfo, setLotInfo] = useState();
  useEffect(() => {
    getLotDetails(props.lot_id).then((result) => {
      var queryResults = JSON.parse(result);
      setLotInfo(queryResults.output);
     
    }).catch((error) => {
      return <Text>{getString('boxscan_error')}</Text>
    })
    
}, [])
  if (lotInfo) {
    return (
      <TouchableOpacity style={styles.card} onPress={() => { Linking.openURL("props.src.productPageURL"); }}>
        {/* <View style={styles.infoContainer}>
              <Text style={styles.name}>{props.src.product_name}</Text>
              <Text style={styles.sub}>{props.src.product_specification.substring(0,90)+"..."}</Text>
            </View> */}
            {/* <Product product_id={lotInfo[0].product_id}/> */}
            <Text style={styles.textDescription}>Lot #{props.lot_id}</Text>
            <Text style={styles.textDescription}>Quantity: {props.p.quantity_of_products}</Text>
        {lotInfo && <LotInformation src={lotInfo[0]} /> }
        {/* <Button onPress={()=>{global.feedbackExpirationDate = lotInfo[0].bestBeforeDate; global.feedbackProduct = props.src.product_name; global.feedbackLotId = props.src.id ;global.gotofeedback()}} title={getString('product_leavefeedback')}/> */}
        <Button onPress={()=>{global.feedbackExpirationDate = lotInfo[0].bestBeforeDate; global.feedbackLotId = props.lot_id ;global.gotofeedback()}} title={getString('product_leavefeedback')}/>

      </TouchableOpacity>
    );
  } else {
    return null;
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
    marginVertical: 20
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%'
  },
  infoContainer: {
    padding: 10,
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
