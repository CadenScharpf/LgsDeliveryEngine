import 'react-native-gesture-handler'
import React from 'react';
import { Text, View } from 'react-native';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';

var colors = getGlobalColors();

function Settings() {  
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundColor }}>
      <Text style={{color: colors.textColorPrimary}}>{getString('settings_welcome', global.language)}</Text>
    </View>
      
  );
}

export default Settings;