import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {getString} from "../../StringsArray";

const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSignInPressed = () => {
        console.warn("Sign in button pressed");
    };

    const onSubmitPressed = () => {
        console.warn("Submit button pressed");
    };

  return (
    <ScrollView>
        <View styles={styles.root}>
            <Text style={styles.title}>Confirm your email</Text>

            <CustomInput 
                  placeholder={getString('newPassword_code')}
                value={code} 
                setValue={setCode}
            />

            <CustomInput 
                  placeholder={getString('newPassword_newPassword')}
                value={newPassword} 
                setValue={setNewPassword}
                secureTextEntry
            />

            <CustomButton 
                  text={getString('newPassword_submit')}
                onPress={onSubmitPressed} 
            />

            <CustomButton 
                  text={getString('newPassword_backToSignIn')}
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

export default NewPasswordScreen;