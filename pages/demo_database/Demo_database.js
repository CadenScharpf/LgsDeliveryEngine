import 'react-native-gesture-handler'
import { StyleSheet, View} from 'react-native';
import React, { Component } from "react";
import {checkForRecall, getAppSettings, addFeedback, updateFeedback, getFeedbackByContentUserId, addUser, checkSignIn, getLotDetails, getProductId, deleteProduct, addProduct, getAllQRScans, getAllProducts, getAllUsers, getAllUsersByAccountType, getPalletDetails, getBoxDetails, getProductDetails} from "../../Database";

class Demo_database extends Component {
  constructor(props) {
    console.log('Demo Database Constructor Called');

    super(props);
    this.state={
    }  
    
    this.fetchData();
  }

  fetchData = async () => {
    // getProductId('crouton')
    // getAllQRScans(1)
    // getAllUsersByAccountType('consumer')
    // getAllUsers()
    // getAllProducts()
    // getPalletDetails(1)
    // getBoxDetails(2)
    // getProductDetails(3)
    // getProductId('Pesto Basil')
    // getLotDetails(1)
    // checkSignIn('zale@localgrownsalads.com','LGS2'), 
    // addUser('Joseph','Harrington','test@gmail.edu','test123','consumer','english','Consumer')
    // getFeedbackByContentUserId('box', 2, 3)
    // getAppSettings("1.0") 
    checkForRecall(1)
    .then((result) => {
      console.log('Fetch Data Then: ' + result);
      this.setState({response_data: JSON.parse(result)});
    }).catch((error) => {
      console.log('Fetch Data ERROR RESPONSE: ' + error);
    });
    console.log('After Fetch Data: ' + JSON.stringify(this.state.response_data));
  }

  render() {
    return (
      <View style={styles.container}>
      </View >
    )
  }
}
export default Demo_database

const styles = StyleSheet.create({
  container: {
    marginTop: 50, 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});