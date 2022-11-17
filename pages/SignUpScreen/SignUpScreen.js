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
import {getString, getStringValue} from "../../StringsArray";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {addUser, getAllUsersByAccountType, getAppSettings} from "../../api/Database";

var colors = getGlobalColors();
var Logo = colors.background == '#ffffff' ? LogoLight:LogoDark;
var currentText = '';

function SignUpScreen({ navigation }){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const[accountType, setAccountType] = useState(''); 
    const[language, setLanguage] = useState('');
    const[company, setCompany] = useState('');
    
    // TODO - pull these via API
    // TODO - account type will need to support multiple languages
    const languages = ["English", "Spanish"]; 
    const accountTypes = ["Consumer", "Retailer", "Distributor", "Food Servicer", "Manufacturer"];
    const companies = ["Consumer", "Walmart", "PHXDistribution", "LGS", "Philly's Farm", "Hardee Greens"];

    const [Placeholder_firstname, setPlaceholder_firstname] = useState('');
    const [Placeholder_lastname, setPlaceholder_lastname] = useState('');
    const [Placeholder_email, setPlaceholder_email] = useState('');
    const [Placeholder_password, setPlaceholder_password] = useState('');
    const [Placeholder_repeatPassword, setPlaceholder_repeatPassword] = useState('');
    const [Placeholder_company, setPlaceholder_company] = useState('');
    const [Placeholder_accountType, setPlaceholder_accountType] = useState('');
    const [Placeholder_register, setPlaceholder_register] = useState('');
    const [Placeholder_hasAccount, setPlaceholder_hasAccount] = useState('');
    const [Placeholder_selectLanguage, setPlaceholder_selectLanguage] = useState('');
    const [Text_termsintro, setText_termsintro] = useState('');
    const [Text_terms, setText_terms] = useState('');
    const [Text_privacy, setText_privacy] = useState('');
    const [Text_and, setText_and] = useState('');
    useEffect(() => {  
        // language changed, update strings
        getStringValue('signupscreen_firstName').then((result)  => { 
            setPlaceholder_firstname(result); 
        }); 
        getStringValue('signupscreen_lastName').then((result)  => { 
            setPlaceholder_lastname(result); 
        }); 
        getStringValue('signupscreen_email').then((result)  => { 
            setPlaceholder_email(result); 
        });
        getStringValue('signupscreen_password').then((result)  => { 
            setPlaceholder_password(result); 
        });
        getStringValue('signupscreen_repeatPassword').then((result)  => { 
            setPlaceholder_repeatPassword(result); 
        });
        getStringValue('signupscreen_company').then((result)  => { 
            setPlaceholder_company(result); 
        });
        getStringValue('signupscreen_accountType').then((result)  => { 
            setPlaceholder_accountType(result); 
        });
        getStringValue('signupscreen_register').then((result)  => { 
            setPlaceholder_register(result); 
        });
        getStringValue('signupscreen_hasAccount').then((result)  => { 
            setPlaceholder_hasAccount(result); 
        });
        getStringValue('signupscreen_selectLanguage').then((result)  => { 
            setPlaceholder_selectLanguage(result); 
        });
        getStringValue('signupscreen_termsintro').then((result)  => { 
            setText_termsintro(result); 
        });
        getStringValue('signupscreen_terms').then((result)  => { 
            setText_terms(result); 
        });
        getStringValue('signupscreen_privacy').then((result)  => { 
            setText_privacy(result); 
        });
        getStringValue('signupscreen_and').then((result)  => { 
            setText_and(result); 
        });
    }, [language]);

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

            setCompany(appSettings[0].companyName); 
            console.log('setCompany called');
        }
    }, [appSettings]);

    const {height} = useWindowDimensions();

    const onRegisterPressed = () => {
        console.warn("Register button pressed");
    };
     
    const onSignUpPressed = () => {
        // TODO - confirm all fields got filled out

        // TODO - confirm passwords match

        addUser(firstName, lastName, email, password, accountType, language, company).then((result) => {
            console.log(result);
            var result_json = JSON.parse(result);
            if (result.length == 0) {
                console.log('API Response Issue');
            } else if (result_json.response_code == 200) {
                console.log('Successful Sign Up'); 

                global.email = email
                global.accountType = accountType
                global.language = language
                global.company = company
                global.lastName = lastName
                global.firstName = firstName
                global.password = password
                
                global.gotoapp()
            } else {
                console.log('Undetected API Issue');
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
            
            <SelectDropdown
                data={languages}
                defaultButtonText={Placeholder_selectLanguage}
                onSelect={(selectedItem, index) => {
                    setLanguage(selectedItem);
                
                    // update asyncStorage
                    AsyncStorage.setItem("storedLanguage", selectedItem);
                    // update global language variable 
                    // this could be used for a non-async version 
                    // for pages where language setting is not modifiable
                    global.language = selectedItem;
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

              {/* Took this out, thought left aligned looked better, justifyContent: 'center' */}
              <View style={{ flexDirection: "row"}}>
                      <CustomInput style={{ flex: 1 }}
                          placeholder={Placeholder_firstname}
                          value={firstName}
                          setValue={setFirstName}
                      />                  
                      <CustomInput  style={{ flex: 1 }}
                          placeholder={Placeholder_lastname}
                          value={lastName}
                          setValue={setLastName}
                      />
                  </View>

            <CustomInput 
                placeholder={Placeholder_email}
                style={[styles.input]}
                value={email} 
                setValue={setEmail}
            />

            <CustomInput 
                placeholder={Placeholder_password}
                value={password} 
                setValue={setPassword}
                secureTextEntry
            />
            
            <SelectDropdown
                data={companies}
                defaultButtonText={Placeholder_company}
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
                defaultButtonText={Placeholder_accountType}
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

            <CustomButton
                text={Placeholder_register}
                onPress={() => { onSignUpPressed()}} 
            />

            <CustomButton
                text={Placeholder_hasAccount}
                onPress={() => {navigation.navigate('SignInScreen')}}
                type="TERTIARY"
            />
            <SocialSignUpButtons />
            <Text style={styles.text}>{Text_termsintro} 
                <Text style={styles.link} onPress={onTermsOfUsePressed}> {Text_terms}</Text> {Text_and}
                <Text style={styles.link} onPress={onPrivacyPolicyPressed}> {Text_privacy}</Text>
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