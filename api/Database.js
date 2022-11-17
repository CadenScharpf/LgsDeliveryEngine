import * as SQLite from 'expo-sqlite';
import { debug } from 'react-native-reanimated';
import { getGlobalLanguage } from '../Language';
import Queries from './Queries'; //!< TABLE SCHEMAS AND QUERY TEMPLATES'
import TestData from './TestData';


// returns Database object
const DatabaseDB = SQLite.openDatabase('DatabaseDB.db') 

let sqlQuery = '';
let params = '';
let date_time = '';
let content_type = '';
let currentId = -1;
let user_id = -1;
let lot_id = -1;  
let geolocation_lat = -1;
let geolocation_lon = -1;
let content_id = -1;
let qrcode_id = -1;

let firstName = '';
let lastName = '';
let email = '';
let password = '';
let accountType = '';
let language = '';
let company = '';

let feedback_text = '';

const debugging_option = true;
const debugging_option_detailed = false;

// ---------------------------------------------------------------------
// CREATE SQLite DATABSE AND TABLES
// ---------------------------------------------------------------------
InitializeDB();

function InitializeDB() {

  params = [];

  // //Delete existing tables
  // for(let tableName of Object.keys(Queries)) {
  //   executeQuery(`DROP TABLE IF EXISTS ${tableName};`, []); 
  //   executeQuery(`CREATE TABLE IF NOT EXISTS ${tableName} ${Queries[tableName].schema};`, []); 
  // }
   sqlQuery = "DROP TABLE IF EXISTS product;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, defaultLabel TEXT, photoURL TEXT, productPageURL TEXT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS product_names;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS product_names (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)";
  executeQuery(sqlQuery, params);

  

  sqlQuery = "DROP TABLE IF EXISTS product_specifications;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS product_specifications (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)";
  executeQuery(sqlQuery, params);

  

  sqlQuery = "DROP TABLE IF EXISTS qrcode;";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS qrcode (id INTEGER PRIMARY KEY AUTOINCREMENT, content_id INTEGER, content_type TEXT)";
  executeQuery(sqlQuery, params);



  sqlQuery = "DROP TABLE IF EXISTS qrscan;";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS qrscan (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, date_time DATE_TIME, geolocation_lat DOUBLE, geolocation_lon DOUBLE, qrcode_id INTEGER)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS user;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, password TEXT, accountType TEXT, language TEXT, company TEXT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS box;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS box (id INTEGER PRIMARY KEY AUTOINCREMENT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS box_contents;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS box_contents (id INTEGER PRIMARY KEY AUTOINCREMENT, box_id INTEGER, quantity_of_products INT, lot_id INTEGER)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS pallet;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS pallet (id INTEGER PRIMARY KEY AUTOINCREMENT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS pallet_contents;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS pallet_contents (id INTEGER PRIMARY KEY AUTOINCREMENT, pallet_id INTEGER, enclosed_box_ids TINYTEXT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS lot;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS lot (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, harvest_date DATE, harvested_by_user_id INTEGER, best_before_date DATE)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS feedback;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, content_type TEXT, content_id INTEGER, date_time DATE_TIME, rating INT, feedback_text TEXT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS settings;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, appVersion TEXT, companyName TEXT, photoURLBanner TEXT, photoURLIcon TEXT, fontAndroid TEXT, fontiOS TEXT, colorPrimary TEXT, colorSecondary TEXT, colorTertiary TEXT, colorBackgroundLight TEXT, colorBackgroundDark TEXT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS recall;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS recall (id INTEGER PRIMARY KEY AUTOINCREMENT, lot_id INTEGER, date_issued DATE, description TEXT, reference_code TEXT)";
  executeQuery(sqlQuery, params);

  // Insert Settings Information
  for(let settingData of TestData.settings) { executeQuery(Queries.settings.insert, settingData); }

  // Insert Recall Information
  for(let recallData of TestData.recall) { executeQuery(Queries.recall.insert, recallData); }
  
  // Insert User Information
  for(let userData of TestData.user) { executeQuery(Queries.user.insert, userData); }
  
  // Insert Product Information
  for(let productData of TestData.products) { executeQuery(Queries.product.insert, productData); }
  for(let productNameData of TestData.product_names) { executeQuery(Queries.product_names.insert, productNameData); }
  for(let productSpecData of TestData.product_specs) { executeQuery(Queries.product_specs.insert, productSpecData); }

  // Insert Lot Information
  for(let lotData of TestData.lot) { executeQuery(Queries.lot.insert, lotData) }
  
  //Insert Box Information
  for(let boxData of TestData.box) { executeQuery(Queries.box.insert, boxData) }

  //Insert Box Content Information
  for(let boxContentData of TestData.box_contents) { executeQuery(Queries.box_contents.insert, boxContentData) }

  // Insert Pallet Information
  for(i=1; i < TestData.pallet.length+1; i++) {
    executeQuery("INSERT INTO pallet (id) values (?)", [i]);    
    executeQuery("INSERT INTO pallet_contents (pallet_id, enclosed_box_ids) values (?, ?)", [i, TestData.pallet[i-1]]); 
  }

  // Insert QrCode Information
  for(let codeData of TestData.qrcode) { executeQuery(Queries.qrcode.insert, codeData) }

  // Insert QrScan Information
  for(let scanData of TestData.qrscan) { executeQuery(Queries.qrscan.insert, scanData) }

  // ---------------------------------------------------------------------
  // ADD ALL FEEDBACK HERE 
  // ---------------------------------------------------------------------
  sqlQuery = "INSERT INTO feedback (user_email, content_type, content_id, date_time, rating, feedback_text) values (?, ?, ?, ?, ?, ?)"

  // pallet/box feedback matching QR Scans test data above

  content_id = 1;
  content_type = 'pallet';

  user_email = 'jose@QuartzsiteFarming.com'; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  rating = 5;
  feedback_text = "great pallet";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);
  
  user_email = 'janesmith@PHXDistribution.com'; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  rating = 5;
  feedback_text = "speed delivery of pallet";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);
  
  user_email = 'johndoe@walmart.com'; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  rating = 4;
  feedback_text = "took longer than expected to arrive";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  content_id = 2;
  content_type = 'box';  

  user_email = 'jose@QuartzsiteFarming.com'; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  rating = 5;
  feedback_text = "sending out a great box";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);
  
  user_email = 'janesmith@PHXDistribution.com'; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  rating = 3;
  feedback_text = "smelled weird";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);
  
  user_email = 'johndoe@walmart.com'; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  rating = 5;
  feedback_text = "good condition box";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  // lot feedback
  content_type = 'lot';

  user_email = 'zale@localgrownsalads.com'; 
  content_id = 1; 
  date_time = '2022-05-31 12:00:00.000';
  rating = 5;
  feedback_text = "great!";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  user_email = 'johndoe@walmart.com'; 
  content_id = 1; 
  date_time = '2022-05-30 12:00:00.000';
  rating = 5;
  feedback_text = "looked great";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  user_email = 'johndoe@walmart.com'; 
  content_id = 2; 
  date_time = '2022-06-01 12:00:00.000';
  rating = 5;
  feedback_text = "delicious!";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  user_email = 'janesmith@PHXDistribution.com'; 
  content_id = 3; 
  date_time = '2022-06-02 12:00:00.000';
  rating = 3;
  feedback_text = "looked wilty";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  user_email = 'zale@localgrownsalads.com'; 
  content_id = 4; 
  date_time = '2022-06-03 12:00:00.000';
  rating = 1;
  feedback_text = "tasted bad";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  // TODO - add more Feedback here
}

