import 'react-native-gesture-handler'
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './pages/dashboard/Dashboard';
import Scanner from './pages/scanner/Scanner'
import Settings from './pages/settings/Settings'
import Demo_database from './pages/demo_database/Demo_database'
import getString from "./StringsArray";
import './Colors';
import QrData from './pages/scanner/qrdata/QrData';
import { SafeAreaView } from 'react-native-safe-area-context';
import getGlobalColors from './Colors';
import './global.js';
import ScannerStack from './pages/scanner/Scanner';
import Feedback from './components/feedback/Feedback'


const Drawer = createDrawerNavigator();
const debugging_option = true;

const colors = getGlobalColors();

function SideBar() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name={getString('drawer_dashboard', global.language)}   component={Dashboard} />
      <Drawer.Screen name={getString('drawer_scanbarcode', global.language)} component={ScannerStack} 
      options={{
          title: 'QR Scanner',
          headerStyle: {
            backgroundColor: colors.backgroundColor,
          },
          headerTintColor: colors.textColorPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      <Drawer.Screen name={getString('drawer_settings', global.language)} component={Settings} />
      <Drawer.Screen name={getString('drawer_feedback', global.language)} component={Feedback} />
      {/* <Drawer.Screen name='qrdata' component={QrData} /> */}
      {/* <Drawer.Screen name='drawer_demo_database' children={() => (
        <Demo_database />
      )} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SideBar />
    </NavigationContainer>
  );
}
