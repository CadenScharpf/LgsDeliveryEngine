
import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image, TouchableOpacity, Button
} from 'react-native';
import getGlobalColors from '../../../Colors'
import { getPalletDetails, getBoxDetails, checkForRecall, getAllQRScans } from '../../../api/Database';
import { ScrollView, SafeAreaView } from 'react-native-gesture-handler';
import BoxCard from './BoxCard';
import Timeline from 'react-native-timeline-flatlist';
import QrData from '../../../components/qrdata/QrData';
import {getString} from "../../../StringsArray";

var colors = getGlobalColors()

function PalletWrapper(props) {
  if (props.route.params.id == '') 
  { 
    return <Text>{getString('palletscan_nothing')}</Text>
  }
  
  const [palletID, setpalletID] = useState();
  const [palletDetails, setPalletDetails] = useState();
  const [scanHistory, setScanHistory] = useState();
  

  useEffect(() => {
    
    getPalletDetails(props.route.params.id).then((result) => {
      var queryResults = JSON.parse(result);
      for(i=0;i<3; i++){console.log(' ');}

      console.log('Get Pallet Details Result: ' + JSON.stringify(queryResults.output[0]));

      setPalletDetails(queryResults.output[0])
      getAllQRScans(props.route.params.id).then(
        (result) => {
          setScanHistory(JSON.parse(result).output)
        });
    }).catch((error) => {
      return <Text>{getString('palletscan_resource')}</Text>
    });
  }, [])

  if (palletDetails && scanHistory) {
    return <PalletScan src={palletDetails} scanHistory={scanHistory}/>
  } else { 
    return <Text style={styles.baseText}>{getString('palletscan_loading')}</Text> 
  }
}

class PalletScan extends Component {
  constructor(props) {
    super()
    const { navigation, src, scanHistory } = props;
    state = {
      pallet_id: src.pallet_id ? src.pallet_id : "",
      enclosed_box_ids: src.enclosed_box_ids ? src.enclosed_box_ids.split(",") : [],
      scanHistory: scanHistory ? scanHistory : ""
    };
  }

  render() {
    return (
      <View style={styles.container} onPress={() => { }}>
        <View style={styles.card}>
          <Text style={styles.titleText} >{getString('palletscan_pallet')} #{state.pallet_id}</Text>
          <Text style={styles.textDescription}>{getString('palletscan_contains')} {state.enclosed_box_ids.length} {getString('palletscan_boxes')}</Text>
          {/* TODO - update hardcoded # of recalled boxes */}
          {(state.enclosed_box_ids.length > 2)?<Text style={styles.recallTextDescription}>{getString('palletscan_contains_1')} 1 {getString('palletscan_contains_2')}</Text>:<Text></Text>}
          <ScrollView horizontal={true}>
            {
              state.enclosed_box_ids.map((id, index) => { 
                return <BoxCard key={index} id={id} /> 
              }
              )
            }
          </ScrollView>
        </View>
        
        <QrData  scanHistory={state.scanHistory}/>
        <Button onPress={()=>{global.feedbackExpirationDate = ""; global.feedbackLotId = "" ;global.gotofeedback()}} title={getString('product_leavefeedback')}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 0,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.backgroundTextPrimary
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: colors.backgroundTextSecondary,
    fontSize: 18,
  },
  recallTextDescription: {
    marginLeft: 10,
    color: '#FF9494',
    fontSize: 18,
  },
  baseText: {
    color: colors.foregroundTextPrimary,
    fontSize: 22,
    fontWeight: "bold",
    padding: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.foregroundTextPrimary
  },
  card: {
    backgroundColor: colors.background,
    
    elevation: 1,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PalletWrapper;

