import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import {getString} from "../../StringsArray";
import getGlobalColors from '../../Colors';
import Product from '../../components/product/Product';
import { getAllProducts } from '../../api/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from 'react-navigation';

var colors = getGlobalColors();


function ProductsPage(props) {
  global.gotofeedback = ()=>{global.feedbackId = ""; props.navigation.navigate(getString('app_feedback'))}
  const [productDetails, setProductDetails] = useState();
  useEffect(() => {
     getAllProducts(global.language).then((result) => {
        var queryResults = JSON.parse(result);
        setProductDetails(queryResults.output)
        
      }).catch((error) => {
        console.log('getAllProductsOperation failed');
      });
  }, [])

  if(productDetails) {
    return <ProductScroll productDetails={productDetails}/>
  } else {return null;}
}

function ProductScroll(productDetails) {  
  return (
    //   <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundColor }}>
    //   <Product src={products[0]} />
    // </View>
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
        {productDetails.productDetails.map((product, index) => { return <Product key={index} src={product} />; })}
    </ScrollView>
  </SafeAreaView>
  );
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
  text: {
    fontSize: 42,
  },
});
export default withNavigation(ProductsPage) ;

