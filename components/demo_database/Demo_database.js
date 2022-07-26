import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import getString from "../../StringsArray";
import {getAllProducts, deleteProduct, addProduct} from "../../Database";

class Demo_database extends Component {
  constructor(props) {
    console.log('Constructor Called');

    super(props);
    this.state={
      item_data: [] 
    }  
    
    this.fetchData();
  }

  fetchData = async () => {
    console.log('Fetch Data Function Called');
    getAllProducts(global.language).then((result) => {
      console.log('Fetch Data Then: ' + result);
      this.setState({ item_data: JSON.parse(result)});
    }).catch((error) => {
      console.log('Fetch Data Catch Error: ' + error);
    });
    console.log('After Fetch - Item Data: ' + JSON.stringify(this.state.item_data));
  }

  // event handler for new item creation
  addProduct = () => {
    console.log('Add Product Function Called');

    var defaultLabel = 'arugula';
    var bestBeforeDays = 7;
    var product_descriptions = [{language: 'english', content: 'Arugula'},{language: 'spanish', content: 'Rúcula'}];
    var product_specifications = [{language: 'english', content: 'Arugula or rocket is an edible annual plant in the family Brassicaceae used as a leaf vegetable for its fresh, tart, bitter, and peppery flavor.'},{language: 'spanish', content: 'La rúcula o rúcula es una planta anual comestible de la familia Brassicaceae que se utiliza como verdura de hoja por su sabor fresco, agrio, amargo y picante.'}];

    addProduct(defaultLabel, bestBeforeDays, product_descriptions, product_specifications).then((result) => {
    console.log('Add Product Then: ' + result);
      // fetch new data    
      this.fetchData();
    }).catch((error) => {
      console.log('Add Product Catch Error: ' + error);
    });
  }

  deleteProduct = async (product_id) => {
    console.log('Delete Product Function Called');
    deleteProduct(product_id).then((result) => {
      console.log('Delete Product Then: ' + result);
      // fetch new data    
      this.fetchData();
    }).catch((error) => {
      console.log('Delete Product Catch Error: ' + error);
    });
  }

  // Debugging:
  // <Text>{JSON.stringify(this.state.item_data)}</Text>
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>{getString('demo_db_title', global.language)}</Text>
      <Text style={styles.black}>{getString('demo_db_description', global.language)}</Text>
      <Text style={styles.black}>{getString('demo_db_instructions', global.language)}</Text>
      <TouchableOpacity onPress={this.addProduct} style={styles.green}>
        <Text style={styles.black}>{getString('demo_db_add', global.language)}</Text>
      </TouchableOpacity>
      <ScrollView>
      {
        this.state.item_data && this.state.item_data.map(item_data =>
        (
            <View key={item_data.id} style={styles.list}>
              <Text style={styles.black}>{item_data.defaultLabel}</Text>
              <Text style={styles.black}>{getString('demo_db_bestbefore', global.language)} {item_data.bestBeforeDays}</Text>
              <Text style={styles.black}>{item_data.product_description}</Text>
              <Text style={styles.black}>{item_data.product_specification}</Text>
              <TouchableOpacity onPress={() => this.deleteProduct(item_data.id)}>
                  <Text style={styles.red}>{getString('demo_db_delete', global.language)}</Text>
              </TouchableOpacity>
            </View>
        )
      )}
      </ScrollView>
    </View >
  )
  }
}
export default Demo_database

const styles = StyleSheet.create({
  container: {
    marginTop: 50, 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  blue: {
    color: 'blue',
  },
  red: {
    color: 'red',
  },
  white: {
    color: 'white',
  },
  black: {
    color: 'black',
  },
  green: {
    color: 'green',
  },
  widthfull: {
    backgroundColor: '#ADD8E6',
    color: 'black',
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  list: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ADD8E6',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});