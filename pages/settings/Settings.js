import 'react-native-gesture-handler'
import React from 'react';
import { Text, View } from 'react-native';
import getString from "../../StringsArray";

function Settings() {  
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{getString('settings_welcome', global.language)}</Text>
    </View>
      
  );
}

export default Settings;