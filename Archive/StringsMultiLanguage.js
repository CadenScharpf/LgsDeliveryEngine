import React, { Component } from "react";
import * as SQLite from 'expo-sqlite';

// ---------------------------------------------------------------------
// CREATE SQLite DATABSE AND TABLES
// ---------------------------------------------------------------------
// returns Database object
const StringsDB = SQLite.openDatabase('StringsDB.db') 

let sqlQuery = '';
let params = '';

params = [];

sqlQuery = "CREATE TABLE IF NOT EXISTS string_description (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT)"
this.executeQuery(sqlQuery, params);

sqlQuery = "CREATE TABLE IF NOT EXISTS string_content (id INTEGER PRIMARY KEY AUTOINCREMENT, string_desc_id INTEGER, language TEXT, content TEXT)"
this.executeQuery(sqlQuery, params);

// ---------------------------------------------------------------------
// ADD ALL STRINGS (DESCRIPTION) AND LANGUAGES TRANSLATIONS (CONTENT) 
// ---------------------------------------------------------------------

let description = '';

description = 'settings_drawer';
addContent(description, 'English', 'Settings (English)');
addContent(description, 'Spanish', 'Settings (Spanish)');

// TODO - add more strings here







// ---------------------------------------------------------------------
// FUNCTION TO ADD CONTENT TO DATABSES FOR STRING TABLES
// ---------------------------------------------------------------------
addContent = (description, language, content) => {     
  console.log('Add Content Function Call');
  console.log('-------------------------------------');
  console.log('Description: ' + description);
  console.log('Language: ' + language);
  console.log('Content: ' + content);  

  // get the id for the current description
  let string_desc_id = getStringDescriptionId(description);

  // add content   
  sqlQuery = "INSERT INTO string_content (string_desc_id, language, content) values (?, ?, ?)"
  params = [string_desc_id, language, content];
  this.executeQuery(sqlQuery, params);
}

getStringDescriptionId = (description) => {     
  console.log('Get String Description ID Function Call');
  console.log('-------------------------------------');
  console.log('Description: ' + description);

  // get the id for the current description
  // initialize
  let string_desc_id = -1;

  // check to see if it already exists in the table  
  // TODO - assign result to string_desc_id if there is a row returned
  StringsDB.transaction(tx => {
    tx.executeSql('SELECT * FROM string_description WHERE description = ?', description, 
      (txObj, { rows: { _array } }) => console.log('array returned: ' + _array), 
      (txObj, error) => console.log('Error ', error)
      )
  })

  // if it does not, insert and return the id
  if (string_desc_id == -1) {
    // insert 
    sqlQuery = "INSERT INTO string_description (id, description) values (?, ?)"
    params = [1, 'settings_drawer'];
    this.executeQuery(sqlQuery, params);
  }

  // TODO - update this when above instance is working
  StringsDB.transaction(tx => {
    tx.executeSql('SELECT * FROM string_description WHERE description = ?', description, 
      (txObj, { rows: { _array } }) => console.log('array returned: ' + _array), 
      (txObj, error) => console.log('Error ', error)
      )
  })

  return string_desc_id;
}

// ---------------------------------------------------------------------
// FUNCTION TO GET STRING (ACCESSIBLE IN OTHER FILES WITHIN APP) 
// ---------------------------------------------------------------------
  const getString = function(inputDescription) {
    // TODO - update when Strings.js is working

    var returnString = 'TBD';

    StringsDB.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM strings WHERE description = ?', inputDescription, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        // , returnString = _array.content
        (txObj, { rows: { _array } }) => console.log('array returned: ' + _array), 
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction

    return returnString;
  }

  export default getString;

// ---------------------------------------------------------------------
// FUNCTION TO EXECUTE SQLite QUERY
// ---------------------------------------------------------------------
  executeQuery = (sqlQuery, params) => {     
    console.log('Execute Query Function Call');
    console.log('-------------------------------------');
    console.log('Query: ' + sqlQuery);
    console.log('Parameters: ' + params);

    StringsDB.transaction((txn) => {
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