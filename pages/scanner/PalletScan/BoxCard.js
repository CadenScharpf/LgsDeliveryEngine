import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import getGlobalColors from '../../../Colors';
import { Card } from "@rneui/themed";


var colors = getGlobalColors();

export default function BoxCard(props) {
  return (
    <Card containerStyle={props.status == "Good" ? styles.goodStatus : styles.recall}>
      <Card.Title >Box</Card.Title>
      <Text style={{textAlign: 'center'}}>Id: #{props.id}</Text>
      <Card.Divider />
      <Text>Status: {props.status}</Text>
      <Button onPress={() => {global.SCANNERSTACKNAV.navigate('Box', { id: props.id })}} title="More Info" />
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


