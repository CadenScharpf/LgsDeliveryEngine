import 'react-native-gesture-handler'
import React, { useEffect, useState, useRef } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import {getString} from "../../StringsArray";
import getGlobalColors from '../../Colors';
import SelectDropdown from 'react-native-select-dropdown';

var colors = getGlobalColors();

function Settings() {  
  // TODO - pull these via API
  const languages = ["English", "Spanish"]; 

  const[language, setLanguage] = useState('');
  const firstUpdate_Language = useRef(true);
  useEffect(() => {  
      // check if this is the first update (running on mount)
      if (firstUpdate_Language.current) {
        console.log('First Update of Language');
        // TODO - pull Language from user Settings

        // set first update to false
        firstUpdate_Language.current = false;
      } else {
        console.log('Language Changed');
        // language changed, update

        // TODO - update via API

        // TODO - update locally 

      }
  }, [language]);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <Text style={{color: colors.backgroundTextPrimary}}>{getString('settings_welcome')}</Text>
        <SelectDropdown
          data={languages}
          defaultButtonText={getString('settings_selectLanguage')}
          onSelect={(selectedItem, index) => {
              setLanguage(selectedItem)
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
        <Button onPress={global.logout} title={getString('settings_logout')}/>
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