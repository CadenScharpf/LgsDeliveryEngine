
import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image, TouchableOpacity, Button
} from 'react-native';
import getGlobalColors from '../../../Colors'
import { getLotDetails, getProductDetails } from '../../../api/Database';
import { ScrollView, SafeAreaView } from 'react-native-gesture-handler';
import Timeline from 'react-native-timeline-flatlist';
import QrData from '../../../components/qrdata/QrData';
import {getString} from "../../../StringsArray";
import ProductOnly from '../../../components/product/ProductOnly';
import LotInformation from '../../../components/LotInformation/LotInformation';

var colors = getGlobalColors()

function ProductWrapper(props) {
    if (props.route.params.id == '') { 
        return <Text>{getString('productscan_nothing')}</Text>
    }

    const [productID, setproductID] = useState(-1);
    const [lotDetails, setLotDetails] = useState();
    const [DBProductDetails, setDBProductDetails] = useState();

  useEffect(() => {
    if (productID == -1) {
        // not yet set
        getLotDetails(props.route.params.id).then((result) => {
            var queryResults = JSON.parse(result);
            console.log('Get Lot Details Result: ' + JSON.stringify(queryResults.output[0]));
    
            setLotDetails(queryResults.output[0]);
    
            // get product ID and store product details
            setproductID(queryResults.output[0].product_id);
        }).catch((error) => {
            return <Text>{getString('productscan_resource')}</Text>
        });
    } else {
        if (productID) {
            console.log('Product ID updated: ' + productID);

            getProductDetails(productID).then((result) => {
                var queryResults = JSON.parse(result);
                console.log('Get Product Details Result: ' + JSON.stringify(queryResults.output[0]));
        
                setDBProductDetails(queryResults.output[0]);
            }).catch((error) => {
                return <Text>{getString('productscan_resource')}</Text>
            });
        } else {
            console.log('Product ID not defined');
        }
    }
  }, [productID]);

  if (lotDetails && DBProductDetails) {
    return <ProductScan lotID={props.route.params.id} lotDetails={lotDetails} DBProductDetails={DBProductDetails} />
  } else { 
    return <Text style={styles.baseText}>{getString('productscan_loading')}</Text> 
  }
}

class ProductScan extends Component {
  constructor(props) {
    super()
    const { navigation, lotID, lotDetails, DBProductDetails } = props;
    state = {
      product_id: lotDetails.product_id ? lotDetails.product_id : "",
      lot_id: lotID ? lotID : "",
      product: DBProductDetails ? DBProductDetails : "",
      lot: lotDetails ? lotDetails : "",
    };
  }

  render() {
    return (
      <View style={styles.container} onPress={() => { }}>
        <View style={styles.card}>
          <Text style={styles.titleText} >{getString('productscan_lot')} #{state.lot_id}</Text>
        </View>

        <ScrollView>
            <LotInformation src={state.lot}/>
            <ProductOnly src={state.product} />
            <QrData />
        </ScrollView>

        <Button onPress={()=>{global.feedbackExpirationDate = state.lot.bestBeforeDate; global.feedbackProduct = state.product.product_name; global.feedbackLotId = state.lot_id ;global.gotofeedback()}} title={getString('product_leavefeedback')}/>

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

export default ProductWrapper;

