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
var products = [
  { "id": 1, "defaultLabel": "tomato", "bestBeforeDays": 14, "product_description": "Tomato", "product_specification": "The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant." }, 
  { "id": 2, "defaultLabel": "cucumber", "bestBeforeDays": 28, "product_description": "Cucumber", "product_specification": "Cucumber (Cucumis sativus) is a widely-cultivated creeping vine plant in the Cucurbitaceae family that bears usually cylindrical fruits." }, 
  { "id": 3, "defaultLabel": "crouton", "bestBeforeDays": 28, "product_description": "Crouton", "product_specification": "A crouton is a piece of rebaked bread, often cubed and seasoned." }]

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
        
            <Stack.Screen name="SignUpScreen" component={SignUpScreen}  options={{ title: 'Sign Up'}} style={styles.container}/>
            <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: 'Sign In' }}/>
          
            
           
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
