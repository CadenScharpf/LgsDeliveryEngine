import * as SQLite from 'expo-sqlite';
import { debug } from 'react-native-reanimated';

// returns Database object
const DatabaseDB = SQLite.openDatabase('DatabaseDB.db') 

let sqlQuery = '';
let params = '';
let date_time = '';
let content_type = '';
let currentId = -1;
let user_id = -1;  
let geolocation_lat = -1;
let geolocation_lon = -1;
let content_id = -1;

let firstName = '';
let lastName = '';
let email = '';
let password = '';
let accountType = '';
let language = '';
let company = '';

const debugging_option = true;
const debugging_option_detailed = false;

// ---------------------------------------------------------------------
// CREATE SQLite DATABSE AND TABLES
// ---------------------------------------------------------------------
InitializeDB();

function InitializeDB() {

  params = [];

  // TODO - do we need an item table that uses product as a type and includes a harvest date so we can know best before date based on standard best before days for product?

  sqlQuery = "DROP TABLE IF EXISTS product;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, defaultLabel TEXT, bestBeforeDays DATE)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS product_descriptions;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS product_descriptions (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)";
  executeQuery(sqlQuery, params);

  

  sqlQuery = "DROP TABLE IF EXISTS product_specifications;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS product_specifications (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)";
  executeQuery(sqlQuery, params);

  

  sqlQuery = "DROP TABLE IF EXISTS qrscan;";
  executeQuery(sqlQuery, params);

  sqlQuery = "CREATE TABLE IF NOT EXISTS qrscan (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, date_time DATE_TIME, geolocation_lat DOUBLE, geolocation_lon DOUBLE, content_id INTEGER, content_type TEXT)";
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

  sqlQuery = "CREATE TABLE IF NOT EXISTS box_contents (id INTEGER PRIMARY KEY AUTOINCREMENT, box_id INTEGER, product_id INTEGER, quantity INT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS pallet;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS pallet (id INTEGER PRIMARY KEY AUTOINCREMENT)";
  executeQuery(sqlQuery, params);


  
  sqlQuery = "DROP TABLE IF EXISTS pallet_contents;";
  executeQuery(sqlQuery, params); 

  sqlQuery = "CREATE TABLE IF NOT EXISTS pallet_contents (id INTEGER PRIMARY KEY AUTOINCREMENT, pallet_id INTEGER, box_id INTEGER, quantity INT)";
  executeQuery(sqlQuery, params);

  // ---------------------------------------------------------------------
  // ADD ALL USERS HERE 
  // ---------------------------------------------------------------------
  sqlQuery = "INSERT INTO user (id, firstName, lastName, email, password, accountType, language, company) values (?, ?, ?, ?, ?, ?, ?, ?)"

  user_id = 1; 
  firstName = 'Zale';
  lastName = 'Tabakman';
  email = 'zale@localgrownsalads.com';
  password = 'LGS1';
  accountType = 'consumer';
  language = 'english';
  company = 'Consumer';
  params = [user_id, firstName, lastName, email, password, accountType, language, company];
  executeQuery(sqlQuery, params);

  user_id = 2; 
  firstName = 'John';
  lastName = 'Doe';
  email = 'johndoe@walmart.com';
  password = 'LGS2';
  accountType = 'retailer';
  language = 'english';
  company = 'Walmart';
  params = [user_id, firstName, lastName, email, password, accountType, language, company];
  executeQuery(sqlQuery, params);

  user_id = 3; 
  firstName = 'Jane';
  lastName = 'Smith';
  email = 'janesmith@PHXDistribution.com';
  password = 'LGS3';
  accountType = 'distributor';
  language = 'english';
  company = 'PHXDistribution';
  params = [user_id, firstName, lastName, email, password, accountType, language, company];
  executeQuery(sqlQuery, params);

  user_id = 4; 
  firstName = 'Jose';
  lastName = 'Rodriguez';
  email = 'jose@QuartzsiteFarming.com';
  password = 'LGS4';
  accountType = 'farmer';
  language = 'spanish';
  company = 'QuartzsiteFarming';
  params = [user_id, firstName, lastName, email, password, accountType, language, company];
  executeQuery(sqlQuery, params);
  
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
  params = [currentId, 'spanish', 'Tomate'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant.'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'El tomate es la baya comestible de la planta Solanum lycopersicum, comúnmente conocida como planta de tomate.'];
  executeQuery(sqlQuery, params);

  currentId = 2;
  sqlQuery = "INSERT INTO product (id, defaultLabel, bestBeforeDays) values (?, ?, ?)"
  params = [currentId, 'cucumber', '28'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Cucumber'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Pepino'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Cucumber (Cucumis sativus) is a widely-cultivated creeping vine plant in the Cucurbitaceae family that bears usually cylindrical fruits.'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'El pepino (Cucumis sativus) es una planta de enredadera rastrera ampliamente cultivada de la familia de las cucurbitáceas que suele dar frutos cilíndricos.'];
  executeQuery(sqlQuery, params);

  currentId = 3;
  sqlQuery = "INSERT INTO product (id, defaultLabel, bestBeforeDays) values (?, ?, ?)"
  params = [currentId, 'crouton', '28'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_descriptions (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Crouton'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Crutones'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'A crouton is a piece of rebaked bread, often cubed and seasoned.'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Un picatostes es un trozo de pan horneado, a menudo cortado en cubos y sazonado.'];
  executeQuery(sqlQuery, params);

  // TODO - add more products here

  // ---------------------------------------------------------------------
  // ADD ALL BOXES HERE 
  // ---------------------------------------------------------------------

  currentId = 1;
  sqlQuery = "INSERT INTO box (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO box_contents (box_id, product_id, quantity) values (?, ?, ?)"
  params = [currentId, 1, 3];
  executeQuery(sqlQuery, params);   
  params = [currentId, 2, 1];
  executeQuery(sqlQuery, params);   
  params = [currentId, 3, 5];  
  executeQuery(sqlQuery, params);
  
  currentId = 2;
  sqlQuery = "INSERT INTO box (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO box_contents (box_id, product_id, quantity) values (?, ?, ?)"
  params = [currentId, 1, 1];
  executeQuery(sqlQuery, params);    
  params = [currentId, 3, 2];  
  executeQuery(sqlQuery, params);
  
  currentId = 3;
  sqlQuery = "INSERT INTO box (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO box_contents (box_id, product_id, quantity) values (?, ?, ?)"
  params = [currentId, 1, 5];
  executeQuery(sqlQuery, params);   
  params = [currentId, 2, 3];
  executeQuery(sqlQuery, params);   
  params = [currentId, 3, 1];  
  executeQuery(sqlQuery, params);

  // TODO - add more boxes here

  // ---------------------------------------------------------------------
  // ADD ALL PALLETS HERE 
  // ---------------------------------------------------------------------

  currentId = 1;
  sqlQuery = "INSERT INTO pallet (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO pallet_contents (pallet_id, box_id, quantity) values (?, ?, ?)"
  params = [currentId, 1, 3];
  executeQuery(sqlQuery, params);   
  params = [currentId, 2, 1];
  executeQuery(sqlQuery, params);   
  params = [currentId, 3, 5];  
  executeQuery(sqlQuery, params);
  
  currentId = 2;
  sqlQuery = "INSERT INTO pallet (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO pallet_contents (pallet_id, box_id, quantity) values (?, ?, ?)"
  params = [currentId, 1, 1];
  executeQuery(sqlQuery, params);    
  params = [currentId, 3, 2];  
  executeQuery(sqlQuery, params);
  
  currentId = 3;
  sqlQuery = "INSERT INTO pallet (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO pallet_contents (pallet_id, box_id, quantity) values (?, ?, ?)"
  params = [currentId, 1, 5];
  executeQuery(sqlQuery, params);   
  params = [currentId, 2, 3];
  executeQuery(sqlQuery, params);   
  params = [currentId, 3, 1];  
  executeQuery(sqlQuery, params);

  // TODO - add more pallets here

  // ---------------------------------------------------------------------
  // ADD ALL QR SCANS HERE 
  // ---------------------------------------------------------------------
  sqlQuery = "INSERT INTO qrscan (user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type) values (?, ?, ?, ?, ?, ?)"

  content_id = 1;
  content_type = 'product';

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-07-21 12:00:00.000';
  geolocation_lat = 33.695;
  geolocation_lon = -114.204;
  params = [1, 'test', 'test'];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-07-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-07-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-07-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    

  content_id = 2;
  content_type = 'product';

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-08-21 12:00:00.000';
  geolocation_lat = 33.694877853650866;
  geolocation_lon = -114.2038716512168;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-08-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-08-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-08-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    

  content_id = 3;
  content_type = 'product';

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  geolocation_lat = 33.694877853650866;
  geolocation_lon = -114.2038716512168;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-05-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    

  content_id = 1;
  content_type = 'pallet';

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  geolocation_lat = 33.694877853650866;
  geolocation_lon = -114.2038716512168;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-05-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    

  content_id = 2;
  content_type = 'box';

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  geolocation_lat = 33.694877853650866;
  geolocation_lon = -114.2038716512168;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-05-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, content_id, content_type];
  executeQuery(sqlQuery, params);    
  
  // TODO - add more QR scans here

}

// ---------------------------------------------------------------------
// DEFINE ACCESSOR FUNCTIONS
// ---------------------------------------------------------------------

const getAllQRScans = async (content_id, content_type) => {
  return new Promise((resolve, reject) => {    
    sqlQuery = "SELECT \
                  qrscan.id, \
                  qrscan.date_time, \
                  qrscan.geolocation_lat, \
                  qrscan.geolocation_lon, \
                  qrscan.user_id, \
                  user.firstName || ' ' || user.lastName as user_scanned, \
                  user.accountType, \
                  user.company \
                FROM qrscan \
                  LEFT JOIN user ON qrscan.user_id = user.id \
                WHERE \
                  qrscan.content_id = " + content_id + "\
                  AND qrscan.content_type like '" + content_type + "'\
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
        resolve(JSON.stringify(results.rows._array));
      },
        (error) => {
        console.log("Get All QR Scans Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get All QR Scans Execute Error: " + error);

        reject(error)
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

        // what you resolve here is what will be the result of
        // await function call  
        resolve(JSON.stringify(results.rows._array));
      },
        (error) => {
        console.log("Get All Users Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get All Users Execute Error: " + error);

        reject(error)
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
        resolve(JSON.stringify(results.rows._array));
      },
        (error) => {
        console.log("Get getPalletDetails Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        reject(error)
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
        resolve(JSON.stringify(results.rows._array));
      },
        (error) => {
        console.log("Get getBoxDetails Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        reject(error)
      });
    });
  });  
}

const getProductDetails = async (product_id, inputLanguage) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  product.id, \
                  product.defaultLabel, \
                  product.bestBeforeDays, \
                  product_descriptions.content AS product_description, \
                  product_specifications.content AS product_specification \
                FROM product \
                  LEFT JOIN product_descriptions ON product.id = product_descriptions.product_id \
                  LEFT JOIN product_specifications ON product.id = product_specifications.product_id \
                WHERE \
                  product.id = " + product_id + "\
                  AND product_descriptions.language like '" + inputLanguage + "'\
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

        // what you resolve here is what will be the result of
        // await function call  
        resolve(JSON.stringify(results.rows._array));
      },
        (error) => {
        console.log("Get Product Details Execute Error: |" + sqlQuery + "|" + params + "|" + JSON.stringify(error));
        console.log("Get Product Details Execute Error: " + error);

        reject(error)
      });
    });
  });  
}

const getAllProducts = async (inputLanguage) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  product.id, \
                  product.defaultLabel, \
                  product.bestBeforeDays, \
                  product_descriptions.content AS product_description, \
                  product_specifications.content AS product_specification \
                FROM product \
                  LEFT JOIN product_descriptions ON product.id = product_descriptions.product_id \
                  LEFT JOIN product_specifications ON product.id = product_specifications.product_id \
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
export {getAllProducts, deleteProduct, addProduct, getAllQRScans, getAllUsers, getPalletDetails, getBoxDetails, getProductDetails};

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