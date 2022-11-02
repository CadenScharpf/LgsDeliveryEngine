
import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image, TouchableOpacity
} from 'react-native';
import getGlobalColors from '../../../Colors'
import { getPalletDetails } from '../../../Database';
import { ScrollView, SafeAreaView } from 'react-native-gesture-handler';
import BoxCard from './BoxCard';
import Timeline from 'react-native-timeline-flatlist';
import QrData from '../../../components/qrdata/QrData';
import getString from "../../StringsArray";

var colors = getGlobalColors()

function PalletWrapper(props) {
  if (props.route.params.id == '') { return <Text>{getString('palletscan_nothing', global.language)}</Text> }
  const [palletDetails, setPalletDetails] = useState();

  useEffect(() => {
    getPalletDetails(props.route.params.id).then((result) => {
      var queryResults = JSON.parse(result);
      setPalletDetails(queryResults.output[0])

    }).catch((error) => {
      return <Text>{getString('palletscan_resource', global.language)}</Text>
    });
  }, [])
  if (palletDetails) {
    return <PalletScan src={palletDetails} />
  } else { return <Text style={styles.baseText}>{getString('palletscan_loading', global.language)}</Text> }
}

class PalletScan extends Component {
  constructor(props) {
    super()
    const { navigation, src } = props;
    state = {
      id: src.id ? src.id : "",
      enclosed_box_ids: src.enclosed_box_ids ? src.enclosed_box_ids.split(",") : [],
    };

  }


  render() {
    return (
      <View style={styles.container} onPress={() => { }}>
        <View style={styles.card}>
          <Text style={styles.titleText} >{getString('palletscan_pallet', global.language)} #{state.id}</Text>
          <Text style={styles.textDescription}>{getString('palletscan_contains', global.language)} {state.enclosed_box_ids.length} {getString('palletscan_boxes', global.language)}</Text>
          <ScrollView horizontal={true}>
            {state.enclosed_box_ids.map((id, index) => { return <BoxCard key={index} id={id} status="Good" /> })}
          </ScrollView>
        </View>
        
        <QrData />
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

