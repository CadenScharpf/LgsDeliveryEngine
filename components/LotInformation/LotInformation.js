import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView,
    Linking
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { createStackNavigator } from '@react-navigation/stack';
import getGlobalColors from '../../Colors';
import { getAllProducts, getProductDetails, getLotDetails } from '../../Database';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

var colors = getGlobalColors();

export default function LotInformation(props) {
const state = {
    tableHead:  ['Harvest Information'],
    tableData: [
        ['Farm:', props.src.Farm],
        ['Harvest date:', props.src.harvestDate],
        ['Harvested by:', props.src.harvestedBy],
        ['Best before:', props.src.bestBeforeDate]
    ]
}
    

    return (
       <Table borderStyle={{borderWidth: 10, borderColor: colors.foreground}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.head}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
    )
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
    head: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.foregroundTextPrimary, 
      textAlign: 'center',
      margin: 'auto',
    },
    text: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 8,
      color: colors.foregroundTextPrimary
    },
  });


