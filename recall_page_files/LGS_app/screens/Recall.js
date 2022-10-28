import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, Text, View, Image, Button, ToastAndroid, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import { formatDate, getRnadomFiveInt } from '../utils/common'
import { BACKEND_ADDRESS } from '../utils/config'
import { useRoute, useIsFocused } from '@react-navigation/native';
import qs from 'querystring'

export default function Recall({ navigation }) {
  const [isSelected, setSelection] = useState(false);
  const [reason, onChangeReason] = React.useState(null);
  const [recallData, setRecallData] = React.useState({});
  const isFocused = useIsFocused();
  const route = useRoute();
  const [lotNo, setLotNo] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (isFocused) {
      getRecallData()
      setLotNo(formatDate(new Date(), 'yyyyMMdd') + getRnadomFiveInt())
    }

  }, [isFocused])


  const SendRecallRequest = () => {
    console.log(qs.stringify({ lotNo, reason }));
    fetch(`${BACKEND_ADDRESS}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify({ lotNo, recallReason: reason })
    }).then((resp) => resp.json()).then(data => {
      ToastAndroid.show('Send recall request success!', ToastAndroid.SHORT, ToastAndroid.CENTER)
    })
  }

  const confirmRecall = () => {
    fetch(`${BACKEND_ADDRESS}/recallConfirm/1`).then((resp) => resp.json()).then(data => {
      ToastAndroid.show('Confirm recall success!', ToastAndroid.SHORT, ToastAndroid.CENTER)
    })
  }


  const getRecallData = () => {
    const data = JSON.parse(route.params ? route.params.data : '{}')
    setRecallData(data || {})

    if (route.params) {
      setModalVisible(true)
    }

  }

  const toScan = () => {
    navigation.navigate('Scan', { type: 2 })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 30 }}>Recall(Distributor/Retailer)</Text>
        </View>
        <TouchableOpacity style={styles.scanContainer} onPress={toScan}>
          <Image style={styles.scanImg} source={require('../assets/scan.png')} />
          <Text>Tap to Scan</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <View>
            <Image style={styles.productImage} source={require('../assets/product.jpg')} />
          </View>
          <View style={styles.desBox}>
            <Image style={styles.companyLogo} source={require('../assets/company.png')} />
            <Text>Apple iPhone 14 Pro Silicone Case with MagSafe — Midnight</Text>
          </View>
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
              <Text>Fri Oct 14 2022</Text>
            </View>
          </View>
        </View>

        <View style={styles.acceptBox}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>I ACCEPT THE RECALL POLICY</Text>
        </View>
        <Button
          title="Send recall request"
          onPress={SendRecallRequest}
        />
      </View>
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
                  <Image style={styles.closeImg} source={require('../assets/delete.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.recallBox}>
                {recallData.productNo && recallData.recallStatus != -1 ? <View>
                  <View style={styles.recallItem}>
                    <Text style={styles.recallItemLabel}>Recall reason:</Text>
                    <Text>{recallData.recallReason}</Text>
                  </View>
                  <View style={styles.recallItem}>
                    <Text style={styles.recallItemLabel}>Product lot No:</Text>
                    <Text>{recallData.lotNo}</Text>
                  </View>
                  <View style={styles.recallItem}>
                    <Text style={styles.recallItemLabel}>Recall Date:</Text>
                    <Text>{formatDate(new Date(recallData.recallDate), 'yyyy-MM-dd hh:mm:ss')}</Text>
                  </View>
                  {
                    recallData.recallStatus == 1 ? <Button title="Send recall request" onPress={confirmRecall()} />
                      : null
                  }
                </View> : <Text>Hi，there is no recall!</Text>}

              </View>

            </View>
          </View>
        </Modal>
      </View>

    </>


  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
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
  }



});
