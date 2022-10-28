import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SvgQRCode from 'react-native-qrcode-svg';
import { BACKEND_ADDRESS } from '../utils/config'

export default function Product() {
    const [recallData, setRecallData] = useState({})

    useEffect(() => {
        getRecallData()
    }, [])

    const getRecallData = () => {
        fetch(`${BACKEND_ADDRESS}/1`).then((resp) => resp.json()).then(data => {
            setRecallData(data);
        })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 30 }}>Product1</Text>
            <View>
                <SvgQRCode size={200} value={JSON.stringify(recallData)} />
            </View>
        </View>
    );
}