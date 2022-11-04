import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Button, TouchableOpacity } from 'react-native';
import LogoLight from '../../assets/images/lgs-logo.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import getGlobalColors from '../../Colors';
import LogoDark from '../../assets/images/lgs-logo-dark.png'
import { getUserDetails, getAppSettings} from '../../Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getString} from "../../StringsArray";

import { MaterialCommunityIcons } from '@expo/vector-icons';

var colors = getGlobalColors();
var Logo = colors.background == '#ffffff' ? LogoLight:LogoDark;

const SignInScreen = ({navigation, authNav}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [userDetails, setUserDetails] = useState('');
    const {height} = useWindowDimensions();
    const [show, setShow] = React.useState(false);
    const [visible, setVisible] = React.useState(true);

    const [bannerURL, setBannerURL] = useState('');
    const [appSettings, setAppSettings] = useState();
    useEffect(() => {  
        getAppSettings(global.appVersion).then((result)  => { 
            console.log('getAppSettings result: ');
            console.log(result);

            var queryResults = JSON.parse(result);
             
            console.log('getAppSettings queryResults: ');
            console.log(queryResults);

            setAppSettings(queryResults.output); 
            console.log('setAppSettings called');
        }).catch((error) => { 
            console.log('getAppSettings failed, error: ');  
            console.log(error); 
        }); 
    }, []);

    useEffect(() => {  
        // check if appSettings is defined
        // NOTE: on the first run, it may not be 
        // given asynchronous nature of API call
        if (typeof appSettings !== 'undefined') {
            // appSettings is defined
            // set necessary variable(s)

            setBannerURL(appSettings[0].photoURLBanner);
            console.log('setBannerURL called');
        }
    }, [appSettings]);
   
    const onSignInPressed = () => {
        getUserDetails(username).then((result) => {
            console.warn(result);
            if(result[0] != "DNE" &&  result[0].password && result[0].password == password ) {
                AsyncStorage.setItem("userToken", JSON.stringify(result[0]) )
                var user = result[0]
                global.email = user.email ? user.email : ""
                global.accountType = user.accountType ? user.accountType :""
                global.language = user.language ? user.language : ""
                global.company = user.company ? user.company : ""
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
        <View>
            <Image 
                source={{uri:bannerURL}}
                style={[styles.logo, {height: height * 0.2}]} 
                resizeMode = "contain" 
            />
            <CustomInput 
                  placeholder={getString('signinscreen_email')}
                value={username} 
                setValue={setUsername}
            />
        </View>

        <View>
            <CustomInput 
                  placeholder={getString('signinscreen_password')}
                value={password} 
                setValue={setPassword}
                secureTextEntry={visible}
            />

            <TouchableOpacity style={styles.eyeIcon} onPress={
                () => {
                    setVisible(!visible)
                    setShow(!show)
                }
            }>
                <MaterialCommunityIcons
                    name={show === false ? 'eye-outline' : 'eye-off-outline' }
                    size={20}
                    color={'rgba(255,255,255,0.7)'}
                />
            </TouchableOpacity>
        </View>

        <View>
            <CustomButton 
                  text={getString('signinscreen_signIn')}
                onPress={() => { onSignInPressed()}} 
            />

            <CustomButton 
                  text={getString('signinscreen_forgotPassword?')}
                onPress={onForgotPasswordPressed}
                type="TERTIARY"
            />
            <CustomButton
                  text={getString('signinscreen_needAccount?')}
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
    eyeIcon: {
        position: 'absolute',
        right: 25,
        top: 22
    },
});

export default SignInScreen;