import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';


const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');

    const onSignInPressed = () => {
        console.warn("Sign in button pressed");
    };

    const onConfirmPressed = () => {
        console.warn("Confirm button pressed");
    };

    const onResendPressed = () => {
        console.warn("Resend button pressed");
    };

  return (
    <ScrollView>
        <View>
            <Text style={styles.title}>Confirm your email</Text>

            <CustomInput 
                placeholder="Enter your verification code" 
                value={code} 
                setValue={setCode}
            />

            <CustomButton 
                text="Confirm" 
                onPress={onConfirmPressed} 
            />

            <CustomButton 
                text="Resend code" 
                onPress={onResendPressed}
                type="SECONDARY"
            />

            <CustomButton 
                text="Back to sign in" 
                onPress={onSignInPressed}
                type="SECONDARY"
            />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    root: {
        alignSelf: 'center',
        padding: 20,
    },
    title: {
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    }
});

export default ConfirmEmailScreen;