import 'react-native-gesture-handler'
import React from 'react';
import { Button, Text, View } from 'react-native';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';

var colors = getGlobalColors();

function Settings() {  
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{color: colors.backgroundTextPrimary}}>{getString('settings_welcome', global.language)}</Text>
      <Button onPress={global.logout} title="Logout"/>
      
    </View>
      
  );
}

export default Settings;