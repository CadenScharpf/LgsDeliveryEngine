import * as SQLite from 'expo-sqlite';
import { debug } from 'react-native-reanimated';
import { getGlobalLanguage } from '../Language';
import TABLES from './Queries'; //!< TABLE SCHEMAS AND QUERY TEMPLATES'
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

  //Delete existing tables
  for(let table of Object.keys(TABLES)) {
    executeQuery(`DROP TABLE IF EXISTS ${table};`, []); 
    executeQuery(`CREATE TABLE IF NOT EXISTS ${table} ${TABLES[table].schema};`, []); 
  }



  // ---------------------------------------------------------------------
  // ADD ALL SETTINGS HERE 
  // ---------------------------------------------------------------------

  sqlQuery = "INSERT INTO settings (appVersion, companyName, photoURLBanner, photoURLIcon, fontAndroid, fontiOS, colorPrimary, colorSecondary, colorTertiary, colorBackgroundLight, colorBackgroundDark) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  params = ["1.0","LGS","https://i2.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/lfs-logo-tight-crop-e1454958460180.png?fit=190%2C69&ssl=1","https://i2.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/cropped-cropped-lfs-logo0-1-2-e1649170913225.png?fit=71%2C71&ssl=1","Roboto","San Francisco","282A36","8A8888","EEEEEE","FFFFFF","282A36"];
  executeQuery(sqlQuery, params);

  params = ["2.0","Philly's Farm","https://previews.123rf.com/images/newdesignillustrations/newdesignillustrations1902/newdesignillustrations190211430/125451478-generic-text-on-a-ribbon-designed-with-white-caption-and-blue-tape-vector-banner-with-generic-tag-on.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYbEvXUTDdZ-f6eqGOMcR_KmEDSDcCBsRMQ&usqp=CAU","Montserrat","Montserrat","F54021","EFA94A","EEEEEE","FFFFFF","F54021"];
  executeQuery(sqlQuery, params);
  
  params = ["3.0","Hardee Greens","https://images.squarespace-cdn.com/content/v1/5f5a93f868913475d06130f4/1601663134422-WFW88W9AZ04T55WTTIG6/HF_LOGO_KO.png?format=1500w","https://previews.123rf.com/images/newdesignillustrations/newdesignillustrations1902/newdesignillustrations190211430/125451478-generic-text-on-a-ribbon-designed-with-white-caption-and-blue-tape-vector-banner-with-generic-tag-on.jpg","Open Sans","Open Sans","8ABB50","006681","EEEEEE","FFFFFF","8ABB50"];
  executeQuery(sqlQuery, params);

  // TODO - add more settings

  // ---------------------------------------------------------------------
  // ADD ALL RECALLED LOTS HERE 
  // ---------------------------------------------------------------------
  sqlQuery = "INSERT INTO recall (lot_id, date_issued, description, reference_code) values (?, ?, ?, ?)"

  lot_id = 1;
  params = [lot_id, '2022-10-01', 'E. coli detected', 'XYZ123'];
  executeQuery(sqlQuery, params);

  lot_id = 3;
  params = [lot_id, '2022-11-01', 'Salmonella detected', 'ABC456'];
  executeQuery(sqlQuery, params);

  // TODO - add more recalls

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
  email = 'a@b.com';
  password = 'a';
  accountType = 'farmer';
  language = 'spanish';
  company = 'QuartzsiteFarming';
  params = [user_id, firstName, lastName, email, password, accountType, language, company];
  executeQuery(sqlQuery, params);
  

  // Insert Product Information
  for(let productData of TestData.products) {executeQuery(TABLES.product.insert, productData); }
  for(let productNameData of TestData.product_names) {executeQuery(TABLES.product_names.insert, productNameData); }
  for(let productSpecData of TestData.product_specs) {executeQuery(TABLES.product_specs.insert, productSpecData); }

  // Insert Lot Information
  addLotInfoQueryTemplate = "INSERT INTO lot (product_id, harvest_date, harvested_by_user_id, best_before_date) values (?, ?, ?, ?)"
  for(let lotInfo of TestData.lot) {
    executeQuery(addLotInfoQueryTemplate, lotInfo)
  }
  
  // ---------------------------------------------------------------------
  // ADD ALL BOXES HERE 
  // ---------------------------------------------------------------------

  currentId = 1;
  sqlQuery = "INSERT INTO box (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO box_contents (box_id, quantity_of_products, lot_id) values (?, ?, ?)" 
  params = [currentId, 3, 1];
  executeQuery(sqlQuery, params);   
  params = [currentId, 1, 2];
  executeQuery(sqlQuery, params);   
  params = [currentId, 5, 3];  
  executeQuery(sqlQuery, params);
  
  currentId = 2;
  sqlQuery = "INSERT INTO box (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);  
  sqlQuery = "INSERT INTO box_contents (box_id, quantity_of_products, lot_id) values (?, ?, ?)"
  params = [currentId, 1, 4];
  executeQuery(sqlQuery, params);    
  params = [currentId, 2, 5];  
  executeQuery(sqlQuery, params);
  
  currentId = 3;
  sqlQuery = "INSERT INTO box (id) values (?)"
  params = [currentId];
  executeQuery(sqlQuery, params);   
  sqlQuery = "INSERT INTO box_contents (box_id, quantity_of_products, lot_id) values (?, ?, ?)"
  params = [currentId, 5, 6];
  executeQuery(sqlQuery, params);   
  params = [currentId, 3, 7];
  executeQuery(sqlQuery, params);   
  params = [currentId, 1, 8];  
  executeQuery(sqlQuery, params);

  // ---------------------------------------------------------------------
  // ADD ALL PALLETS HERE 
  // ---------------------------------------------------------------------
  box_ids_arr = ["1,2,3", "1,2", "1"]
  for(i=1; i < box_ids_arr.length+1; i++) {
    executeQuery("INSERT INTO pallet (id) values (?)", [i]);    
    executeQuery("INSERT INTO pallet_contents (pallet_id, enclosed_box_ids) values (?, ?)", [i, box_ids_arr[i-1]]); 
  }
  

  // TODO - add more pallets here

  // ---------------------------------------------------------------------
  // ADD ALL QR SCANS HERE 
  // ---------------------------------------------------------------------

  content_id = 1;
  content_type = 'product';
  qrcode_id = 1;

  sqlQuery = "INSERT INTO qrcode (content_id, content_type) values (?, ?)"
  params = [content_id, content_type];
  executeQuery(sqlQuery, params);  

  sqlQuery = "INSERT INTO qrscan (user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id) values (?, ?, ?, ?, ?)";

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-07-21 12:00:00.000';
  geolocation_lat = 33.695;
  geolocation_lon = -114.204;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-07-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-07-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-07-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    

  content_id = 2;
  content_type = 'product';
  qrcode_id = 2;
  
  sqlQuery = "INSERT INTO qrcode (content_id, content_type) values (?, ?)"
  params = [content_id, content_type];
  executeQuery(sqlQuery, params); 
  
  sqlQuery = "INSERT INTO qrscan (user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id) values (?, ?, ?, ?, ?)";

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-08-21 12:00:00.000';
  geolocation_lat = 33.694877853650866;
  geolocation_lon = -114.2038716512168;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-08-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-08-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-08-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    

  content_id = 3;
  content_type = 'product';
  qrcode_id = 3;
  
  sqlQuery = "INSERT INTO qrcode (content_id, content_type) values (?, ?)"
  params = [content_id, content_type];
  executeQuery(sqlQuery, params);  
  
  sqlQuery = "INSERT INTO qrscan (user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id) values (?, ?, ?, ?, ?)";

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  geolocation_lat = 33.694877853650866;
  geolocation_lon = -114.2038716512168;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-05-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    

  content_id = 1;
  content_type = 'pallet';
  qrcode_id = 4;
  
  sqlQuery = "INSERT INTO qrcode (content_id, content_type) values (?, ?)"
  params = [content_id, content_type];
  executeQuery(sqlQuery, params);  
  
  sqlQuery = "INSERT INTO qrscan (user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id) values (?, ?, ?, ?, ?)";

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  geolocation_lat = 33.694877853650866;
  geolocation_lon = -114.2038716512168;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-05-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    

  content_id = 2;
  content_type = 'box';
  qrcode_id = 5;
  
  sqlQuery = "INSERT INTO qrcode (content_id, content_type) values (?, ?)"
  params = [content_id, content_type];
  executeQuery(sqlQuery, params);  
  
  sqlQuery = "INSERT INTO qrscan (user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id) values (?, ?, ?, ?, ?)";

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  geolocation_lat = 33.694877853650866;
  geolocation_lon = -114.2038716512168;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  geolocation_lat = 33.447612811244085;
  geolocation_lon = -112.07044719604862;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  geolocation_lat = 33.39390852951677;
  geolocation_lon = -111.92761243213363;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  user_id = 1; // Consumer - Zale
  date_time = '2022-05-31 12:00:00.000';
  geolocation_lat = 33.424564;
  geolocation_lon = -111.928001;
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
  executeQuery(sqlQuery, params);    
  
  // TODO - add more QR scans here
 
  // ---------------------------------------------------------------------
  // ADD ALL FEEDBACK HERE 
  // ---------------------------------------------------------------------
  sqlQuery = "INSERT INTO feedback (user_id, content_type, content_id, date_time, rating, feedback_text) values (?, ?, ?, ?, ?, ?)"

  // pallet/box feedback matching QR Scans test data above

  content_id = 1;
  content_type = 'pallet';

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  rating = 5;
  feedback_text = "great pallet";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  rating = 5;
  feedback_text = "speed delivery of pallet";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  rating = 4;
  feedback_text = "took longer than expected to arrive";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  content_id = 2;
  content_type = 'box';  

  user_id = 4; // Farmer - QuartzsiteFarming
  date_time = '2022-05-21 12:00:00.000';
  rating = 5;
  feedback_text = "sending out a great box";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);
  
  user_id = 3; // Distributor - PHXDistribution
  date_time = '2022-05-25 12:00:00.000';
  rating = 3;
  feedback_text = "smelled weird";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);
  
  user_id = 2; // Retailer - Walmart
  date_time = '2022-05-30 12:00:00.000';
  rating = 5;
  feedback_text = "good condition box";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  // lot feedback
  content_type = 'lot';

  user_id = 1; 
  content_id = 1; 
  date_time = '2022-05-31 12:00:00.000';
  rating = 5;
  feedback_text = "great!";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  user_id = 2; 
  content_id = 1; 
  date_time = '2022-05-30 12:00:00.000';
  rating = 5;
  feedback_text = "looked great";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  user_id = 2; 
  content_id = 2; 
  date_time = '2022-06-01 12:00:00.000';
  rating = 5;
  feedback_text = "delicious!";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  user_id = 3; 
  content_id = 3; 
  date_time = '2022-06-02 12:00:00.000';
  rating = 3;
  feedback_text = "looked wilty";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);

  user_id = 1; 
  content_id = 4; 
  date_time = '2022-06-03 12:00:00.000';
  rating = 1;
  feedback_text = "tasted bad";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
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
                  qrscan.user_id, \
                  user.firstName || ' ' || user.lastName as user_scanned, \
                  user.accountType, \
                  user.company \
                FROM qrscan \
                  LEFT JOIN user ON qrscan.user_id = user.id \
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

