import 'react-native-gesture-handler'
import {React, createContext} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';
import SignUpScreen from '../SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../SignInScreen/SignInScreen';

var colors = getGlobalColors();
const Stack = createStackNavigator();
const ThemeContext = createContext('');

function LoginStack({navigation}) {  

  return (
    <ThemeContext.Provider value={()=>{navigation.navigate("App"); AsyncStorage.removeItem("userToken")}}>
       <Stack.Navigator  screenOptions={{ 
        headerShown: true,
        headerStyle: {
            backgroundColor: colors.background
          },
        headerTintColor: colors.backgroundTextPrimary,
        headerBackVisible: false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        
            <Stack.Screen name="SignUpScreen" component={SignUpScreen}  options={{ title: getString('signup_title')}} style={styles.container}/>
            <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: getString('signin_title') }}/>
          
            
           
        </Stack.Navigator>
        </ThemeContext.Provider>
      
  );
}


const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
        },
    })
export default LoginStack;
