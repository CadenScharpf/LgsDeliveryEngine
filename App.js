import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import * as SQLite from 'expo-sqlite';

// var db;
const db2 = SQLite.openDatabase('db2.testDb') // returns Database object
let sqlQuery = '';
let params = '';

class App extends Component {
  constructor(props) {
    console.log('Constructor Called');

    super(props);
    this.state={
      item_data: null, 
      userList:[]
    }    
    
    sqlQuery = "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)"
    params = [];
    this.executeQuery(sqlQuery, params);

    sqlQuery = "INSERT INTO items (text, count) values ('FarmerABC', 1)"
    params = [];
    this.executeQuery(sqlQuery, params);

    sqlQuery = "INSERT INTO items (text, count) values ('FarmerXYZ', 1)"
    params = [];
    this.executeQuery(sqlQuery, params);

    sqlQuery = "INSERT INTO items (text, count) values ('Retailer123', 1)"
    params = [];
    this.executeQuery(sqlQuery, params);

    this.fetchData();
    console.log('Item Data: ' + this.state.item_data);
  }

  executeQuery = (sqlQuery, params) => {     
    console.log('Execute Query Function Call');
    console.log('-------------------------------------');
    console.log('Query: ' + sqlQuery);
    console.log('Parameters: ' + params);

    db2.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {
          console.log("SUCCESS");
          console.log("Results: " + results);
          console.log("Results (JSON): " + JSON.stringify(results));
          console.log("Transaction: " + trans);
          console.log("Transaction (JSON): " + JSON.stringify(trans));
      },
          (error) => {
          console.log("Execute error: " + JSON.stringify(error));
      });
    });
    
    console.log(' ');
    console.log(' ');
  }

  fetchData = () => {
    console.log('fetchData function call');
    
    db2.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => this.setState({ item_data: _array }), 
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction
  }

  // event handler for new item creation
  newItem = () => {
    sqlQuery = "INSERT INTO items (text, count) values (?, ?)"
    params = ['Distributor', 0];
    this.executeQuery(sqlQuery, params);

    this.fetchData();
    console.log('Item Data: ' + this.state.item_data);
  }

  increment = (id) => {
    db2.transaction(tx => {
      tx.executeSql('UPDATE items SET count = count + 1 WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let newList = this.state.item_data.map(item_data => {
              if (item_data.id === id)
                return { ...item_data, count: item_data.count + 1 }
              else
                return item_data
            })
            this.setState({ item_data: newList })
          }
        })
    })
  }

  deleteId = (id) => {
    db2.transaction(tx => {
      tx.executeSql('DELETE FROM items WHERE id = ? ', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let newList = this.state.item_data.filter(item_data => {
              if (item_data.id === id)
                return false
              else
                return true
            })
            this.setState({ item_data: newList })
          }
        })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.white}>.</Text>
        <Text style={styles.white}>.</Text>
        <Text style={styles.white}>.</Text>
        <Text style={styles.title}>LGS Delivery Engine Demo</Text>
        <Text style={styles.black}>Android + Database Demo</Text>
        <Text style={styles.black}>Add Random Name with Counts</Text>
        <TouchableOpacity onPress={this.newItem} style={styles.green}>
          <Text style={styles.black}>Add New Item</Text>
        </TouchableOpacity>

        <ScrollView /*style={styles.widthfull} contentContainerStyle={{flex: 1}}*/>
        {
            this.state.item_data && this.state.item_data.map(item_data =>
            (
                <View key={item_data.id} style={styles.list}>
                  <Text style={styles.black}>{item_data.text} - {item_data.count}</Text>
                  <TouchableOpacity onPress={() => this.increment(item_data.id)}>
                      <Text style={styles.green}> + </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.deleteId(item_data.id)}>
                      <Text style={styles.red}>DEL</Text>
                  </TouchableOpacity>
                </View>
            )
        )}
        </ScrollView>
      </View >
    )
  }
}

export default App

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
    margin: 20,
    backgroundColor: '#ADD8E6',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});