const addFeedback = async (user_id, content_type, content_id, date_time, rating, feedback_text) => {

  sqlQuery = "INSERT INTO feedback (user_id, content_type, content_id, date_time, rating, feedback_text) values (?, ?, ?, ?, ?, ?)";
  params = [user_id, content_type, content_id, date_time, rating, feedback_text];
  executeQuery(sqlQuery, params);    

  return new Promise((resolve, reject) => {
    let response_code = "200";
    var ReturnObject = "{\"response_code\": " + response_code + ", \"output\": \"none\"}";
    resolve(ReturnObject);
  });  
}

const updateFeedback = async (feedback_id, user_id, date_time, rating, feedback_text) => {

  sqlQuery = "UPDATE feedback \
                SET \
                  date_time = '"+ date_time + "',\
                  rating = "+ rating + ",\
                  feedback_text = '" + feedback_text + "'\
                WHERE \
                  feedback.id = " + feedback_id;
  params = [user_id, lot_id, date_time, rating, feedback_text];
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

const getFeedbackByContentUserId = async (content_type, content_id, user_id) => {
  return new Promise((resolve, reject) => {
    sqlQuery = "SELECT \
                  feedback.id as feedback_id, \
                  feedback.user_id, \
                  feedback.content_type, \
                  feedback.content_id, \
                  feedback.date_time, \
                  feedback.rating, \
                  feedback.feedback_text \
                FROM feedback \
                WHERE \
                  feedback.content_type = '" + content_type + "'\
                  AND feedback.content_id = " + content_id + "\
                  AND feedback.user_id = " + user_id
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

const addQRCodeScan = async (qrcode_id, date_time, geolocation_lat, geolocation_lon, user_id) => {

  sqlQuery = "INSERT INTO qrscan (user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id) values (?, ?, ?, ?, ?)";
  params = [user_id, date_time, geolocation_lat, geolocation_lon, qrcode_id];
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

// TODO - define additional accessors here

// ---------------------------------------------------------------------
// EXPORT ACCESSOR FUNCTIONS HERE
// ---------------------------------------------------------------------

// TODO - export additional accessors here
export {checkForRecall, getUserDetails, getAppSettings, addFeedback, updateLanguage, updateFeedback, getFeedbackByContentUserId, getQRCodeDetails, addUser, checkSignIn, getLotDetails, getAllProducts, deleteProduct, addProduct, addQRCodeScan, getAllQRScans, getAllUsers, getAllUsersByAccountType, getPalletDetails, getBoxDetails, getProductDetails, getProductId};

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