import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';
import { FacebookSocialButton, GoogleSocialButton, AppleSocialButton, MicrosoftSocialButton } from "react-native-social-buttons";
import getGlobalColors from '../../Colors';

var colors = getGlobalColors();
const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn("Facebook sign in pressed");
    };

    const onSignInGoogle = () => {
        console.warn("Google sign in pressed");
    };

    const onSignInApple = () => {
        console.warn("Apple sign in pressed");
    };

    return (
        <View>
        
            <FacebookSocialButton onPress={() => {onSignInFacebook()}} buttonViewStyle={styles.button}  />
            <GoogleSocialButton onPress={() => {onSignInGoogle()}} buttonViewStyle={styles.gbutton}  />
            <AppleSocialButton onPress={() => {onSignInApple()}} buttonViewStyle={styles.button}  />
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

export default SocialSignInButtons;