import 'react-native-gesture-handler'
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './components/dashboard/Dashboard'; 
import Scanner from './components/scanner/Scanner'
import Settings from './components/settings/Settings'
import Demo_database from './components/demo_database/Demo_database'
import getString from "./StringsArray";
import './global.js';
import Feedback from './components/feedback/Feedback'

const Drawer = createDrawerNavigator();
const debugging_option = true;

function SideBar() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name={getString('drawer_dashboard', global.language)} component={Dashboard} />
      <Drawer.Screen name={getString('drawer_scanbarcode', global.language)} component={Scanner} />
      <Drawer.Screen name={getString('drawer_settings', global.language)} component={Settings} />
      <Drawer.Screen name={getString('drawer_demo_database', global.language)} children={() => (
        <Demo_database />
      )} />
      <Drawer.Screen name={getString('drawer_feedback', global.language)} component={Feedback} />
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