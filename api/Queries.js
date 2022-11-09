var Queries = {
    product: {
      schema:'(id INTEGER PRIMARY KEY AUTOINCREMENT, defaultLabel TEXT, photoURL TEXT, productPageURL TEXT)',
      insert: "INSERT INTO product (id, defaultLabel, photoURL, productPageURL) values (?, ?, ?, ?)",
      search: ""
    }, 
    product_names: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)",
      insert: "INSERT INTO product_names (product_id, language, content) values (?, ?, ?)",
      search: ""
    }, 
    product_specs: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, language TEXT, content TEXT)",
      insert: "INSERT INTO product_specifications (product_id, language, content) values (?, ?, ?)",
      search: ""
    }, 
    qrcode: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, content_id INTEGER, content_type TEXT)",
      insert: "INSERT INTO qrcode (content_id, content_type) values (?, ?)",
      search: ""
    }, 
    qrscan: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT, date_time DATE_TIME, geolocation_lat DOUBLE, geolocation_lon DOUBLE, qrcode_id INTEGER)",
      insert: "INSERT INTO qrscan (user_email, date_time, geolocation_lat, geolocation_lon, qrcode_id) values (?, ?, ?, ?, ?)",
      search: ""
    }, 
    user: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, password TEXT, accountType TEXT, language TEXT, company TEXT)",
      insert: "INSERT INTO user (id, firstName, lastName, email, password, accountType, language, company) values (?, ?, ?, ?, ?, ?, ?, ?)",
      search: ""
    }, 
    box: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT)",
      insert: "INSERT INTO box (id) values (?)",
      search: ""
    },
    box_contents: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, box_id INTEGER, quantity_of_products INT, lot_id INTEGER)",
      insert: "INSERT INTO box_contents (box_id, quantity_of_products, lot_id) values (?, ?, ?)",
      search: ""
    }, 
    pallet: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT)",
      insert: "",
      search: ""
    }, 
    pallet_contents: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, pallet_id INTEGER, enclosed_box_ids TINYTEXT)",
      insert: "",
      search: ""
    }, 
    lot: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, harvest_date DATE, harvested_by_user_id INTEGER, best_before_date DATE)",
      insert: "INSERT INTO lot (product_id, harvest_date, harvested_by_user_id, best_before_date) values (?, ?, ?, ?)",
      search: ""
    }, 
    feedback: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT, content_type TEXT, content_id INTEGER, date_time DATE_TIME, rating INT, feedback_text TEXT)",
      insert: "",
      search: ""
    }, 
    settings: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, appVersion TEXT, companyName TEXT, photoURLBanner TEXT, photoURLIcon TEXT, fontAndroid TEXT, fontiOS TEXT, colorPrimary TEXT, colorSecondary TEXT, colorTertiary TEXT, colorBackgroundLight TEXT, colorBackgroundDark TEXT)",
      insert: "INSERT INTO settings (appVersion, companyName, photoURLBanner, photoURLIcon, fontAndroid, fontiOS, colorPrimary, colorSecondary, colorTertiary, colorBackgroundLight, colorBackgroundDark) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      search: ""
    }, 
    recall: {
      schema: "(id INTEGER PRIMARY KEY AUTOINCREMENT, lot_id INTEGER, date_issued DATE, description TEXT, reference_code TEXT)",
      insert: "INSERT INTO recall (lot_id, date_issued, description, reference_code) values (?, ?, ?, ?)",
      search: ""
    }
  }
  export default Queries