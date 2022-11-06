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
  
  // TODO - add more users here

  // ---------------------------------------------------------------------
  // ADD ALL PRODUCTS HERE 
  // ---------------------------------------------------------------------

  currentId = 1;
  sqlQuery = "INSERT INTO product (id, defaultLabel, photoURL, productPageURL) values (?, ?, ?, ?)"
  params = [currentId, 'Blade Oakleaf Lettuce', 'https://i2.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/015-Blade-Oakleaf-Lettuce-Web.jpg?fit=1500%2C1000&ssl=1', 'https://localgrownsalads.com/product/blade-oakleaf-lettuce/'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_names (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Blade Oakleaf Lettuce'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Hoja de Lechuga de Hoja de Roble'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'An Oakleaf Lettuce in the shape of a blade, this lettuce\'s leaves are long and thin, and they fit perfectly, whole, in large salads, or, chopped, in regular salads. Blade Oakleaf Lettuce has its own distinct, bold flavour compared to staple lettuces, and that\'s why you\'ll find it in stronger flavoured salads.'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Una Lechuga Hoja de Roble en forma de cuchilla, las hojas de esta lechuga son largas y finas, y encajan perfectamente, enteras, en ensaladas grandes, o, picadas, en ensaladas regulares. Blade Oakleaf Lettuce tiene su propio sabor distintivo y audaz en comparación con las lechugas básicas, y es por eso que la encontrará en ensaladas de sabores más fuertes.'];
  executeQuery(sqlQuery, params);

  currentId = 2;
  sqlQuery = "INSERT INTO product (id, defaultLabel, photoURL, productPageURL) values (?, ?, ?, ?)"
  params = [currentId, 'Curly Kale', 'https://i0.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/014-Kale-Web.jpg?fit=1500%2C1000&ssl=1','https://localgrownsalads.com/product/curly-kale/'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_names (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Curly Kale'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Col Rizada'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'A salad favourite, Curly Kale gets its name from its wavy leaves. When young, their edges have a slight curl, but as they grow, so do the amount of curls. This variety of kale is particularly nice in salads, thanks in large part to its appearance and texture adding a different look than your average lettuce-based salad.'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Una ensalada favorita, Curly Kale recibe su nombre de sus hojas onduladas. Cuando son jóvenes, sus bordes tienen un ligero rizo, pero a medida que crecen, también aumenta la cantidad de rizos. Esta variedad de col rizada es particularmente agradable en ensaladas, gracias en gran parte a su apariencia y textura que le da un aspecto diferente al de una ensalada promedio a base de lechuga.'];
  executeQuery(sqlQuery, params);

  currentId = 3;
  sqlQuery = "INSERT INTO product (id, defaultLabel, photoURL, productPageURL) values (?, ?, ?, ?)"
  params = [currentId, 'Pesto Basil', 'https://i0.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/014-Kale-Web.jpg?fit=1500%2C1000&ssl=1', 'https://localgrownsalads.com/product/pesto-basil/'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_names (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Pesto Basil'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Pesto de Albahaca'];
  executeQuery(sqlQuery, params);    
  sqlQuery = "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)"
  params = [currentId, 'english', 'Sweet Basil. St. Joseph\'s Wort. Ocimum Basilicum. Genovese Basil. Delicious. Whatever you call it, this popular variety of basil is a fragrant and flavourful herb that is most commonly found in its own saucy paste-type dish, pesto, which pairs beautifully from everything from pastas and pizzas to fish and even as a dip for breads and crackers.'];
  executeQuery(sqlQuery, params);   
  params = [currentId, 'spanish', 'Albahaca. Hierba de San José. Ocimum Basilicum. Albahaca Genovesa. Delicioso. Como sea que la llames, esta popular variedad de albahaca es una hierba aromática y sabrosa que se encuentra más comúnmente en su propio plato tipo pasta picante, el pesto, que combina a la perfección con todo, desde pastas y pizzas hasta pescado e incluso como salsa para panes. y galletas.'];
  executeQuery(sqlQuery, params);

  // TODO - add more products here

  
  // ---------------------------------------------------------------------
  // ADD ALL LOTS HERE 
  // ---------------------------------------------------------------------

  sqlQuery = "INSERT INTO lot (product_id, harvest_date, harvested_by_user_id, best_before_date) values (?, ?, ?, ?)"
  params = [1, '2022-09-26', 4, '2022-10-15'];  
  executeQuery(sqlQuery, params);

  params = [2, '2022-09-26', 4, '2022-10-16'];  
  executeQuery(sqlQuery, params);

  params = [3, '2022-09-26', 4, '2022-10-17'];  
  executeQuery(sqlQuery, params);

  params = [1, '2022-09-26', 4, '2022-10-18'];  
  executeQuery(sqlQuery, params);

  params = [3, '2022-09-26', 4, '2022-10-19'];  
  executeQuery(sqlQuery, params);

  params = [1, '2022-09-26', 4, '2022-10-20'];  
  executeQuery(sqlQuery, params);

  params = [2, '2022-10-26', 4, '2022-11-15'];  
  executeQuery(sqlQuery, params);

  params = [3, '2022-10-26', 4, '2022-11-15'];  
  executeQuery(sqlQuery, params);

  params = [1, '2022-10-26', 4, '2022-11-21'];  
  executeQuery(sqlQuery, params);

  params = [2, '2022-10-26', 4, '2022-11-21'];  
  executeQuery(sqlQuery, params);
  
  // TODO - add more lots here

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

  // TODO - add more boxes here

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
  // TODO - convert to asyncStorage
  inputLanguage = global.language;
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
  // TODO - convert to asyncStorage
  inputLanguage = global.language;
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

const updateLanguage = async (user_id, inputLanguage) => {

  sqlQuery = "UPDATE user \
                SET \
                  language = '"+ inputLanguage + "'\
                WHERE \
                  user.id = " + user_id;
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

  currentId = -1;
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