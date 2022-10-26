import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Button } from 'react-native';
import LogoLight from '../../assets/images/lgs-logo.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import getGlobalColors from '../../Colors';
import LogoDark from '../../assets/images/lgs-logo-dark.png'
import { getUserDetails } from '../../Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getString from "../../StringsArray";
 
var colors = getGlobalColors();
var Logo = colors.background == '#ffffff' ? LogoLight:LogoDark;

const SignInScreen = ({navigation, authNav}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState('');
    const {height} = useWindowDimensions();
   
    const onSignInPressed = () => {
        getUserDetails(username).then((result) => {
            console.warn(result);
            if(result[0] != "DNE" &&  result[0].password && result[0].password == password ) {
                AsyncStorage.setItem("userToken", JSON.stringify(result[0]) )
                var user = result[0]
                global.email = user.email ? user.email : ""
                global.accountType = user.accountType ? user.accountType :""
                global.language = user.language ? user.language : ""
                global.company = user.company ?user.company : ""
                global.lastName = user.lastName ? user.company : ""
                global.firstName = user.firstName ? user.firstName : ""
                global.password = user.password ? user.password : ""
                //
                global.gotoapp()
            }

          })
    };

    const onForgotPasswordPressed = () => {
        console.warn("Forgot password pressed");
    };
    
    const onSignUpPressed = () => {
        console.warn("Sign up pressed");
    };

  return (
    <ScrollView style={styles.container}>
        <View >
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode = "contain" 
            />
            <CustomInput 
                placeholder="Email" 
                value={username} 
                setValue={setUsername}
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry
            />

            <CustomButton 
                text="Sign In" 
                onPress={() => { onSignInPressed()}} 
            />

            <CustomButton 
                text="Forgot password?" 
                onPress={onForgotPasswordPressed}
                type="TERTIARY"
            />
            <CustomButton
                text="Don't have an account? Create one" 
                onPress={() => { navigation.goBack();}}
                type="TERTIARY"
            />

            <SocialSignInButtons />

            
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    root: {
        alignSelf: 'center',
        padding: 20,
    },
    logo: {
        width: '95%',
        maxWidth: 500,
        maxHeight: 300,
        margin:0,
        padding: 0
    },
    container: {
        backgroundColor: colors.background,
        flex: 1
    },
});

export default SignInScreen;