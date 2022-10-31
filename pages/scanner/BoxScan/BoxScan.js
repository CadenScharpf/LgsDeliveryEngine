
import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image, TouchableOpacity
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { createStackNavigator } from '@react-navigation/stack';
import getGlobalColors from '../../../Colors';
import { getBoxDetails, getLotDetails, getPalletDetails, getProductDetails } from '../../../Database';
import { ScrollView, SafeAreaView } from 'react-native-gesture-handler';
import { Card } from "@rneui/themed";
import ProductDetails from './ProductDetails';
import Product from '../../../components/product/Product';

var colors = getGlobalColors()
function BoxWrapper(props) {
  if (props.route.params.id == '') { return <Text>Nothing to show</Text> }
  const [boxDetails, setBoxDetails] = useState();
  const [lotDetails, setLotDetails] = useState();
  const [productDetails, setProductDetails] = useState()

  useEffect(() => {
    getBoxDetails(props.route.params.id).then((result) => {
      var queryResults = JSON.parse(result);
      setBoxDetails(queryResults.output[0])
      getLotDetails(queryResults.output[0].lot_id).then((result) => {
        var queryResults = JSON.parse(result);
        setLotDetails(queryResults.output[0])
        getProductDetails(queryResults.output[0].product_id, 'english').then((result) => {
          var queryResults = JSON.parse(result);
          setProductDetails(queryResults.output[0])
          
        }).catch((error) => {
          return <Text>Something went wrong</Text>
        })
      }).catch((error) => {
        return <Text>Something went wrong</Text>
      })
    }).catch((error) => {
      return <Text>Something went wrong</Text>
    });
  }, [])
  if (boxDetails && lotDetails && productDetails) {
    return <BoxScan src={boxDetails} pd={productDetails}/>
  } else { return <Text style={styles.baseText}>The requested resource could not be found.</Text> }
}

class BoxScan extends Component {
  constructor(props) {
    super()
    const { navigation, src, pd } = props;
    this.state = {
      id: src.box_id ? src.box_id : "",
      quantity: src.quantity_of_products ? src.quantity_of_products: "",
      lot_id: src.lot_id ? src.lot_id : "",
      pd: pd? pd : ""
    };

  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card} onPress={() => { }}>
        <View >
          <Text style={styles.titleText} >Box #{this.state.id}</Text>
          <Text style={styles.baseText}>Quantity: {this.state.quantity}</Text>
          <Text style={styles.baseText}>Product Information:</Text>
          <ProductDetails src={this.state.pd}/>
          
        </View>
      </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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

