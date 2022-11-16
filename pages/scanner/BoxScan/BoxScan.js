
import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image, StatusBar, TouchableOpacity
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { createStackNavigator } from '@react-navigation/stack';
import getGlobalColors from '../../../Colors';
import { getBoxDetails, getLotDetails, getPalletDetails, getProductDetails } from '../../../api/Database';
import { ScrollView, SafeAreaView } from 'react-native-gesture-handler';
import { Card } from "@rneui/themed";
import ProductDetails from './ProductDetails';
import Product from '../../../components/product/Product';
import {getString} from "../../../StringsArray";

var colors = getGlobalColors()
function BoxWrapper(props) {
  if (props.route.params.id == '') { return <Text>{getString('boxscan_nothing')}</Text> }
  const [boxDetails, setBoxDetails] = useState();
  const [lotDetails, setLotDetails] = useState();
  const [productDetails, setProductDetails] = useState()

  useEffect(() => {
    getBoxDetails(props.route.params.id).then((result) => {
      var queryResults = JSON.parse(result);//returns array of lot ids in the box
      setBoxDetails(queryResults.output)
      
    }).catch((error) => {
      return <Text>{getString('boxscan_error')}</Text>
    });
  }, [])
  if (boxDetails) {
    return <BoxScan id={props.route.params.id} contents={boxDetails}/>
  } else { return <Text style={styles.baseText}>{getString('palletscan_loading')}</Text> }
}

class BoxScan extends Component {
  constructor(props) {
    super()
    const { navigation, id, contents } = props;
    this.state = {
      id: id ? id : "",
      contents: contents ? contents: ""
    };

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{getString('boxscan_box')} #{this.state.id}</Text>
    <ScrollView style={styles.scrollView}>
      { 
         /* <Text style={styles.baseText}>{getString('boxscan_quantity')}: {this.state.quantity}</Text>
          <Text style={styles.baseText}>{getString('boxscan_productinfo')}:</Text> */}
    {this.state.contents.map((product, index) => { 
      return <ProductDetails index={index} lot_id={product.lot_id} p={product}  style={styles.card}/>; 
      })}

    </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  scrollView: {
    backgroundColor: colors.background,
    marginHorizontal: 20,
  },

  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
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
    color: colors.backgroundTextSecondary
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
    color: colors.foregroundTextPrimary,
    textAlign: 'center'
  },
  card: {
    backgroundColor: colors.foreground,
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: colors.backgroundTextPrimary,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BoxWrapper;

