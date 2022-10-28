import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRoute, useIsFocused } from "@react-navigation/native";

export default function Scan({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const isFocused = useIsFocused();
    const [recallType, setRecallType] = useState()
    const route = useRoute();

    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() => {
        if (isFocused) {
            getRecallType()
            getBarCodeScannerPermissions();
        }

    }, [isFocused]);

    const getRecallType = () => {
        setRecallType(route.params.recallType)
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        navigation.pop()
        if(recallType == 1){
            navigation.navigate('Recall1', { data })
        }else{
            navigation.navigate('Recall', { data })
        }
       
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
})