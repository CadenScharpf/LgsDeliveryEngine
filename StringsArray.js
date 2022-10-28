var StringsDB = [];
var content = [];
initializeDatabase();
const debugging_option = false;

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

  // app
  content = {description:"app_title_demo", english: 'Product Feed Demo', spanish: 'Demostración de alimentación de productos'};
  StringsDB.push(content);
  content = {description:"app_qrscanner", english: 'QR Scanner', spanish: 'Escáner QR'};
  StringsDB.push(content);
  content = {description:"app_feedback", english: 'Feedback', spanish: 'Retroalimentación'};
  StringsDB.push(content);

  // Lot Information
  content = {description:"lotinformation_title", english: 'Harvest Information', spanish: 'Información de cosecha'};
  StringsDB.push(content);
  content = {description:"lotinformation_farm", english: 'Farm', spanish: 'Granja'};
  StringsDB.push(content);
  content = {description:"lotinformation_harvestdate", english: 'Harvest date', spanish: 'Fecha de cosecha'};
  StringsDB.push(content);
  content = {description:"lotinformation_harvestby", english: 'Harvest by', spanish: 'Cosecha por'};
  StringsDB.push(content);
  content = {description:"lotinformation_bestbefore", english: 'Best before', spanish: 'Consúmase antes de'};
  StringsDB.push(content);

  // Product
  content = {description:"product_leavefeedback", english: 'Leave Feedback', spanish: 'Deja un comentario'};
  StringsDB.push(content);  

  // Drawer
  content = {description:"drawer_settings", english: 'Settings', spanish: 'Ajustes'};
  StringsDB.push(content);
  content = {description:"drawer_scanbarcode", english: 'Scan Barcode', spanish: 'Escanear código de barras'};
  StringsDB.push(content);
  content = {description:"drawer_dashboard", english: 'Dashboard', spanish: 'Tablero'};
  StringsDB.push(content);
  content = {description:"drawer_demo_database", english: 'Demo - Database', spanish: 'Demostración - Base de datos'};
  StringsDB.push(content);
  content = {description:"drawer_feedback", english: 'Feedback', spanish: 'Retroalimentación'};
  StringsDB.push(content);
  content = { description: "drawer_app", english: 'App', spanish: 'aplicación'};
  StringsDB.push(content);
  content = { description: "drawer_auth", english: 'Auth', spanish: 'Autorización' };
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
  content = {description:"demo_db_title", english: 'LGS Database Demo', spanish: 'Demostración de la base de datos LGS'};
  StringsDB.push(content);
  content = {description:"demo_db_description", english: 'Database Demo', spanish: 'Demostración de base de datos'};
  StringsDB.push(content);
  content = {description:"demo_db_instructions", english: 'Add Random Product Name', spanish: 'Agregar producto nombre aleatorio'};
  StringsDB.push(content);
  content = {description:"demo_db_add", english: 'Add New Product', spanish: 'Agregar producto nuevo'};
  StringsDB.push(content);
  content = {description:"demo_db_delete", english: 'Delete', spanish: 'Borrar'};
  StringsDB.push(content);

  // feedback page
  content = {description:"feedback_form", english: 'Feedback Form', spanish: 'Formulario de comentarios'};
  StringsDB.push(content);
  content = {description:"feedback_productname", english: 'Product Name:', spanish: 'Nombre del producto:'};
  StringsDB.push(content);
  content = {description:"feedback_expirationdate", english: 'Product Expiration Date:', spanish: 'Fecha de vencimiento del producto:'};
  StringsDB.push(content);
  content = {description:"feedback_additionalcomment", english: 'Additional Comments:', spanish: 'Comentarios adicionales:'};
  StringsDB.push(content);
  content = {description:"feedback_rating", english: 'Rating:', spanish: 'Clasificación:'};
  StringsDB.push(content);
  content = {description:"feedback_submit", english: 'Submit', spanish: 'Enviar'};
  StringsDB.push(content);
  content = {description:"feedback_accessfeedbackform", english: 'Access Feedback Form', spanish: 'Acceder al formulario de comentarios'};
  StringsDB.push(content);
  content = {description:"feedback_close", english: 'Close', spanish: 'Cerca'};
  StringsDB.push(content);  

  // sign in page
    content = { description:"signinscreen_email", english: 'Email', spanish: 'Correo electrónico'};
    StringsDB.push(content);
    content = { description: "signinscreen_password", english: 'Password', spanish: 'Clave' };
    StringsDB.push(content);
    content = { description: "signinscreen_signIn", english: 'Sign In', spanish: 'Registrarse' };
    StringsDB.push(content);
    content = { description: "signinscreen_forgotPassword?", english: 'Forgot password?', spanish: '¿Se te olvidó tu contraseña?' };
    StringsDB.push(content);
    content = { description: "signinscreen_needAccount?", english: 'Do you need an account? Create one.', spanish: '¿Necesitas una cuenta? Crea uno.' };
    StringsDB.push(content);
    
    // sign up page
    content = { description:"signupscreen_firstName", english: 'First name', spanish: 'Nombre de pila'};
    StringsDB.push(content);
    content = { description:"signupscreen_lastName", english: 'Last name', spanish: 'Apellido'};
    StringsDB.push(content);
    content = { description:"signupscreen_email", english: 'Email', spanish: 'Correo electrónico'};
    StringsDB.push(content);
    content = { description:"signupscreen_password", english: 'Password', spanish: 'Clave'};
    StringsDB.push(content);
    content = { description:"signupscreen_repeatPassword", english: 'Repeat Password', spanish: 'Repita la contraseña'};
    StringsDB.push(content);
    content = { description:"signupscreen_company", english: 'Company', spanish: 'Compañía'};
    StringsDB.push(content);
    content = { description:"signupscreen_accountType", english: 'Account type', spanish: 'Tipo de cuenta'};
    StringsDB.push(content);
    content = { description:"signupscreen_selectLanguage", english: 'Select Language', spanish: 'Seleccione el idioma'};
    StringsDB.push(content);
    content = { description:"signupscreen_register", english: 'Register', spanish: 'Registro'};
    StringsDB.push(content);
    content = { description:"signupscreen_hasAccount", english: 'Have an account? Sign in', spanish: '¿Tener una cuenta? Iniciar sesión'};
    StringsDB.push(content);

  // confirm email screen page
    content = { description: "confirmEmail_verification", english: 'Enter your verification code', spanish: 'Ingrese su código de verificación' };
    StringsDB.push(content);
    content = { description: "confirmEmail_confirm", english: 'Confirm', spanish: 'Confirmar' };
    StringsDB.push(content);
    content = { description: "confirmEmail_resendCode", english: 'Resend code', spanish: 'Reenviar codigo' };
    StringsDB.push(content);
    content = { description: "confirmEmail_backToSignIn", english: 'Back to sign in', spanish: 'Volver para iniciar sesión' };
    StringsDB.push(content);

  // forgot password page
    content = { description: "forgotPassword_username", english: 'Username', spanish: 'Nombre de usuario' };
    StringsDB.push(content);
    content = { description: "forgotPassword_send", english: 'Send', spanish: 'Enviar' };
    StringsDB.push(content);
    content = { description: "forgotPassword_backToSignIn", english: 'Back to sign in', spanish: 'Volver para iniciar sesión' };
    StringsDB.push(content);

  // new password page
    content = { description: "newPassword_code", english: 'Code', spanish: 'Código' };
    StringsDB.push(content)
    content = { description: "newPassword_newPassword", english: 'Enter your new password', spanish: 'Introduzca su nueva contraseña' };
    StringsDB.push(content)
    content = { description: "newPassword_submit", english: 'Submit', spanish: 'Enviar' };
    StringsDB.push(content)
    content = { description: "newPassword_backToSignIn", english: 'Back to sign in', spanish: 'Volver para iniciar sesión' };
    StringsDB.push(content)

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