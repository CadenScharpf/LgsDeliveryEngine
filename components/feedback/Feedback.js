import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Keyboard, TextInput, Modal, Button, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';

var colors = getGlobalColors();

export default function App() {
  const [todos, setTodos] = useState([
    
  ]);

  
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key)
    });
  }

  const submitHandler = (text, myText, meText, muText) => {
    setTodos((prevTodos) => {
      return [
        {text: text, myText, meText, muText, key: Math.random().toString() },
        
        ...prevTodos
      ]
    })
  }

  const [open, setOpen] = useState(false)
  return (
    <TouchableWithoutFeedback onPress = {() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
    <View style={styles.container}>
    <Text></Text>
    <Text style = {{fontSize: 25, textAlign:"center", fontWeight: "bold", height:60, paddingTop:20, backgroundColor:'springgreen'}}> Feedback <View style={styles.container}>
    <Image style = {{width:65, height:65}} resizeMode="contain" source = {{uri: 'https://yt3.ggpht.com/ytc/AKedOLR09NFnVQ2Wdo8kmX82XOLW0FOJM7pAkPGpqoRe=s900-c-k-c0x00ffffff-no-rj'}}/>
    </View></Text>
    
   
    <Button title = {getString('feedback_accessfeedbackform', global.language)} color = 'black' onPress = {() => setOpen(true)} >
          </Button>
      
      <Modal visible = {open}>
          <View style = {stylez.container}>
          <Text style = {{textAlign:"center", fontWeight: "bold"}}>{getString('feedback_form', global.language)}</Text>
            
            
            <Text> </Text>



            <Button title = {getString('feedback_close', global.language)} onPress = {() => setOpen(false)} />
            <Text />
            <AddTodo submitHandler = {submitHandler}/>
            
          </View>

        </Modal>


      <View style = {styles.content}>
       
        <View style = {styles.list}>
          <FlatList
            data={todos}
            renderItem = {({ item }) => (
              <TodoItem item = {item} pressHandler = {pressHandler} />
            )}
          />


        </View>
      </View>
    
    </View>
    </TouchableWithoutFeedback>
  );
}

function AddTodo({submitHandler}){
  const[text, setText] = useState('');
  const[myText, getText] = useState('');
  const[meText, doText] = useState('');
  const[muText, didText] = useState('');
  
  
  const changeHandler = (val) => {
      setText(val);
  }

  const changHandler = (value) => {
    getText(value);
  }
  const chanHandler = (value) => {
    doText(value);
  }

  const chaHandler = (value) => {
    didText(value);
  }
  return(
      <View>
          <TextInput 
              style = {stylesAddToDo.input}
              placeholder = {getString('feedback_productname', global.language)}
              onChangeText = {changeHandler}
              />  
            <TextInput 
              style = {stylesAddToDo.input}
              placeholder = {getString('feedback_expirationdate', global.language)}
              onChangeText = {changHandler}
              />
             <TextInput 
              style = {stylesAddToDo.input}
              placeholder = {getString('feedback_additionalcomment', global.language)}
              onChangeText = {chanHandler}
              />
              <TextInput 
              style = {stylesAddToDo.input}
              placeholder = {getString('feedback_rating', global.language)}
              onChangeText = {chaHandler}
              />  
            
          <Button onPress = {() => submitHandler(text, myText, meText, muText)} title = {getString('feedback_submit', global.language)} color = 'black' />
      </View>
  )
}



function TodoItem({ item, pressHandler }){
  const [defaultRating, setdefaultRating] = useState(item.muText)
  const [maxRating, setmaxRating] = useState([1,2,3,4,5])

  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
  return (
    
      <TouchableOpacity onPress = {() => pressHandler(item.key)}>
          <View style = {stylesToDoItem.item}>
          <MaterialIcons name = 'delete' size = {18} color = '#333' />
          <Text>{item.text}</Text>
          <Text>{item.myText}</Text>
          <Text>{item.meText}</Text>
          <View style = {styler.customRatingBarStyle}>
        {
          maxRating.map((item, muText) => {
            return(
              <TouchableOpacity activeOpacity = {0.7} key = {item} onPress ={() => setdefaultRating(item)}>
                <Image style = {styler.starImgStyle} source = {item <= defaultRating ? {uri:starImgFilled} : {uri:starImgCorner}} />
              </TouchableOpacity>
            )
          })
        }
      </View>
          
         
         
          </View>
      </TouchableOpacity> 
  )
}

const stylez = StyleSheet.create({
  
  container: {
    marginTop:30,
    padding:20,
    backgroundColor: colors.backgroundColor
  },

  
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  
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

const stylesAddToDo = StyleSheet.create({
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

const styler = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
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





