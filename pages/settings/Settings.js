import 'react-native-gesture-handler'
import React, { useEffect, useState, useRef } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import {getStringValue} from "../../StringsArray";
import getGlobalColors from '../../Colors';
import SelectDropdown from 'react-native-select-dropdown';
import { getInputLanguage } from '../../Language';
import {updateLanguage} from "../../Database";
import AsyncStorage from '@react-native-async-storage/async-storage';

var colors = getGlobalColors();

function Settings() {  
  // TODO - pull these via API
  const languages = ["English", "Spanish"]; 

  const [Text_Welcome, setText_Welcome] = useState('');
  const [Text_SelectLanguage, setText_SelectLanguage] = useState('');
  const [Text_Logout, setText_Logout] = useState('');

  const[language, setLanguage] = useState('');
  const firstUpdate_Language = useRef(true);
  useEffect(() => {  
      // check if this is the first update (running on mount)
      if (firstUpdate_Language.current) {
        console.log('First Update of Language');

        // pull Language from Async Storage
        setLanguage(getInputLanguage());

        // set first update to false
        firstUpdate_Language.current = false;
      } else {
        console.log('Language Changed');
        // language changed, update

        // update user's settings on server via API
        // TODO - need to store user_id in Async Storage
        var user_id = -1;
        updateLanguage(user_id, language);

        // refresh strings
        getStringValue('settings_welcome').then((result)  => { 
          setText_Welcome(result); 
        }); 
        getStringValue('settings_selectLanguage').then((result)  => { 
          setText_SelectLanguage(result); 
        }); 
        getStringValue('settings_logout').then((result)  => { 
          setText_Logout(result); 
        }); 
      }
  }, [language]);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <Text style={{color: colors.backgroundTextPrimary}}>{Text_Welcome}</Text>
        <SelectDropdown
          data={languages}
          defaultButtonText={Text_SelectLanguage}
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
              return selectedItem
          }}
          rowTextForSelection={(item, index) => {
              return item
          }}
          buttonStyle={styles.dropdownButtonStyle}
          buttonTextStyle={styles.dropdownTextStyle}
        />
        <Button onPress={global.logout} title={Text_Logout}/>
    </View>      
  );
}


const styles = StyleSheet.create({
  dropdownButtonStyle: {
      backgroundColor: 'transparent',
      height: 40,
      width: '80%',
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

export default Settings;