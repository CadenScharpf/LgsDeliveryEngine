import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';
import ButtonPrimary from '../../components/input/Buttons';
import PalletScan from './PalletScan/PalletScan';
import BoxWrapper from './BoxScan/BoxScan';
import { createStackNavigator } from '@react-navigation/stack';

var colors = getGlobalColors();
const Stack = createStackNavigator();


export default function ScannerStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Pallet" component={PalletScan} initialParams={{ id: '' }}/>
        <Stack.Screen name="Box" component={BoxWrapper} initialParams={{ id: '' }}/>
      </Stack.Navigator>
    );
  }

  function Scanner({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')

    const flipState = () => {
        (async () => {setScanned(!scanned)})}

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        //setScanned(true);
        obj = JSON.parse(data)
        if(obj && obj.lgsAssetIdentifier && obj.lgsAssetIdentifier.type && obj.lgsAssetIdentifier.id)
        {
          setText(data)
          global.SCANNERSTACKNAV = navigation
          if(obj.lgsAssetIdentifier.type == "pallet") {navigation.navigate('Pallet', { id: obj.lgsAssetIdentifier.id })}
          else if(obj.lgsAssetIdentifier.type == "box") {navigation.navigate('Box', { id: obj.lgsAssetIdentifier.id })}
        }
        
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>{getString('qrscanner_permission', global.language)}</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={getString('qrscanner_allow', global.language)} onPress={() => askForCameraPermission()} />
            </View>)
    }

    // Return the View
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={false}
                onRequestClose={() => {
                    setScanned(!scanned);
                }}
                style={StyleSheet.create({margin: 0})}
            >
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <PalletScan/>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {setScanned(false); navigation.navigate('Scanner')}}><Text>Close</Text></Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
            </View>
            <Button style={{ marginTop : 20 }}
                  onPress={()=>{
                      // TODO - simulate QR Code scan 
                      // handleBarCodeScanned 
                  }} 
                  title={getString('scan_simulate', global.language)}
            />
            {
            /* {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />} */}
        </View>
    );
}

// function ProductData() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>product data here</Text>
//         </View>
//     );
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        color: colors.textColor
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    },
    modalView: {
      margin: 0,
      flex: 1,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      }, 
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: 150,
      marginBottom: 150
      
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: colors.backgroundTextPrimary,
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});