import AsyncStorage from '@react-native-async-storage/async-storage';

const debugging_option = false;

async function getInputLanguage() {
    if (debugging_option) {
        console.log('getInputLanguage called');
    }

    // default to English
    var inputLanguage = "english";

    const result = await AsyncStorage.getItem('storedLanguage');
    if (result) {
        if (debugging_option) {
            console.log('result: ');
            console.log(result);
        }
        inputLanguage = result;
    } else {
        if (debugging_option) {
            console.log('result error, default');
        }
    }    

    inputLanguage = inputLanguage.trim();
    inputLanguage = inputLanguage.toLowerCase();

    if (debugging_option) {
        console.log('returning: ');
        console.log(inputLanguage);
    }

    return inputLanguage;
}

function getGlobalLanguage() {
    if (debugging_option) {
        console.log('getGlobalLanguage called');
    }

    // default to English
    var inputLanguage = "english";

    if (global.language === undefined) {
        if (debugging_option) {
            console.log('Global Variable Language not defined, returning default');
        }
    } else {
        inputLanguage = global.language;
    }

    inputLanguage = inputLanguage.trim();
    inputLanguage = inputLanguage.toLowerCase();

    if (debugging_option) {
        console.log('returning: ');
        console.log(inputLanguage);
    }

    return inputLanguage;
}

export {getInputLanguage, getGlobalLanguage}