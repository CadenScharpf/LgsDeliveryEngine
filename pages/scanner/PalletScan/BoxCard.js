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
import { getBoxDetails, checkForRecall } from '../../../api/Database';

var colors = getGlobalColors();

export default function BoxCard(props) {

  const [boxDetails, setBoxDetails] = useState();
  const [boxStatus, setBoxStatus] = useState(getString('palletscan_status_good'));
   
  useEffect(() => {
    if (boxDetails) {
      console.log('Box Details Updated: ' + JSON.stringify(boxDetails));

      // loop thro' all Lot IDs for this box and check for recall
      var currentLotID;
      for (let j = 0; j < boxDetails.length; j++) {
        console.log('Box Detail: ' + JSON.stringify(boxDetails[j]));

        currentLotID = boxDetails[j].lot_id;
        console.log('Current Lot ID: ' + currentLotID);

        checkForRecall(currentLotID).then((result) => {
          var queryResults = JSON.parse(result);
          console.log('Check for Recall Lot ID ' + currentLotID + ' Box ID ' + boxDetails[j].box_id + ': ' + JSON.stringify(queryResults.output));

          // set status to recalled if recall returned
          if (queryResults.output.length > 0) {
            setBoxStatus(getString('palletscan_status_recall')); 
          }
        }).catch((error) => {
          console.log('Check for Recall Error: ');
          console.log(error);
        });
      }
    }
  }, [boxDetails])

  useEffect(() => {
    getBoxDetails(props.id).then((result) => {
      var queryResults = JSON.parse(result);
      
      console.log('Get Box Details Result: ' + JSON.stringify(queryResults.output));

      setBoxDetails(queryResults.output)

    }).catch((error) => {
      console.log('Get Box Details in Box Card Error: ');
      console.log(error);
    });
  }, [])

  return (
    <Card containerStyle={boxStatus == getString('palletscan_status_good') ? styles.goodStatus : styles.recall}>
      <Card.Title style={styles.textDescription}>{getString('boxcard_box')}</Card.Title>
      <Text style={styles.textDescription}>{getString('boxcard_id')}: #{props.id}</Text>
      <Card.Divider />
      <Text style={styles.textDescription}>{getString('boxcard_status')}: {boxStatus}</Text>
      <Button onPress={() => {global.SCANNERSTACKNAV.navigate('Box', { id: props.id })}} title={getString('boxcard_moreinfo')} />
    </Card>

  )
}

const styles = StyleSheet.create({


  textDescription: {
    color: colors.foregroundTextSecondary,
    textAlign: 'center'
  },
  recall: {
    backgroundColor: colors.foreground,
    borderColor: "#FF0000",
    textAlign: 'center'
  },
  goodStatus: {
    backgroundColor: colors.foreground,
    borderColor: "#00FF00"
  }

});


