import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image, useWindowDimensions, TextInput } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import LogoLight from '../../assets/images/lgs-logo.png';
import LogoDark from '../../assets/images/lgs-logo-dark.png'
import SocialSignUpButtons from '../../components/SocialSignInButtons/SocialSignUpButtons';
import NavigationActions from 'react-navigation'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import getGlobalColors from '../../Colors';
import {getAppSettings} from "../../Database";

var colors = getGlobalColors();
var Logo = colors.background == '#ffffff' ? LogoLight:LogoDark;

function SignUpScreen({ navigation }){
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();

    const [appSettings, setAppSettings] = useState();
    useEffect(() => {
        getAppSettings(global.appVersion).then((result)  => {
            var queryResults = JSON.parse(result);
            console.log('Query Results: ');
            console.log(queryResults.output);

            setAppSettings(queryResults.output); 
            console.log('appSettings: ');
            console.log(appSettings);
            // console.log('appSettings.photoURLBanner: ');
            // console.log(appSettings[0].photoURLBanner);
        }).catch((error) => {
            console.log('getAppSettings failed');
        });
    }, []);

    const {height} = useWindowDimensions();

    const onRegisterPressed = () => {
        console.warn("Register button pressed");
    };
    
    const onSignInPressed = () => {
        console.warn("Sign in pressed");
    };

    const onTermsOfUsePressed = () => {
        console.warn("Terms of Use pressed");
    };

    const onPrivacyPolicyPressed = () => {
        console.warn("Privacy Policy pressed");
    };

  return (
    <ScrollView>
        <View style={styles.container}>
        <Image 
                // /* hardcoded
                // appVersion 1.0
                source={{uri:'https://i2.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/lfs-logo-tight-crop-e1454958460180.png?fit=190%2C69&ssl=1'}}
                // appVersion 2.0
                // source={{uri:'https://previews.123rf.com/images/newdesignillustrations/newdesignillustrations1902/newdesignillustrations190211430/125451478-generic-text-on-a-ribbon-designed-with-white-caption-and-blue-tape-vector-banner-with-generic-tag-on.jpg'}}
                // */
                /* TODO - need to make this dynamic, need to await async above otherwise this isn't defined the first time the app loads
                source={{uri:appSettings[0].photoURLBanner}}
                */
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode = "contain" 
            />

            <TextInput  
                placeholder="Username" 
                value={username} 
                onChangeText={setUsername}
                style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    color: colors.backgroundTextPrimary
                }}
            />

            <CustomInput 
                placeholder="Email" 
                value={email} 
                setValue={setEmail}
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry
            />

            <CustomInput 
                placeholder="Repeat Password" 
                value={passwordRepeat} 
                setValue={setPasswordRepeat}
                secureTextEntry
            />

            <CustomButton
                text="Register" 
                onPress={() => {navigation.navigate('SignInScreen')}} 
            />

            <CustomButton
                text="Have an account? Sign in" 
                onPress={() => {navigation.navigate('SignInScreen')}}
                type="TERTIARY"
            />
            <SocialSignUpButtons />
            <Text style={styles.text}>By registering, you confirm that you accept our 
                <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use</Text> and
                <Text style={styles.link} onPress={onPrivacyPolicyPressed}> Privacy Policy</Text>
            </Text>

             
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
        margin: 0
    },
    text: {
        color: 'gray',
        marginVertical: 10,
        marginHorizontal: 20,
        textAlign: 'center'
    },
    link: {
        color: '#FDB075'
    },
    logo: {
        width: '95%',
        maxWidth: 500,
        maxHeight: 200,
        margin:0,
        padding: 0
    },
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
});

export default SignUpScreen;