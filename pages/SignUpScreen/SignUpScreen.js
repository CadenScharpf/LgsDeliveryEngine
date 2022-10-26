import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image, useWindowDimensions, TextInput } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import LogoLight from '../../assets/images/lgs-logo.png';
import LogoDark from '../../assets/images/lgs-logo-dark.png'
import SocialSignUpButtons from '../../components/SocialSignInButtons/SocialSignUpButtons';
import NavigationActions from 'react-navigation'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import getGlobalColors from '../../Colors';
import SelectList from 'react-native-dropdown-select-list';


var colors = getGlobalColors();
var Logo = colors.background == '#ffffff' ? LogoLight:LogoDark;

function SignUpScreen({ navigation }){
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [selected, setSelected] = React.useState('');

    const languageData = [  //data for dropdown menu for language choice in sign up
        {key: '1', value: 'English'},
        {key: '2', value: 'Spanish'}
    ];


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
                source={Logo} 
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

            <SelectList 
                data={languageData} 
                setSelected={setSelected}
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