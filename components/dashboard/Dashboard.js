import 'react-native-gesture-handler'
import React from 'react';
import { Text, View } from 'react-native';
import getString from "../../StringsArray";

function Dashboard() {  
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{getString('dashboard_welcome', global.language)}</Text>
    </View>
      
  );
}

export default Dashboard;

/* this was for the StringSQLite.js option, but could not get the async working
// consider using:
// AsyncStorage.getItem("TOKEN") then useEffect
// or 
// use componentDidMount
const updateStrings = async() => {
  DemoStringsName = await getString('settings_drawer');
  console.log('Dashboard - DemoStringsName: ' + DemoStringsName);
}
*/