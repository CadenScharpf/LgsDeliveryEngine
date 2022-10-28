import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, 
  WebView, 
  Linking, Button
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { createStackNavigator } from '@react-navigation/stack';
import getGlobalColors from '../../Colors';
import { getAllProducts, getProductDetails, getLotDetails } from '../../Database';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import LotInformation from '../LotInformation/LotInformation';


var colors = getGlobalColors();
const stack =  createStackNavigator()



export default function Pallet(props) {
        return (
        <TouchableOpacity style={styles.card} onPress={() => {Linking.openURL( props.src.productPageURL );}}>
            <Text>Hello</Text>
        </TouchableOpacity>
    );
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
