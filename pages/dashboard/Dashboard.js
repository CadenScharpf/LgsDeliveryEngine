import 'react-native-gesture-handler'
import React from 'react';
import { Text, View } from 'react-native';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';

var colors = getGlobalColors();

function Dashboard() {  
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundColor }}>
      <Text style={{color: colors.textColorPrimary}}>{getString('dashboard_welcome', global.language)}</Text>
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