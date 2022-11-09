import { withTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { Image, View, Text, useWindowDimensions, StyleSheet, ScrollView } from 'react-native';
import getGlobalColors from '../../Colors';
import Logo from '../../assets/images/lgs-logo.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {getString} from "../../StringsArray";
import SignInScreen from '../SignInScreen/SignInScreen';

var colors = getGlobalColors();

const ForgotPasswordScreen = ({navigation, authNav}) => {
    const {height} = useWindowDimensions();
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
        <View>
            <Image 
                source= {Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode = "contain" 
            />
            
            <Text style={styles.title}>Reset your password</Text>
            

            <CustomInput 
                placeholder={getString('forgotPassword_username')}
                value={username} 
                setValue={setUsername}
            />

            <CustomButton 
                text={getString('forgotPassword_send')}
                onPress={onSendPressed} 
            />

            <CustomButton 
                text={getString('forgotPassword_backToSignIn')}
                //onPress={onSignInPressed}
                onPress={() => {navigation.navigate('SignInScreen')}}
                type="TERTIARY"
            />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    /*root: {
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
    }*/
    root: {
        alignSelf: 'center',
        padding: 20,
    },
    logo: {
        width: '95%',
        maxWidth: 500,
        maxHeight: 300,
    },
    container: {
        backgroundColor: colors.background,
        flex: 1
    },
});

export default ForgotPasswordScreen;