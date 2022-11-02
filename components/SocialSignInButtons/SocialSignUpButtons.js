import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';
import { FacebookSocialButton, GoogleSocialButton, AppleSocialButton, MicrosoftSocialButton } from "react-native-social-buttons";
import getGlobalColors from '../../Colors';
import getString from "../../StringsArray";

var colors = getGlobalColors();
const SocialSignUpButtons = () => {
    const onSignUpFacebook = () => {
        console.warn("Facebook sign in pressed");
    };

    const onSignUpGoogle = () => {
        console.warn("Google sign in pressed");
    };

    const onSignUpApple = () => {
        console.warn("Apple sign in pressed");
    };
 
    return (
        <View>        
            <FacebookSocialButton onPress={() => {onSignUpFacebook()}} buttonViewStyle={styles.button} buttonText={getString('signin_facebook', global.language)} />
            <GoogleSocialButton onPress={() => {onSignUpGoogle()}} buttonViewStyle={styles.gbutton} buttonText={getString('signin_google', global.language)} />
            <AppleSocialButton onPress={() => {onSignUpApple()}} buttonViewStyle={styles.button} buttonText={getString('signin_apple', global.language)} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,    
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {alignSelf: 'center', margin: 5, flex: 1, justifyContent: "center", paddingBottom: 0, paddingTop: 0, borderRadius: 10,borderWidth: 1, borderColor: colors.backgroundTextSecondary },
    gbutton: {marginBottom: 1, alignSelf: 'center'},
    buttonLogo: {margin: 0},
    buttonText: {}
})

export default SocialSignUpButtons;