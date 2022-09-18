import 'react-native-gesture-handler'
import React from 'react';
import { Text, View, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';
import Product from '../../components/product/Product';

var colors = getGlobalColors();
var products = [
  { "id": 1, "bestBeforeDays": 14, "product_description": "Blade Oakleaf Lettuce", "product_specification": "An Oakleaf Lettuce in the shape of a blade, this lettuce’s leaves are long and thin, and they fit perfectly, whole, in large salads, or, chopped, in regular salads" }, 
  { "id": 2, "defaultLabel": "cucumber", "bestBeforeDays": 28, "product_description": "Chives", "product_specification": "Whether you call them Chives or Green Onions, these thin vegetable rods are a delightful addition to any salad, a perfect garnish for heartier dishes, fabulous mixed in with peppers and mushrooms for frittatas, and more! " }, 
  { "id": 3, "defaultLabel": "crouton", "bestBeforeDays": 28, "product_description": "Cilantro", "product_specification": "Cilantro, also known as coriander, is beloved by millions of people around the world, and is vehemently hated by 10% of the population. " }]
function ProductScroll() {  
  return (
    //   <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundColor }}>
    //   <Product src={products[0]} />
    // </View>
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <Product src={products[0]} />
      <Product src={products[1]} />
      <Product src={products[2]} />
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
export default ProductScroll;

