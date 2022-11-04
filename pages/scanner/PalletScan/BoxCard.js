import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import getGlobalColors from '../../../Colors';
import { Card } from "@rneui/themed";
import {getString} from "../../../StringsArray";

var colors = getGlobalColors();

export default function BoxCard(props) {
  return (
    <Card containerStyle={props.status == "Good" ? styles.goodStatus : styles.recall}>
      <Card.Title>{getString('boxcard_box')}</Card.Title>
      <Text style={{textAlign: 'center'}}>{getString('boxcard_id')}: #{props.id}</Text>
      <Card.Divider />
      <Text>{getString('boxcard_status')}: {props.status}</Text>
      <Button onPress={() => {global.SCANNERSTACKNAV.navigate('Box', { id: props.id })}} title={getString('boxcard_moreinfo')} />
    </Card>

  )
}

const styles = StyleSheet.create({


  textDescription: {
    marginLeft: 10,
    color: colors.foregroundTextPrimary
  },
  recall: {
    backgroundColor: '#f8d7da',
    textAlign: 'center'
  },
  goodStatus: {
    backgroundColor: '#d4edda'
  }

});


