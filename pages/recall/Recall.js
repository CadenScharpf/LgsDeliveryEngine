import { withTheme } from '@rneui/themed';
import { Image, View, Text, useWindowDimensions, StyleSheet, ScrollView } from 'react-native';
import getGlobalColors from '../../Colors';
import LogoLight from '../../assets/images/lgs-logo.png';
import LogoDark from '../../assets/images/lgs-logo-dark.png'
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {getString} from "../../StringsArray";
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAppSettings} from "../../api/Database";

var colors = getGlobalColors();
var Logo = colors.background == '#ffffff' ? LogoLight:LogoDark;

const Recall = ({navigation, authNav}) => {
    const {height} = useWindowDimensions();
    const [recallReason, setrecallReason] = useState('');
    const [lotID, setlotID] = useState('');
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

    const onSendPressed = () => {
        console.warn("Send button pressed");
    }; 

return (
    <ScrollView style = {styles.container}>
        <View>
            <Image
                source={{uri:bannerURL}}
                style={[styles.logo, {height: height * 0.2}]} 
                resizeMode = "contain" 
            />
            
            <Text style={styles.title}>{getString('app_title_recall')}</Text>

            <CustomInput 
                placeholder={getString('recall_reason')}
                value={recallReason} 
                setValue={setrecallReason}
            />

            <CustomInput 
                placeholder='Lot ID'
                value={lotID} 
                setValue={setlotID}
            />

            <CustomButton 
                text={getString('send_recall')}
                onPress={onSendPressed} 
            />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    title: {
        color: '#000000',
        alignSelf: 'center',
    },
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

export default Recall;