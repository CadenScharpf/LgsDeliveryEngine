var StringsDB = [];
var content = [];
initializeDatabase();
const debugging_option = true;

function initializeDatabase() {
  if (debugging_option) {
    console.log("Initialize Database Function Call");
    console.log('-------------------------------------');
  }

  // -------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------
  // STRING DEFINITIONS
  // -------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------

  // Drawer
  content = {description:"drawer_settings", english: 'Settings', spanish: 'Ajustes'};
  StringsDB.push(content);
  content = {description:"drawer_scanbarcode", english: 'Scan Barcode', spanish: 'Escanear código de barras'};
  StringsDB.push(content);
  content = {description:"drawer_dashboard", english: 'Dashboard', spanish: 'Tablero'};
  StringsDB.push(content);
  content = {description:"drawer_demo_database", english: 'Demo - Database', spanish: 'Demostración - Base de datos'};
  StringsDB.push(content);

  // Dashboard
  content = {description:"dashboard_welcome", english: 'Dashboard', spanish: 'Tablero'};
  StringsDB.push(content);

  // QR Code Scanner
  content = {description:"qrscanner_permission", english: 'Requesting for camera permission', spanish: 'Solicitando permiso de cámara'};
  StringsDB.push(content);
  content = {description:"qrscanner_allow", english: 'Allow Camera', spanish: 'Permitir cámara'};
  StringsDB.push(content);
  content = {description:"qrscanner_close", english: 'Close', spanish: 'Cerca'};
  StringsDB.push(content);
  content = {description:"qrscanner_placeholder", english: 'Product Details Here', spanish: 'Detalles del producto aquí'};
  StringsDB.push(content);
  
  // Settings
  content = {description:"settings_welcome", english: 'Settings', spanish: 'Ajustes'};
  StringsDB.push(content);
  
  // Demo - Database
  content = {description:"demo_db_title", english: 'LGS Delivery Engine Demo', spanish: 'Demostración del motor de entrega de LGS'};
  StringsDB.push(content);
  content = {description:"demo_db_description", english: 'Android + Database Demo', spanish: 'Android + demostración de base de datos'};
  StringsDB.push(content);
  content = {description:"demo_db_instructions", english: 'Add Random Name with Counts', spanish: 'Agregar nombre aleatorio con recuentos'};
  StringsDB.push(content);
  content = {description:"demo_db_add", english: 'Add New Item', spanish: 'Agregar ítem nuevo'};
  StringsDB.push(content);
  content = {description:"demo_db_delete", english: 'Delete', spanish: 'Borrar'};
  StringsDB.push(content);

  // TODO - add strings here








  // -------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------
  // END STRING DEFINITIONS
  // -------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------

  if (debugging_option) {
    console.log(' ');
    console.log(' ');
  }
}

function getString(inputDescription, inputLanguage) {
  if (debugging_option) {
    console.log('Get String Function Call');
    console.log('-------------------------------------');
    console.log('Input Description: ' + inputDescription);
    console.log('Input Language: ' + inputLanguage);
    console.log(' ');
    console.log(' ');
  }
  return getResultForDescription(inputDescription, inputLanguage);
}

export default getString;

function getResultForDescription(inputDescription, inputLanguage) {
  if (debugging_option) {
    console.log("Get Result for Description Function Call");
    console.log('-------------------------------------');
    console.log('Get Result for Description Input Description: ' + inputDescription);
    console.log('Get Result for Description Database: ' + JSON.stringify(StringsDB));
  }
    
  var returnString = 'TBD';

  var keyFound = false;
  var subArray;
  for (var key in StringsDB) {
    subArray = StringsDB[key];
    for (var subKey in subArray) {
      if (debugging_option) {
        console.log("subKey " + subKey + " has value " + subArray[subKey]);
      }

      if (subKey == 'description' && subArray[subKey] == inputDescription) {
        keyFound = true;
        returnString = subArray[inputLanguage];
        break;
      }
    }

    if (keyFound) {
      break;
    }
  }  
  
  if (debugging_option) {
    console.log(' ');
    console.log(' ');
  }
  return returnString;
  }