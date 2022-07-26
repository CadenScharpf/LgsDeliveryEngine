import * as SQLite from 'expo-sqlite';
import { debug } from 'react-native-reanimated';

// returns Database object
const DatabaseDB = SQLite.openDatabase('DatabaseDB.db') 

let sqlQuery = '';
let params = '';
let currentId = -1;

const debugging_option = true;
const debugging_option_detailed = false;

// ---------------------------------------------------------------------
// CREATE SQLite DATABSE AND TABLES
// ---------------------------------------------------------------------
InitializeDB();

function InitializeDB() {

  params = [];

  // TODO - do we need an item table that uses product as a type and includes a harvest date so we can know best before date based on standard best before days for product?

  sqlQuery = "CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, defaultLabel TEXT, bestBeforeDays DATE)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM product";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS product_descriptions (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM product_descriptions";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS product_specifications (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM product_specifications";
  executeQuery(sqlQuery, params);

  // TODO - define userID as optional (default null)
  sqlQuery = "CREATE TABLE IF NOT EXISTS qrscan (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, date_time DATE_TIME, geolocation TEXT)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM qrscan";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, password TEXT, accountType TEXT, language TEXT)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM user";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS box (id INTEGER PRIMARY KEY AUTOINCREMENT)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM box";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS box_contents (id INTEGER PRIMARY KEY AUTOINCREMENT, box_id INTEGER, product_id INTEGER, quantity INT)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM box_contents";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS pallet (id INTEGER PRIMARY KEY AUTOINCREMENT)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM pallet";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS pallet_contents (id INTEGER PRIMARY KEY AUTOINCREMENT, pallet_id INTEGER, box_id INTEGER, quantity INT)";
  executeQuery(sqlQuery, params);

  sqlQuery = "DELETE FROM pallet_contents";
  executeQuery(sqlQuery, params);

  // ---------------------------------------------------------------------
  // ADD ALL USERS HERE 
  // ---------------------------------------------------------------------

  // TODO

  // TODO - add more users here

  // ---------------------------------------------------------------------
  // ADD ALL PRODUCTS HERE 
  // ---------------------------------------------------------------------

  currentId = 1;
  sqlQuery = "INSERT INTO product (id, defaultLabel, bestBeforeDays) values (?, ?, ?)"
  params = [currentId, 'tomato', '14'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Tomato'];
  executeQuery(sqlQuery, params);   
  sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'spanish', 'Tomate'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant.'];
  executeQuery(sqlQuery, params);   
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'spanish', 'El tomate es la baya comestible de la planta Solanum lycopersicum, comúnmente conocida como planta de tomate.'];
  executeQuery(sqlQuery, params);

  currentId = 2;
  sqlQuery = "INSERT INTO product (id, defaultLabel, bestBeforeDays) values (?, ?, ?)"
  params = [currentId, 'cucumber', '28'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Cucumber'];
  executeQuery(sqlQuery, params);   
  sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'spanish', 'Pepino'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Cucumber (Cucumis sativus) is a widely-cultivated creeping vine plant in the Cucurbitaceae family that bears usually cylindrical fruits.'];
  executeQuery(sqlQuery, params);   
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'spanish', 'El pepino (Cucumis sativus) es una planta de enredadera rastrera ampliamente cultivada de la familia de las cucurbitáceas que suele dar frutos cilíndricos.'];
  executeQuery(sqlQuery, params);

  currentId = 3;
  sqlQuery = "INSERT INTO product (id, defaultLabel, bestBeforeDays) values (?, ?, ?)"
  params = [currentId, 'crouton', '28'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Crouton'];
  executeQuery(sqlQuery, params);   
  sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'spanish', 'Crutones'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'A crouton is a piece of rebaked bread, often cubed and seasoned.'];
  executeQuery(sqlQuery, params);   
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'spanish', 'Un picatostes es un trozo de pan horneado, a menudo cortado en cubos y sazonado.'];
  executeQuery(sqlQuery, params);

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

}

// ---------------------------------------------------------------------
// DEFINE ACCESSOR FUNCTIONS
// ---------------------------------------------------------------------

const getAllProducts = async (inputLanguage) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  product.id, \
                  product.defaultLabel, \
                  product.bestBeforeDays, \
                  product_descriptions.content as product_description, \
                  product_specifications.content as product_specification \
                FROM product \
                  LEFT JOIN product_descriptions on product.id = product_descriptions.product_id \
                  LEFT JOIN product_specifications on product.id = product_specifications.product_id \
                WHERE \
                  product_descriptions.language like '" + inputLanguage + "'\
                  AND product_specifications.language like '" + inputLanguage + "'\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        if (debugging_option_detailed) {
            console.log("Get All Products SUCCESS - Query:" + sqlQuery);
            console.log('Get All Products Parameters: ' + params);
            console.log("Get All Products Results (JSON): " + JSON.stringify(results));
            console.log("Get All Products Transaction (JSON): " + JSON.stringify(trans));
            console.log("Get All Products _array: " + JSON.stringify(results.rows._array));    
            console.log("Get All Products _array[0]: " + JSON.stringify(results.rows._array[0]));
        }

        if (debugging_option) {
          console.log("Get All Products _array: " + JSON.stringify(results.rows._array));    
        }

        // what you resolve here is what will be the result of
        // await function call  
        resolve(JSON.stringify(results.rows._array));
      },
        (error) => {
        console.log("Get All Products Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get All Products Execute Error: " + error);

        reject(error)
      });
    });
  });  
}

