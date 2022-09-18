'use strict';
const React = require('react');
const ReactNative = require('react-native');
import Platform from 'react-native/Libraries/Utilities/Platform';
const { DynamicColorIOS, PlatformColor, StyleSheet, Text, View } = ReactNative;

export default function getGlobalColors() {

    if (Platform.OS === 'ios') {
        return {
            background: DynamicColorIOS({light: '#ffffff', dark: '#282a36'}),
            backgroundTextPrimary: DynamicColorIOS({light: '#282a36', dark: '#ffffff'}),
            backgroundTextSecondary: DynamicColorIOS({light: '#8a8888', dark: '#dbdbdb'}),

            foreground: DynamicColorIOS({light: '#EEEEEE', dark: '#44475a'}),
            foregroundTextPrimary: DynamicColorIOS({light: '#000000', dark: '#f8f8f2'}),
            foregroundTextSecondary: DynamicColorIOS({light: '#8a8888', dark: '#dbdbdb'}),
        };
    } else if (Platform.OS === 'android') {
        return {
            background: '#ffffff',
            backgroundTextSecondary: '#8a8888',
            backgroundTextPrimary: '#282a36',
            foreground: '#EEEEEE',
            foregroundTextPrimary: '#000000',
            foregroundTextSecondary: '#8a8888',
        };
    } else {
        return {
            background: '#ffffff',
            backgroundTextSecondary: '#8a8888',
            backgroundTextPrimary: '#282a36',
            foreground: '#EEEEEE',
            foregroundTextPrimary: DynamicColorIOS({light: '#000000', dark: '#000000'}),
            foregroundTextSecondary: DynamicColorIOS({light: '#8a8888', dark: '#dbdbdb'}),
        };
    }
    
}

