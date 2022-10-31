import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Keyboard, TextInput, Modal, Button, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import getString from "../../StringsArray";
import getGlobalColors from '../../Colors';
import { AirbnbRating } from "@rneui/themed";

var colors = getGlobalColors();

export default function App() {

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>  
              <Example></Example>
          </View>  
  );
}


function Example() {
  const [todos, setTodos] = useState([
    
  ]);
  
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key)
    });
  }

  const submitHandler = (productName, productExpirationDate, productRating, additionalcomments, lotid) => {
    setTodos((prevTodos) => {
      return [
        {text: productName, productExpirationDate, productRating, additionalcomments, lotid, key: Math.random().toString() },
        
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
    <Text style = {{fontSize: 25, textAlign:"center", fontWeight: "bold", height:60, paddingTop:20, paddingBottom:10, backgroundColor:'springgreen'}}> Feedback <View style={styles.container}>
    <Image style = {{width:65, height:65}} resizeMode="contain" source = {{uri: 'https://yt3.ggpht.com/ytc/AKedOLR09NFnVQ2Wdo8kmX82XOLW0FOJM7pAkPGpqoRe=s900-c-k-c0x00ffffff-no-rj'}}/>
    </View></Text>
    
   
    <Button title = "Click to Access Form" color = 'black' onPress = {() => setOpen(true)} >
          </Button>
      
      <Modal visible = {open}>
          <View style = {stylez.container}>
          <Text style = {{textAlign:"center", fontWeight: "bold"}}> Feedback Form</Text>
            
            
            <Text> </Text>



            <Button title = "Close" onPress = {() => setOpen(false)} />
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
    const[productName, setProductName] = useState(global.feedbackProduct ? global.feedbackProduct : '');
    const[productExpirationDate, setProductExpirationDate] = useState(global.feedbackExpirationDate ? global.feedbackExpirationDate :'');
    const[productRating, setProductRating] = useState('');
    const[additionalcomments, setAdditionalComments] = useState('');
    const[lotid, setlotid] = useState(global.feedbackLotId ? global.feedbackLotId : '');
  
  
  return(
      <View>
          <TextInput 
              style = {stylesAddToDo.input}
              placeholder = {getString('feedback_productname', global.language)}
              onChangeText = {setProductName}
              value={productName}
              />  
            <TextInput 
              style = {stylesAddToDo.input}
              placeholder = {'lot id'}
              onChangeText = {setlotid}
              value={String(lotid)}
              />
             <TextInput 
              style = {stylesAddToDo.input}
              placeholder = {getString('feedback_expirationdate', global.language)}
              onChangeText = {setProductExpirationDate}
              value={productExpirationDate}
              />
              <TextInput 
              style = {stylesAddToDo.input}
              placeholder = {getString('feedback_rating', global.language)}
              onChangeText = {setProductRating}
              numberOfLines={4}
              value={productRating}
              />  
              <TextInput 
              multiline
              style = {stylesAddToDo.input}
              placeholder = {getString('feedback_additionalcomment', global.language)}
              onChangeText = {setAdditionalComments}
              numberOfLines={4}
              value={additionalcomments}
              />
              <AirbnbRating />
               
            
          <Button onPress = {() => submitHandler(productName, productExpirationDate, productRating, additionalcomments, lotid)} title = 'Submit' color = 'black' />
      </View>
  )
}



function TodoItem({ item, pressHandler }){
  const [defaultRating, setdefaultRating] = useState(item.productRating)
  const [maxRating, setmaxRating] = useState([1,2,3,4,5])
  const [rating, setRating] = useState('User Rating Comment.')

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
          
          maxRating.map((item) => {
         
            return(
              <TouchableOpacity activeOpacity = {0.7} key = {item} onPress ={() => setdefaultRating(item)}>
                <Image style = {styler.starImgStyle} source = {item <= defaultRating ? {uri:starImgFilled} : {uri:starImgCorner}} />
              </TouchableOpacity>
            )
          
              
            
            
            
          })
            
        }
      </View>

      <View style = {stylet.container}> 
      <FeedUserButton/>
     
      </View>
     
      </View>
      </TouchableOpacity> 
  )
}

function FeedUserButton(){
  const [todos, setTodos] = useState([
    
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {
    setTodos((prevTodos) => {
      return[
        {text: text, key: Math.random().toString()},
        ...prevTodos
      ];
    })
  }
  return (
    <View style={styleb.container}>
      
        <View style={styleb.content}>
          <AddToDo submitHandler={submitHandler}/>
            <View style = {styleb.list}>
              
              <FlatList 
                data = {todos}
                renderItem = {({item}) => (
                  
                  
                  <ToDoItem item ={item} pressHandler={pressHandler}/>
                  
                )}
              />
              
            </View>
        </View>
    </View>
  );
}


function ToDoItem({item, pressHandler}){
  return(
    <TouchableOpacity onPress = {() => pressHandler(item.key)}>
      <Text style ={sty.item}>{item.text}</Text>
    </TouchableOpacity>
  )
}




function AddToDo({submitHandler}){
  const [text, setText] = useState('');
  const changeHandler = (val) => {
    setText(val);
  }
    return(
      <View> 
        <TextInput multiline
          style={str.input}
          placeholder = 'Enter Feedback:'
          onChangeText = {changeHandler}
          />
          <Button onPress={() => submitHandler(text)} title='Submit Feedback' color='black' />
          </View>
      
    )
}


  const styleb = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     
    },
    content:{
        padding:40,
        flex: 1,
    },
  list: {
    marginTop:20,
    flex: 1,
  }
  });

  const sty = StyleSheet.create({
    item:{
      padding: 8,
      marginTop: 8,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
    }
  })

  const str = StyleSheet.create({
    input:{
      marginBottom: 5,
      paddingHorizontal: 4,
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    }
});


const stylez = StyleSheet.create({
  
  container: {
    marginTop:30,
    padding:20,
    backgroundColor: 'white'
  },

  
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
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

const stylet = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
  },
  input: { 
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  }
  
});





