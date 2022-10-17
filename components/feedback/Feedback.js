import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Keyboard, TextInput, Modal, Button, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';

var colors = getGlobalColors();

export default function App() {

  const[productName, setProductName] = useState(global.feedbackProduct ? global.feedbackProduct : '');
  const[productExpirationDate, setProductExpirationDate] = useState(global.feedbackExpirationDate ? global.feedbackExpirationDate :'');
  const[productRating, setProductRating] = useState('');
  const[additionalcomments, setAdditionalComments] = useState('');
  const[lotid, setlotid] = useState(global.feedbackLotId ? global.feedbackLotId : '');

  return (
    <View style={style.container}>
      
          <TextInput 
              style = {inputStyle.input}
              placeholder = {getString('feedback_productname', global.language)}
              onChangeText = {setProductName}
              value={productName}
              />  
               <TextInput 
              style = {inputStyle.input}
              placeholder = {'lot id'}
              onChangeText = {setlotid}
              value={String(lotid)}
              />
            <TextInput 
              style = {inputStyle.input}
              placeholder = {getString('feedback_expirationdate', global.language)}
              onChangeText = {setProductExpirationDate}
              value={productExpirationDate}
              />
              <TextInput 
              style = {inputStyle.input}
              placeholder = {getString('feedback_rating', global.language)}
              onChangeText = {setProductRating}
              numberOfLines={4}
              value={productRating}
              /> 
             <TextInput 
              multiline
              style = {inputStyle.input}
              placeholder = {getString('feedback_additionalcomment', global.language)}
              onChangeText = {setAdditionalComments}
              numberOfLines={4}
              value={additionalcomments}
              />
               
            
          <Button onPress = {()=>{}} title = {getString('feedback_submit', global.language)} color = 'black' />
      </View>
  );
}


const stylez = StyleSheet.create({
  
  container: {
    marginTop:30,
    padding:20,
    backgroundColor: colors.background
  },

  
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  
  },
  content:{
    flex:1,
    padding: 40,

  },
  list: {
    flex:1,
    marginTop: 20,
  },
});

const inputStyle = StyleSheet.create({
  input: {
      marginBottom: 10,
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd'
  }
})

const stylesToDoItem = StyleSheet.create({
  item:{
      padding: 16,
      marginTop: 16,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
  }
})

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    
  },
    textStyle: {
      textAlign: 'center',
      fontSize: 23
    },
    customRatingBarStyle:{
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop:30
    },
    starImgStyle: {
      width: 40,
      height: 40,
      resizeMode: 'cover'
    }
});





