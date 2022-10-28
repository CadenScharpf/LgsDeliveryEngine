import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import getString from "../../StringsArray";

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
                placeholder={getString('forgotPassword_username', global.language)}
                value={username} 
                setValue={setUsername}
            />

            <CustomButton 
                text={getString('forgotPassword_send', global.language)}
                onPress={onSendPressed} 
            />

            <CustomButton 
                text={getString('forgotPassword_backToSignIn', global.language)}
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