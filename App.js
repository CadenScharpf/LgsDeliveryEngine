import 'react-native-gesture-handler'
import {React, Component, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import Settings from './pages/settings/Settings'
import {getString} from "./StringsArray";
import './Colors';
import getGlobalColors from './Colors';
import './global.js';
import ScannerStack from './pages/scanner/Scanner';
import Feedback from './components/feedback/Feedback'
import ProductScroll from './pages/product_scroll/ProductScroll';
import LoginStack from './pages/login_stack/LoginStack';
import Recall from './pages/recall/Recall'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const debugging_option = true;

const colors = getGlobalColors();

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: SideBar,
    Auth: LoginStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

function SideBar() {
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: colors.background,
      },
      drawerLabelStyle: {
        color: colors.backgroundTextPrimary
      }
    }}
    >
      <Drawer.Screen name={getString('drawer_scanbarcode')} component={ScannerStack} 
      options={{
        title: getString('app_qrscanner'),
        headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.backgroundTextPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      <Drawer.Screen name={getString('app_title_demo')}   component={ProductScroll} 
      options={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.backgroundTextPrimary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>

      <Drawer.Screen name={getString('app_recall')} component={Recall}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.backgroundTextPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      
      <Drawer.Screen name={getString('app_feedback')} component={Feedback} 
      options={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.backgroundTextPrimary,
        title: getString('drawer_feedback'),
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      <Drawer.Screen name={getString('drawer_settings')} component={Settings} 
      options={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.backgroundTextPrimary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      {/* <Drawer.Screen name='qrdata' component={QrData} /> */}
      {/* <Drawer.Screen name='drawer_demo_database' children={() => (
        <Demo_database />
      )} /> */}
    </Drawer.Navigator>
  );
}
function AuthLoadingScreen({navigation}) {

  const [userToken, setUserToken] = useState();

  global.gotoauthloading = ()=>{
    navigation.navigate("AuthLoading")
  };

  global.gotoapp = ()=>{
    navigation.navigate("App")
  };

  global.logout = ()=>{
    AsyncStorage.removeItem('userToken'); 
    navigation.navigate("Auth")
  }

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((result) => {
      if(result) {
        setUserToken(result);
      }

      navigation.navigate(result ? 'App' : 'Auth');
    })
  }, [])

  // Render any loading content that you like here

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

export default function App() {
  return(
  
    <NavigationContainer >
    <AppNavigator>
      <AuthLoadingScreen/>
    </AppNavigator>
    {/* <LoginStack/>     */}
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
      backgroundColor: colors.background,
  },
})