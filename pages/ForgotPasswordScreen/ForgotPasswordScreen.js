import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');

    const onSendPressed = () => {
        console.warn("Send button pressed");
    }; 

    const onSignInPressed = () => {
        console.warn("Sign in button pressed");
    };

    const onResendPressed = () => {
        console.warn("Resend button pressed");
    };

  return (
    <ScrollView>
        <View styles={styles.root}>
            <Text style={styles.title}>Reset your password</Text>

            <CustomInput 
                placeholder="Username" 
                value={username} 
                setValue={setUsername}
            />

            <CustomButton 
                text="Send" 
                onPress={onSendPressed} 
            />

            <CustomButton 
                text="Back to sign in" 
                onPress={onSignInPressed}
                type="TERTIARY"
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

export default ForgotPasswordScreen;