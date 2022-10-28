import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FeedbackScreen from './screens/Feedback';
import RecallScreen from './screens/Recall';
import ProductScreen from './screens/Product';
import ScanScreen from './screens/Scan';
import Recall1Screen from './screens/Recall1'



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function Root() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="RecallScreen">
      <Drawer.Screen name="Recall" component={RecallScreen} />
      <Drawer.Screen name="Recall1" component={Recall1Screen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      <Drawer.Screen name="Product" component={ProductScreen} />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          options={{header:() =>null}}
          component={Root}
        />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
