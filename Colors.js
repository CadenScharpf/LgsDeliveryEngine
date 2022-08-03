'use strict';
const React = require('react');
const ReactNative = require('react-native');
import Platform from 'react-native/Libraries/Utilities/Platform';
const { DynamicColorIOS, PlatformColor, StyleSheet, Text, View } = ReactNative;

export default function getGlobalColors() {

    if (Platform.OS === 'ios') {
        return {
            primary: '#FFBB0B',
            primaryLight: '#FFDF8E',
            primaryDark: '#CB9303',
            secondary: '#63321C',
            secondaryLight: '#735243',
            secondaryDark: '#170F0C',
            backgroundColor: DynamicColorIOS({light: '#ffffff', dark: '#282a36'}),
        };
             
    } else if (Platform.OS === 'android') {
        return {
            primary: '#FFBB0B',
            primaryLight: '#FFDF8E',
            primaryDark: '#CB9303',
            secondary: '#63321C',
            secondaryLight: '#735243',
            secondaryDark: '#170F0C',
            backgroundColor:'#5d67a8',
        };
    } else {
        return {
            primary: '#FFBB0B',
            primaryLight: '#FFDF8E',
            primaryDark: '#CB9303',
            secondary: '#63321C',
            secondaryLight: '#735243',
            secondaryDark: '#170F0C',
            backgroundColor: '',
        };
    }
}

