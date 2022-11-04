import 'react-native-gesture-handler'
import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import {getString} from "../../StringsArray";

function ButtonPrimary(props) {
    return (
        <Pressable style={[styles.button, styles.buttonPrimary]} onPress={props.onPress()}>
            <Text style={styles.textStyle}>props.children</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonPrimary: {
      backgroundColor: "#F194FF",
    },
    buttonSecondary: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    }
});
export default ButtonPrimary;