const getProductId = async (defaultLabel) => {
  if (debugging_option) {
    console.log("Get Product ID Function Called: " + defaultLabel);    
  }

  return new Promise((resolve, reject) => {
    var sqlQueryProductId = "SELECT \
                  product.id \
                FROM product \
                WHERE \
                  product.defaultLabel = '" + defaultLabel + "'\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQueryProductId, params, (trans, results) => {
        if (debugging_option) {
          console.log("Get Product ID sqlQuery: " + sqlQueryProductId);  
          console.log("Get Product ID results: " + JSON.stringify(results));    
        }

        // what you resolve here is what will be the result of
        // await function call  
        resolve(JSON.stringify(results.rows._array[0].id));
      },
        (error) => {
        console.log("Get Product ID Execute Error: |" + sqlQueryProductId + "|" + params + "|" + JSON.stringify(error));
        console.log("Get Product ID Execute Error: " + error);

        reject(error)
      });
    });
  });  
  }

const deleteProduct = async (product_id) => {
  return new Promise((resolve, reject) => {
    var sqlQueryDeleteProduct = "DELETE FROM product \
                WHERE \
                  id = " + product_id + "\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQueryDeleteProduct, params, (trans, results) => {      
        // what you resolve here is what will be the result of
        // await function call  
        resolve('success');
      },
        (error) => {
        console.log("Delete Product Execute Error: |" + sqlQueryDeleteProduct + "|" + params + "|" + JSON.stringify(error));
        console.log("Delete Product Execute Error: " + error);

        reject(error)
      });
    });
  });  
}

const addProduct = async (defaultLabel, bestBeforeDays, product_descriptions, product_specifications) => {

  sqlQuery = "INSERT INTO product (defaultLabel, bestBeforeDays) values (?, ?)"
  params = [defaultLabel, bestBeforeDays];
  executeQuery(sqlQuery, params);  

  // get product id from default label
  currentId = -1;
  await getProductId(defaultLabel).then((result) => {
    console.log('Get Product ID Then: ' + result);
    currentId = result;
  }).catch((error) => {
    console.log('Get Product ID Error: ' + error);
  });
  
  // loop thro' all product descriptions and insert
  var subArray;
  var language = '';
  var content = '';
  for (var key in product_descriptions) {
    subArray = product_descriptions[key];
    language = subArray.language;
    content = subArray.content;
    if (debugging_option) {
      console.log("language " + language + " has value " + content);
    }

    sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
    params = [currentId, language, content];
    executeQuery(sqlQuery, params);   
  }  
  
  // loop thro' all product specifications and insert
  for (var key in product_specifications) {
    subArray = product_specifications[key];
    language = subArray.language;
    content = subArray.content;
    if (debugging_option) {
      console.log("language " + language + " has value " + content);
    }

    sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
    params = [currentId, language, content];
    executeQuery(sqlQuery, params);   
  }  

  return new Promise((resolve, reject) => {
    resolve('success');
  });  
}


// TODO - define additional accessors here


// ---------------------------------------------------------------------
// EXPORT ACCESSOR FUNCTIONS HERE
// ---------------------------------------------------------------------

// TODO - export additionla accessors here
export {getAllProducts, deleteProduct, addProduct};


// ---------------------------------------------------------------------
// FUNCTION TO EXECUTE SQLite QUERY
// ---------------------------------------------------------------------
function executeQuery(sqlQuery, params) {     
  if (debugging_option_detailed) {
    console.log('Execute Query Function Call');
    console.log('-------------------------------------');
    console.log('Query: ' + sqlQuery);
    console.log('Parameters: ' + params);
  }

  DatabaseDB.transaction((txn) => {
    txn.executeSql(sqlQuery, params, (trans, results) => {
      if (debugging_option_detailed) {
        console.log("SUCCESS - Query: " + sqlQuery);
        console.log("Parameters: " + params);
        console.log("Results: " + results);
        console.log("Results (JSON): " + JSON.stringify(results));
        console.log("Transaction: " + trans);
        console.log("Transaction (JSON): " + JSON.stringify(trans));
      }
    },
        (error) => {
        console.log("Execute error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
    });
  });
  
  if (debugging_option_detailed) {
    console.log(' ');
    console.log(' ');
  }
}