// ---------------------------------------------------------------------
// DEFINE ACCESSOR FUNCTIONS
// ---------------------------------------------------------------------

const getQRCodeDetails = async (qrcode_id) => {
  return new Promise((resolve, reject) => {    
    sqlQuery = "SELECT \
                  qrcode.content_type, \
                  qrcode.content_id \
                FROM qrcode \
                WHERE \
                  qrcode.id = " + lot_id + "\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get QR Code Details Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get QR Code Details Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  }); 
}

const checkForRecall = async (lot_id) => {
  return new Promise((resolve, reject) => {    
    sqlQuery = "SELECT \
                  * \
                FROM recall \
                WHERE \
                  lot_id = " + lot_id
              ;
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Check for Recall Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Check for Recall Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  }); 
}

const getLotDetails = async (lot_id) => {
  return new Promise((resolve, reject) => {    
    sqlQuery = "SELECT \
                  lot.product_id, \
                  lot.harvest_date as harvestDate, \
                  lot.best_before_date as bestBeforeDate, \
                  user.firstName || ' ' || user.lastName as harvestedBy, \
                  user.company as Farm \
                FROM lot \
                  LEFT JOIN user ON lot.harvested_by_user_id = user.id \
                WHERE \
                  lot.id = " + lot_id
              ;
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get Lot Details Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get Lot Details Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  }); 
}

const getAllQRScans = async (qrcode_id) => {
  return new Promise((resolve, reject) => {    
    sqlQuery = "SELECT \
                  qrscan.id, \
                  qrscan.date_time, \
                  qrscan.geolocation_lat, \
                  qrscan.geolocation_lon, \
                  user.email as user_email, \
                  user.firstName || ' ' || user.lastName as user_scanned, \
                  user.accountType, \
                  user.company \
                FROM qrscan \
                  LEFT JOIN user ON qrscan.user_email = user.email \
                WHERE \
                  qrscan.qrcode_id = " + qrcode_id + "\
                ORDER BY \
                  qrscan.date_time DESC \
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        if (debugging_option_detailed) {
            console.log("Get All QR Scans SUCCESS - Query:" + sqlQuery);
            console.log('Get All QR Scans Parameters: ' + params);
            console.log("Get All QR Scans Results (JSON): " + JSON.stringify(results));
            console.log("Get All QR Scans Transaction (JSON): " + JSON.stringify(trans));
            console.log("Get All QR Scans _array: " + JSON.stringify(results.rows._array));    
            console.log("Get All QR Scans _array[0]: " + JSON.stringify(results.rows._array[0]));
        }

        if (debugging_option) {
          console.log("Get All QR Scans _array: " + JSON.stringify(results.rows._array));    
        }

        // what you resolve here is what will be the result of
        // await function call
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get All QR Scans Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get All QR Scans Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const checkSignIn = async (email_input, password_input) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                    * \
                  FROM user \
                  WHERE \
                    email like \"" + email_input + "\" \
                    AND password = '" + password_input + "'";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        if (debugging_option) {
          console.log("Get All Users By Account Type _array: " + JSON.stringify(results.rows._array));    
        }

        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get All Users Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get All Users Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const getAllUsersByAccountType = async (accountType) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                    * \
                  FROM user \
                    WHERE \
                      accountType like \"" + accountType + "\"";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        if (debugging_option) {
          console.log("Get All Users By Account Type _array: " + JSON.stringify(results.rows._array));    
        }

        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get All Users Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get All Users Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const getAppSettings = async (appVersion) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                    * \
                  FROM settings \
                    WHERE \
                      appVersion like \"" + appVersion + "\"";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        if (debugging_option) {
          console.log("Get Settings Type _array: " + JSON.stringify(results.rows._array));    
        }

        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get Settings Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get Settings Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT * FROM user";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        if (debugging_option) {
          console.log("Get All Users _array: " + JSON.stringify(results.rows._array));    
        }

        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get All Users Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get All Users Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const getPalletDetails = async (pallet_id) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  * \
                FROM pallet_contents \
                WHERE \
                  pallet_contents.pallet_id = " + pallet_id + "\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => { 
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get getPalletDetails Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        
        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const getBoxDetails = async (box_id) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  * \
                FROM box_contents \
                WHERE \
                  box_contents.box_id = " + box_id + "\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {         
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get getBoxDetails Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        
        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const getProductDetails = async (product_id) => {
  inputLanguage = getGlobalLanguage();
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  product.id, \
                  product.defaultLabel, \
                  product.photoURL, \
                  product.productPageURL, \
                  product_names.content AS product_name, \
                  product_specifications.content AS product_specification \
                FROM product \
                  LEFT JOIN product_names ON product.id = product_names.product_id \
                  LEFT JOIN product_specifications ON product.id = product_specifications.product_id \
                WHERE \
                  product.id = " + product_id + "\
                  AND product_names.language like '" + inputLanguage + "'\
                  AND product_specifications.language like '" + inputLanguage + "'\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        if (debugging_option_detailed) {
            console.log("Get Product Details SUCCESS - Query:" + sqlQuery);
            console.log('Get Product Details Parameters: ' + params);
            console.log("Get Product Details Results (JSON): " + JSON.stringify(results));
            console.log("Get Product Details Transaction (JSON): " + JSON.stringify(trans));
            console.log("Get Product Details _array: " + JSON.stringify(results.rows._array));    
            console.log("Get Product Details _array[0]: " + JSON.stringify(results.rows._array[0]));
        }

        if (debugging_option) {
          console.log("Get All Product Details _array: " + JSON.stringify(results.rows._array));    
        }

        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get Product Details Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get Product Details Execute Error: " + error);
        
        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const getAllProducts = async () => {
  inputLanguage = getGlobalLanguage();
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  product.id, \
                  product.defaultLabel, \
                  product.photoURL, \
                  product.productPageURL, \
                  product_names.content AS product_name, \
                  product_specifications.content AS product_specification \
                FROM product \
                  LEFT JOIN product_names ON product.id = product_names.product_id \
                  LEFT JOIN product_specifications ON product.id = product_specifications.product_id \
                WHERE \
                  product_names.language like '" + inputLanguage + "'\
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

        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get All Products Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get All Products Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
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

        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array[0].id) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get Product ID Execute Error: |" + sqlQueryProductId + "|" + params + "|" + JSON.stringify(error));
        console.log("Get Product ID Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
  }

  const getUserId = async (email_input) => {
    return new Promise((resolve, reject) => {
      var sqlQueryUserId = "SELECT \
                              user.id \
                            FROM user \
                            WHERE \
                              user.email like '" + email_input + "'\
                ";
      params = [];  
  
      DatabaseDB.transaction((txn) => {
        txn.executeSql(sqlQueryUserId, params, (trans, results) => {
          resolve(results.rows._array[0].id);
        },
          (error) => {
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
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Delete Product Execute Error: |" + sqlQueryDeleteProduct + "|" + params + "|" + JSON.stringify(error));
        console.log("Delete Product Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const addFeedback = async (user_email, content_type, content_id, date_time, rating, feedback_text) => {

  sqlQuery = "INSERT INTO feedback (user_email, content_type, content_id, date_time, rating, feedback_text) values (?, ?, ?, ?, ?, ?)";
  params = [user_email, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);    

  return new Promise((resolve, reject) => {
    let response_code = "200";
    var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
    resolve(ReturnObject);
  });  
}

const updateFeedback = async (feedback_id, date_time, rating, feedback_text) => {

  sqlQuery = "UPDATE feedback \
                SET \
                  date_time = '"+ date_time + "',\
                  rating = "+ rating + ",\
                  feedback_text = '" + feedback_text + "'\
                WHERE \
                  feedback.id = " + feedback_id;
  params = [];
  executeQuery(sqlQuery, params);    

  return new Promise((resolve, reject) => {
    let response_code = "200";
    var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
    resolve(ReturnObject);
  });  
}

const updateLanguage = async (email, inputLanguage) => {

  sqlQuery = "UPDATE user \
                SET \
                  language = '"+ inputLanguage + "'\
                WHERE \
                  user.email = '" + email + "'";
  params = [];
  executeQuery(sqlQuery, params);    

  return new Promise((resolve, reject) => {
    let response_code = "200";
    var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
    resolve(ReturnObject);
  });  
}

const getFeedbackByContentUserId = async (content_type, content_id, user_email) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  feedback.id as feedback_id, \
                  feedback.user_email, \
                  feedback.content_type, \
                  feedback.content_id, \
                  feedback.date_time, \
                  feedback.rating, \
                  feedback.feedback_text \
                FROM feedback \
                WHERE \
                  feedback.content_type = '" + content_type + "'\
                  AND feedback.content_id = " + content_id + "\
                  AND feedback.user_email = '" + user_email + "'"
              ;
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array) + "}";
        resolve(ReturnObject);
      },
        (error) => {
        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const addQRCodeScan = async (qrcode_id, date_time, geolocation_lat, geolocation_lon, user_email) => {

  sqlQuery = "INSERT INTO qrscan (user_email, date_time, geolocation_lat, geolocation_lon, qrcode_id) values (?, ?, ?, ?, ?)";
  params = [user_email, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    

  return new Promise((resolve, reject) => {
    let response_code = "200";
    var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
    resolve(ReturnObject);
  });  
}

const getUserDetails = async (email) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                    * \
                  FROM user \
                  WHERE \
                    user.email like '" + email + "'\
    ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuery, params, (trans, results) => {        
        if (debugging_option) {
          console.log("Get User Details _array: " + JSON.stringify(results.rows._array));    
        }

        let response_code = "200";
        var ReturnObject = results.rows._array;
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get User Details Execute Error: |" + sqlQueryProductId + "|" + params + "|" + JSON.stringify(error));
        console.log("Get User Details Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const addProduct = async (defaultLabel, photoURL, productPageURL, product_names, product_specifications) => {

  sqlQuery = "INSERT INTO product (defaultLabel, photoURL, productPageURL) values (?, ?)"
  params = [defaultLabel, photoURL, productPageURL];
  executeQuery(sqlQuery, params);  

  // get product id from default label
  currentId = -1;
  await getProductId(defaultLabel).then((result) => {
    console.log('Get Product ID Then: ' + result);
    currentId = result.output;
  }).catch((error) => {
    console.log('Get Product ID Error: ' + error);
  });
  
  // loop thro' all product descriptions and insert
  var subArray;
  var language = '';
  var content = '';
  for (var key in product_names) {
    subArray = product_names[key];
    language = subArray.language;
    content = subArray.content;
    if (debugging_option) {
      console.log("language " + language + " has value " + content);
    }

    sqlQuery = "INSERT INTO product_names (product_id, language, content) values (?, ?, ?)"
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

const addUser = async (firstName_input, lastName_input, email_input, password_input, accountType_input, language_input, company_input) => {

  sqlQuery = "INSERT INTO user (firstName, lastName, email, password, accountType, language, company) values (?, ?, ?, ?, ?, ?, ?)"
  params = [firstName_input, lastName_input, email_input, password_input, accountType_input, language_input, company_input];
  executeQuery(sqlQuery, params);

  var currentId = -1;
  await getUserId(email_input).then((result) => {
    console.log('Get User ID Then: ' + result);
    currentId = result.output;
  }).catch((error) => {
    console.log('Get User ID Error: ' + error);
  });
  
  // NOTE: no longer returning user ID (currentId) because of a sync issue
  return new Promise((resolve, reject) => {
    let response_code = "200";
    var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
    resolve(ReturnObject);
  }); 
}

/*const addRecall = async (lot_id_input,date_issued_input,description_input,reference_code_input,status_input) =>{
  sqlQuery = "INSERT INTO recall (lot_id, date_issued, description, reference_code, status) values (?, ?, ?, ?, ?)"
  params = [lot_id_input,date_issued_input,description_input,reference_code_input,status_input];
  executeQuery(sqlQuery, params);

  return new Promise((resolve, reject) => {
    let response_code = "200";
    var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
    resolve(ReturnObject);
  });  

}

const getRecallById = async(lot_id)=>{
  return new Promise((resolve, reject) => {
    var sqlQuerylotId = "SELECT * \
                          FROM recall \
                          WHERE \
                            recall.lot_id = '" + lot_id + "'\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuerylotId, params, (trans, results) => {
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array[0] || '{}') + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get Product ID Execute Error: |" + sqlQuerylotId + "|" + params + "|" + JSON.stringify(error));
        console.log("Get Product ID Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const getAllRecall =  async()=>{
  return new Promise((resolve, reject) => {
    var sqlQuerylotId = "SELECT * \
                          FROM recall\
              ";
    params = [];  

    DatabaseDB.transaction((txn) => {
      txn.executeSql(sqlQuerylotId, params, (trans, results) => {
        let response_code = "200";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(results.rows._array || '[]') + "}";
        resolve(ReturnObject);
      },
        (error) => {
        console.log("Get Product ID Execute Error: |" + sqlQuerylotId + "|" + params + "|" + JSON.stringify(error));
        console.log("Get Product ID Execute Error: " + error);

        let response_code = "400";
        var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": " + JSON.stringify(error) + "}";
        reject(ReturnObject)
      });
    });
  });  
}

const updateRecallStatus = async (lot_id,inputStatus) => {

  sqlQuery = "UPDATE recall \
                SET \
                  status = '"+ inputStatus + "'\
                WHERE \
                  recall.lot_id = '" + lot_id + "'";
  params = [];
  executeQuery(sqlQuery, params);    

  return new Promise((resolve, reject) => {
    let response_code = "200";
    var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
    resolve(ReturnObject);
  });  
}*/

// TODO - define additional accessors here

// ---------------------------------------------------------------------
// EXPORT ACCESSOR FUNCTIONS HERE
// ---------------------------------------------------------------------

// TODO - export additional accessors here
export {checkForRecall, getUserDetails, getAppSettings, addFeedback, updateLanguage, updateFeedback, getFeedbackByContentUserId, getQRCodeDetails, addUser, checkSignIn, getLotDetails, getAllProducts, deleteProduct, addProduct, addQRCodeScan, getAllQRScans, getAllUsers, getAllUsersByAccountType, getPalletDetails, getBoxDetails, getProductDetails, getProductId, /*addRecall, getRecallById, updateRecallStatus, getAllRecall*/};

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