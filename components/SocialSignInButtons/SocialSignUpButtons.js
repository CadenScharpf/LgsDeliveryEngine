import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';
import { FacebookSocialButton, GoogleSocialButton, AppleSocialButton, MicrosoftSocialButton } from "react-native-social-buttons";
import getGlobalColors from '../../Colors';

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
        
            <FacebookSocialButton onPress={() => {onSignUpFacebook()}} buttonViewStyle={styles.button} buttonText={"Sign up with facebook"} />
            <AppleSocialButton onPress={() => {onSignUpApple()}} buttonViewStyle={styles.button} buttonText={"Sign up with apple"} />
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
    gbutton: {},
    buttonLogo: {margin: 0},
    buttonText: {}
})

export default SocialSignUpButtons;