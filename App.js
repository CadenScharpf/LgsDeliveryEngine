import 'react-native-gesture-handler'
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './components/dashboard/Dashboard'; 
import Scanner from './components/scanner/Scanner'
import Settings from './components/settings/Settings'
import Demo_database from './components/demo_database/Demo_database'


const Drawer = createDrawerNavigator();

function SideBar() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Scan Barcode" component={Scanner} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Demo - Database" component={Demo_database} />
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