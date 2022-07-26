import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import getString from "../../StringsArray";
import getAllProducts from "../../Database";

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
  newItem = () => {
    console.log('New Item Function Called');

    // TODO - call database to add

    /*
    fetchData();
    console.log('Item Data: ' + state.item_data);
    */
  }

  deleteId = (id) => {
    console.log('Delete Function Called');

    // TODO - call database to delete

    /*
    fetchData();
    console.log('Item Data: ' + state.item_data);
    */
  }

  // Debugging:
  // <Text>{JSON.stringify(this.state.item_data)}</Text>
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>{getString('demo_db_title', global.language)}</Text>
      <Text style={styles.black}>{getString('demo_db_description', global.language)}</Text>
      <Text style={styles.black}>{getString('demo_db_instructions', global.language)}</Text>
      <TouchableOpacity onPress={this.newItem} style={styles.green}>
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
              <TouchableOpacity onPress={() => this.deleteId(item_data.id)}>
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