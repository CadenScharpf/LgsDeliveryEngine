import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, 
  Linking, Button
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import getGlobalColors from '../../Colors';
import {getString} from "../../StringsArray";

var colors = getGlobalColors();
const stack =  createStackNavigator()

export default function ProductOnly(props) {
  return (
  <TouchableOpacity style={styles.card} onPress={() => {Linking.openURL( props.src.productPageURL );}}>
    <Image
    resizeMode={'cover'}
      style={styles.thumb}
      source={{uri:props.src.photoURL}}/>
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{props.src.product_name}</Text>
      <Text style={styles.sub}>{getString('product_description')}: {props.src.product_specification}</Text>
    </View>

    </TouchableOpacity>
  );
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
