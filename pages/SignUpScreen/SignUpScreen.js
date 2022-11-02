import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image, useWindowDimensions, TextInput } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import LogoLight from '../../assets/images/lgs-logo.png';
import LogoDark from '../../assets/images/lgs-logo-dark.png'
import SocialSignUpButtons from '../../components/SocialSignInButtons/SocialSignUpButtons';
import NavigationActions from 'react-navigation'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';
import getGlobalColors from '../../Colors';
import getString from "../../StringsArray";

import {addUser, getAllUsersByAccountType, getAppSettings} from "../../Database";

var colors = getGlobalColors();
var Logo = colors.background == '#ffffff' ? LogoLight:LogoDark;

function SignUpScreen({ navigation }){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const[accountType, setAccountType] = useState(''); 
    const[language, setLanguage] = useState('');
    const[company, setCompany] = useState('');
       
    const languages = ["English", "Spanish"]; 
    const accountTypes = ["Consumer", "Retailer", "Distributor", "Manufacturer"];
    const companies = ["Consumer", "Walmart", "PHXDistribution", "LGS", "Philly's Farm", "Hardee Greens"];

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
            // set necessary variables

            setBannerURL(appSettings[0].photoURLBanner);
            console.log('setBannerURL called');

            setCompany(appSettings[0].companyName); 
            console.log('setCompany called');
        }
    }, [appSettings]);

    const {height} = useWindowDimensions();

    const onRegisterPressed = () => {
        console.warn("Register button pressed");
    };
     
    const onSignUpPressed = () => {
        addUser(firstName, lastName, email, password, accountType, language, company).then((result) => {
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
                source={{uri:bannerURL}}
                style={[styles.logo, {height: height * 0.2}]} 
                resizeMode = "contain" 
            />

            <CustomInput 
                placeholder={getString('signupscreen_firstName', global.language)}
                value={firstName} 
                setValue={setFirstName}
            />

            <CustomInput 
                placeholder={getString('signupscreen_lastName', global.language)}
                value={lastName} 
                setValue={setLastName}
            />

            <CustomInput 
                style={[styles.input]}
                placeholder={getString('signupscreen_email', global.language)}
                value={email} 
                setValue={setEmail}
            />

            <CustomInput 
                placeholder={getString('signupscreen_password', global.language)}
                value={password} 
                setValue={setPassword}
                secureTextEntry
            />

            <CustomInput 
                placeholder={getString('signupscreen_repeatPassword', global.language)}
                value={passwordRepeat} 
                setValue={setPasswordRepeat}
                secureTextEntry
            />
            
            <SelectDropdown
                data={companies}
                defaultButtonText={getString('signupscreen_company', global.language)}
                onSelect={(selectedItem, index) => {
                    setCompany(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.dropdownTextStyle}
            />

            <SelectDropdown
                data={accountTypes}
                defaultButtonText={getString('signupscreen_accountType', global.language)}
                onSelect={(selectedItem, index) => {
                    setAccountType(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.dropdownTextStyle}
            />

            <SelectDropdown
                data={languages}
                defaultButtonText={getString('signupscreen_selectLanguage', global.language)}
                onSelect={(selectedItem, index) => {
                    setLanguage(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.dropdownTextStyle}
            />

            <CustomButton
                text={getString('signupscreen_register', global.language)}
                //onPress={() => {navigation.navigate('SignInScreen')}} 
                onPress={() => { onSignUpPressed()}} 
            />

            <CustomButton
                text={getString('signupscreen_hasAccount', global.language)}
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
        padding: 10,
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
        marginVertical: 5,
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
        flex: 1
    },
    dropdownButtonStyle: {
        backgroundColor: 'transparent',
        height: 40,
        width: '94%',
        margin: 12,
        borderWidth: 1,
        padding: 5,
    },
    dropdownTextStyle: {
        color: 'gray', 
        textAlign: 'auto',
        fontSize: 14
    },
});

export default SignUpScreen;