import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, Text, ScrollView, View, StatusBar, Image, Button, ToastAndroid, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import { formatDate, getRnadomFiveInt } from '../../utils/common'
import { useRoute, useIsFocused } from '@react-navigation/native';
import { getString } from "../../StringsArray";
import { getAllProducts, getLotDetails, addRecall, getRecallById, updateRecallStatus, getAllRecall } from '../../api/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getGlobalColors from '../../Colors';
var colors = getGlobalColors();

export default function Recall({ navigation }) {
  const [isSelected, setSelection] = useState(false);
  const [reason, onChangeReason] = React.useState(null);
  const [recallData, setRecallData] = React.useState({});
  const isFocused = useIsFocused();
  const route = useRoute();
  const [lotNo, setLotNo] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [recallList, setRecallList] = React.useState([]);

  const [product, setProduct] = useState({})
  const [productDate, setProductDate] = useState(`${new Date()}`)

  useEffect(() => {
    if (global.accountType == 'Distributor' || global.accountType == 'Retailer') {
      getProductD()
    }

    if (global.accountType == 'Manufacturer') {
      getProductM()
    }

  }, [])


  const getProductD = () => {
    getAllProducts(global.language).then((result) => {
      let queryResults = JSON.parse(result);
      setProduct(queryResults.output[0])

      getLotDetails(queryResults.output[0].id).then((lotInfo) => {
        let lotJson = JSON.parse(lotInfo);
        setLotNo(lotJson.output[0].id)
      })

      getRecallById(queryResults.output[0].id).then((recall) => {
        let recallJson = JSON.parse(recall);
        setRecallData(recallJson.output)
        if (recallJson.output.status == 1) {
          setModalVisible(true)
        }
      })

    }).catch((error) => {
      console.log('getProductOperation failed');
    });
  }

  const getProductM = () => {
    getAllProducts(global.language).then((result) => {
      let queryResults = JSON.parse(result);
      setProduct(queryResults.output[0])

      getLotDetails(queryResults.output[0].id).then((lotInfo) => {
        let lotJson = JSON.parse(lotInfo);
        setLotNo(lotJson.output[0].id)
      })

      getRecallById(queryResults.output[0].id).then((recall) => {
        let recallJson = JSON.parse(recall);
        console.log(recallJson);
        setRecallData(recallJson.output)
        if (recallJson.output.status == 0) {
          setModalVisible(true)
        }
      })

      getAllRecall().then((recallList) => {
        let recallListJson = JSON.parse(recallList);
        console.log(recallListJson);
        setRecallList(recallListJson.output)
      })


    }).catch((error) => {
      console.log('getProductOperation failed');
    });
  }



  const SendRecallRequest = () => {
    addRecall(lotNo, productDate, reason, 'zzz', 0).then((result) => {
      var result_json = JSON.parse(result);
      if (result.length == 0) {
        console.log('API Response Issue');
      } else if (result_json.response_code == 200) {
        ToastAndroid.show('Send recall request success!', ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
    })
  }

  const confirmRecall = () => {
    updateRecallStatus(lotNo, 2).then(res => {
      console.log(res);
    })
  }

  const onRecall = () => {
    addRecall(lotNo, productDate, reason, 'zzz', 1).then((result) => {
      var result_json = JSON.parse(result);
      if (result.length == 0) {
        console.log('API Response Issue');
      } else if (result_json.response_code == 200) {
        ToastAndroid.show('Send recall notice success!', ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
    })
  }

  const onConfirm = (id) => {
    updateRecallStatus(id, 2).then(res => {
      getProductM()
    })
  }

  const onRefuse = (id) => {
    updateRecallStatus(id, -1).then(res => {
      getProductM()
    })
  }



  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Image
            resizeMode={'cover'}
            style={styles.thumb}
            source={{ uri: product.photoURL }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{product.product_name}</Text>
            <Text style={styles.sub}>{getString('product_description')}: {product.product_specification}</Text>
          </View>
          <View style={styles.recallBox}>
            <Text style={styles.recallTitle}>Recall information</Text>
            <View>
              <View style={styles.recallItem}>
                <Text style={styles.recallItemLabel}>Recall reason:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeReason}
                  value={reason}
                />
              </View>
              <View style={styles.recallItem}>
                <Text style={styles.recallItemLabel}>Product lot No:</Text>
                <Text>{lotNo}</Text>
              </View>
              <View style={styles.recallItem}>
                <Text style={styles.recallItemLabel}>Product Date:</Text>
                <Text>{formatDate(new Date(productDate), 'yyyy-MM-dd hh:mm:ss')}</Text>
              </View>
            </View>
          </View>

          {
            global.accountType == 'Distributor' || global.accountType == 'Retailer' ? <View style={styles.acceptBox}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>I ACCEPT THE RECALL POLICY</Text>
            </View> : null
          }

          {global.accountType == 'Distributor' || global.accountType == 'Retailer' ? <Button
            title="Send recall request"
            onPress={SendRecallRequest}
          /> : null}

          {global.accountType == 'Manufacturer' ? <Button
            title="Recall"
            onPress={onRecall}
          /> : null}

          {global.accountType == 'Manufacturer' ? <View style={styles.recallHistoryBox}>
            <Text style={styles.recallTitle}>Recall requset</Text>
            {
              recallList.map((item, index) => {
                return (
                  <View key={index} style={styles.recallItem}>
                    <Text>{item.lot_id} - {formatDate(new Date(productDate), 'yyyy-MM-dd hh:mm:ss')}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Button style={{ marginRight: 20 }} onPress={() => { onConfirm(item.lot_id) }} title="Confirm" />
                      <Button color={'#ff7875'} onPress={() => { onRefuse(item.lot_id) }} title="Refuse" />
                    </View>
                  </View>
                )
              })
            }
          </View> : null}


          <View style={{ ...styles.centeredView, position: 'absolute' }}>
            <Modal
              transparent={true}
              animationType="slide"
              visible={modalVisible}
            >
              <View style={styles.modalWrapper}>
                <View style={styles.modalBox}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Image style={styles.closeImg} source={require('../../assets/delete.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.recallBox}>
                    {recallData.id && (recallData.status == 1 || recallData.status == 0) ? <View>
                      <View style={styles.recallItem}>
                        <Text style={styles.recallItemLabel}>Recall reason:</Text>
                        <Text>{recallData.description}</Text>
                      </View>
                      <View style={styles.recallItem}>
                        <Text style={styles.recallItemLabel}>Product lot No:</Text>
                        <Text>{recallData.lot_id}</Text>
                      </View>
                      <View style={styles.recallItem}>
                        <Text style={styles.recallItemLabel}>Recall Date:</Text>
                        <Text>{formatDate(new Date(recallData.date_issued), 'yyyy-MM-dd hh:mm:ss')}</Text>
                      </View>
                      {
                        (global.accountType == 'Distributor' || global.accountType == 'Retailer') && recallData.status == 1 ? <Button title="Confirm Recall" onPress={() => { confirmRecall() }} />
                          : null
                      }

                      {
                        global.accountType == 'Manufacturer' && recallData.status == 0 ? <Button title="Confirm request" onPress={() => { confirmRecall() }} /> :
                          null
                      }

                    </View> : <Text>Hi，there is no recall!</Text>}

                  </View>

                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>

      </SafeAreaView>


    </>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  scanContainer: {
    marginBottom: 30,
    display: 'flex',
    alignItems: 'center'
  },
  scanImg: {
    width: 80,
    height: 80
  },

  productImage: {
    width: 68,
    height: 136
  },
  companyLogo: {
    width: 60,
    height: 60,
    marginBottom: 15
  },
  desBox: {
    paddingHorizontal: 30
  },
  recallBox: {
    marginVertical: 30
  },
  recallTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30
  },
  recallItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  recallItemLabel: {
    marginRight: 10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  },
  acceptBox: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center'
  },
  checkbox: {
    marginRight: 10
  },

  recallHistoryBox: {
    marginTop: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalWrapper: {
    paddingTop: 100,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 1000
  },

  modalBox: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  closeImg: {
    width: 30,
    height: 30
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingBottom: 10
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
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%'
  },
  scrollView: {
    backgroundColor: colors.background,
    marginHorizontal: 20,
    bottom: 20
  },


});