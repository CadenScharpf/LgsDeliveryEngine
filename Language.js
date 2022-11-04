import AsyncStorage from '@react-native-async-storage/async-storage';

const debugging_option = true;

async function getInputLanguage() {
    if (debugging_option) {
        console.log('getInputLanguage called');
    }

    // default to English
    inputLanguage = "english";

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

export {getInputLanguage}