import 'react-native-gesture-handler'
import React from 'react';
import { Text, View } from 'react-native';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';
import Product from '../../components/product/Product';

var colors = getGlobalColors();
var products = [
  { "id": 1, "defaultLabel": "tomato", "bestBeforeDays": 14, "product_description": "Tomato", "product_specification": "The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant." }, 
  { "id": 2, "defaultLabel": "cucumber", "bestBeforeDays": 28, "product_description": "Cucumber", "product_specification": "Cucumber (Cucumis sativus) is a widely-cultivated creeping vine plant in the Cucurbitaceae family that bears usually cylindrical fruits." }, 
  { "id": 3, "defaultLabel": "crouton", "bestBeforeDays": 28, "product_description": "Crouton", "product_specification": "A crouton is a piece of rebaked bread, often cubed and seasoned." }]
function ProductScroll() {  
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      {/* <Text style={{color: colors.textColorPrimary}}>{getString('dashboard_welcome')}</Text> */}
      <Product src={products[0]} />
    </View>
      
  );
}

export default ProductScroll;

/* this was for the StringSQLite.js option, but could not get the async working
// consider using:
// AsyncStorage.getItem("TOKEN") then useEffect
// or 
// use componentDidMount
const updateStrings = async() => {
  DemoStringsName = await getString('settings_drawer');
  console.log('Dashboard - DemoStringsName: ' + DemoStringsName);
}
*/