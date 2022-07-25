import React, { Component } from "react";
import * as SQLite from 'expo-sqlite';

var StringsDB;

function initializeDatabase() {
  console.log("Initialize Database Function Call");
  console.log('-------------------------------------');
  
  return new Promise((resolve, reject) => {
    // TODO - move these outside of the function if possible
    StringsDB = SQLite.openDatabase('StringsDB.db') // returns Database object
    let sqlQuery = '';
    let params = '';
    
    sqlQuery = "CREATE TABLE IF NOT EXISTS strings (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, content TEXT)"
    params = [];
    this.executeQuery(sqlQuery, params);
    
    // TODO - add to multi-language
    sqlQuery = "DELETE FROM strings"
    params = [];
    this.executeQuery(sqlQuery, params);    
    
    sqlQuery = "INSERT INTO strings (description, content) values (?, ?)"
    params = ['settings_drawer', 'Settings*'];
    this.executeQuery(sqlQuery, params);    

    resolve('success');
  });      
}

  const getString = async (inputDescription) => {
    const initializeResult = await initializeDatabase();

    console.log('Get String Function Call');
    console.log('-------------------------------------');
    console.log('Input Description: ' + inputDescription);

    // TODO - add to multi-language when working

    // TODO - need to force this function to wait for 
    // query transaction to complete before returning string 
    // await? 
    try {   
      return await getResultForDescription(inputDescription);      
    } catch(e) { 
      return 'TBD';
    }
    /*
    const returnString = await getResultForDescription(inputDescription);    
    console.log("returning returnString: " + returnString);
    return returnString;
    */
  }

  export default getString;

  function getResultForDescription(inputDescription) {
    console.log("Get Result for Description Function Call");
    console.log('-------------------------------------');
    console.log('Get Result for Description Input Description: ' + inputDescription);

    var returnString = 'TBD4';

    return new Promise((resolve, reject) => {
      sqlQuery = "SELECT * FROM strings WHERE description = ?";
      params = [inputDescription];  

      StringsDB.transaction((txn) => {
        txn.executeSql(sqlQuery, params, (trans, results) => {        
              console.log("Get Result for Description SUCCESS");
              console.log('Get Result for Description Query: ' + sqlQuery);
              console.log('Get Result for Description Parameters: ' + params);
              console.log("Get Result for Description Results (JSON): " + JSON.stringify(results));
              console.log("Get Result for Description Transaction (JSON): " + JSON.stringify(trans));
              
              // TODO - assign returnString
              console.log("Get Result for Description _array[0]: " + JSON.stringify(results.rows._array[0]));
              console.log("Get Result for Description _array[0]'content': " + results.rows._array[0]["content"]);
              returnString = results.rows._array[0]["content"];
              console.log("Get Result for Description returnString set from query: " + returnString);

              // what you resolve here is what will be the result of
              // await function call  
              resolve(returnString);
          },
              (error) => {
              console.log("Get Result for Description Execute Error for query" + sqlQuery);
              console.log("Get Result for Description Execute Error: " + error);
              console.log("Get Result for Description Execute Error (JSON String): " + JSON.stringify(error));

              reject(error)
          });
        });
    });      
  }

  executeQuery = (sqlQuery, params) => {     
    console.log('Execute Query Function Call');
    console.log('-------------------------------------');
    console.log('Query: ' + sqlQuery);
    console.log('Parameters: ' + params);

    StringsDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {
          console.log("executeQuery SUCCESS");
          console.log("executeQuery Results: " + results);
          console.log("executeQuery Results (JSON): " + JSON.stringify(results));
          console.log("executeQuery Transaction: " + trans);
          console.log("executeQuery Transaction (JSON): " + JSON.stringify(trans));
      },
          (error) => {
          console.log("executeQuery ERROR for query: " + sqlQuery);
          console.log("executeQuery Execute error: " + JSON.stringify(error));
      });
    });
    
    console.log(' ');
    console.log(' ');
  }