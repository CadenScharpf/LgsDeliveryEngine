import React, { Component } from "react";
import * as SQLite from 'expo-sqlite';

// ---------------------------------------------------------------------
// CREATE SQLite DATABSE AND TABLES
// ---------------------------------------------------------------------
// returns Database object
const DatabaseDB = SQLite.openDatabase('DatabaseDB.db') 

let sqlQuery = '';
let params = '';

params = [];

sqlQuery = "CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, defaultLabel TEXT, bestBeforeDate DATE)"
this.executeQuery(sqlQuery, params);

sqlQuery = "CREATE TABLE IF NOT EXISTS product_descriptions (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)"
this.executeQuery(sqlQuery, params);

sqlQuery = "CREATE TABLE IF NOT EXISTS product_specifications (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)"
this.executeQuery(sqlQuery, params);

// TODO - define userID as optional (default null)
sqlQuery = "CREATE TABLE IF NOT EXISTS qrscan (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, date_time DATE_TIME, geolocation TEXT)"
this.executeQuery(sqlQuery, params);

sqlQuery = "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, password TEXT, accountType TEXT, language TEXT)"
this.executeQuery(sqlQuery, params);

sqlQuery = "CREATE TABLE IF NOT EXISTS box (id INTEGER PRIMARY KEY AUTOINCREMENT)"
this.executeQuery(sqlQuery, params);

sqlQuery = "CREATE TABLE IF NOT EXISTS box_contents (id INTEGER PRIMARY KEY AUTOINCREMENT, box_id INTEGER, product_id INTEGER, quantity INT)"
this.executeQuery(sqlQuery, params);

sqlQuery = "CREATE TABLE IF NOT EXISTS pallet (id INTEGER PRIMARY KEY AUTOINCREMENT)"
this.executeQuery(sqlQuery, params);

sqlQuery = "CREATE TABLE IF NOT EXISTS pallet_contents (id INTEGER PRIMARY KEY AUTOINCREMENT, pallet_id INTEGER, box_id INTEGER, quantity INT)"
this.executeQuery(sqlQuery, params);

// ---------------------------------------------------------------------
// ADD ALL USERS HERE 
// ---------------------------------------------------------------------

// TODO

// TODO - add more users here

// ---------------------------------------------------------------------
// ADD ALL PRODUCTS HERE 
// ---------------------------------------------------------------------

// TODO

// TODO - add more products here

// ---------------------------------------------------------------------
// ADD ALL BOXES HERE 
// ---------------------------------------------------------------------

// TODO

// TODO - add more boxes here


// ---------------------------------------------------------------------
// ADD ALL PALLETS HERE 
// ---------------------------------------------------------------------

// TODO

// TODO - add more pallets here



// ---------------------------------------------------------------------
// ADD ALL QR SCANS HERE 
// ---------------------------------------------------------------------

// TODO

// TODO - add more QR scans here


// ---------------------------------------------------------------------
// DEFINE ACCESSOR FUNCTIONS
// ---------------------------------------------------------------------

// TODO 




// ---------------------------------------------------------------------
// FUNCTION TO EXECUTE SQLite QUERY
// ---------------------------------------------------------------------
  executeQuery = (sqlQuery, params) => {     
    console.log('Execute Query Function Call');
    console.log('-------------------------------------');
    console.log('Query: ' + sqlQuery);
    console.log('Parameters: ' + params);

    DatabaseDB.transaction((txn) => {
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