import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, 
  WebView, 
  Linking
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { createStackNavigator } from '@react-navigation/stack';
import getGlobalColors from '../../Colors';
import { getAllProducts, getProductDetails } from '../../Database';

var colors = getGlobalColors();
var defaultThumbnail = require("./tomato.jpg")
var tomatoImg = require("./lettuce.webp")
var cucumnerImg = require("./chives.webp")
var croutonImg = require("./cilantro.webp")
var thumbs = [tomatoImg, cucumnerImg, croutonImg]
var urls = ["https://localgrownsalads.com/product/blade-oakleaf-lettuce/","https://localgrownsalads.com/product/chives/", "https://localgrownsalads.com/product/cilantro/"]



export default class Product extends Component {
  constructor(props){
    super()
    this.label = props.src.product_description
    this.shelfLife = props.src.bestBeforeDays
    this.desc = props.src.product_specification
    this.id = props.src.id
  } 


  render() {
        return (
          <TouchableOpacity style={styles.card} onPress={() => {Linking.openURL( urls[this.id-1] );}}>
            <Image
            resizeMode={'cover'}
              style={styles.thumb}
              source={thumbs[this.id-1]}            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{this.label}</Text>
              <Text style={styles.sub}>Shelf life: {this.shelfLife} days</Text>
              <Text style={styles.sub}>Description: {this.desc}</Text>
            </View>
    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  

  textDescription: {
    marginLeft: 10,
    color: colors.foregroundTextPrimary
  },
  card: {
    backgroundColor: colors.foreground,
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
  height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.foregroundTextPrimary
  },
  sub: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.foregroundTextPrimary
  },
});
