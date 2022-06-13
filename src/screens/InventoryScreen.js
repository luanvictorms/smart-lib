import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useState, useRef, useEffect} from 'react';
import {Buffer} from 'buffer';
import {BleManager} from 'react-native-ble-plx';

import Button from '../components/Button';
import {getBooks, storeInventoryService} from '../services/SmartLibApiService';

export default function InventoryScreen({navigation}) {
  const seviceUUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
  const characteristicUUID = '0000ffe1-0000-1000-8000-00805f9b34fb';
  const deviceId = '00:15:90:91:C8:7E';
  const deviceName = 'UBT19443078B';

  const readLabelsTransactionId = 'readLabelTransaction';

  const [isLoading, setIsLoading] = useState(true);
  const [isScan, setIsScan] = useState(false);

  const [findedList, setFindedList] = useState([]);
  const [notFindedList, setNotFindedList] = useState([]);
  const [doneBy, setDoneBy] = useState('');

  const [activeTab, setActiveTab] = useState(1);

  const bleManager = useRef(new BleManager());

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const response = await getBooks();

    if (response.length > 0) {
      setNotFindedList(response);
    }
    setIsLoading(false);
  }

  async function storeInventory() {
    if (doneBy.length <= 0) {
      Alert.alert('Preencha seu nome');
      return;
    }
    const findedFormatted = findedList.map((item) => {
      return {
        id: item.id,
      };
    });
    const notFindedFormatted = notFindedList.map((item) => {
      return {
        id: item.id,
      };
    });

    const response = await storeInventoryService(
      findedFormatted,
      notFindedFormatted,
      doneBy,
    );
    if (response?.status === 'success') {
      Alert.alert('Inventário salvo com sucesso');
      navigation.navigate('history');
    }
  }

  const startScanAndConnect = (findedDeviceName) => {
    let response = {success: false, data: {}, error: {}};

    return new Promise((resolve, reject) => {
      bleManager.current.startDeviceScan(null, null, (error, device) => {
        if (error) {
          reject({...response, error});
        }

        if (device?.name === findedDeviceName) {
          bleManager.current.stopDeviceScan();
          resolve({...response, success: true, data: device});
        }
      });
    });
  };

  const readLabels = async (device) => {
    const connectedDevice = await device.connect();
    const connectedDeviceWithServices =
      await connectedDevice.discoverAllServicesAndCharacteristics();

    let oldList = [];
    connectedDeviceWithServices.monitorCharacteristicForService(
      seviceUUID,
      characteristicUUID,
      (error, characteristic) => {
        if (error) {
          console.log('Error => ', error);
          return;
        }
        const formattedValue = formatCharacteristicValue(characteristic.value);
        if (formattedValue !== null) {
          pushNewLabel(formattedValue, oldList);
        }
      },
      readLabelsTransactionId,
    );
  };

  const pushNewLabel = (value, oldList) => {
    const findedIndex = oldList.findIndex((o) => o?.value === value);
    if (findedIndex === -1) {
      oldList.push({value: value});

      if (value.length === 23) {
        value = `0${value}`;
      }

      const index = notFindedList.findIndex((o) => o.id === value);

      if (index > -1) {
        const valueToPush = notFindedList[index];
        notFindedList.splice(index, 1);

        setFindedList((oldArray) => [...oldArray, valueToPush]);
      } else {
        console.log('Etiqueta não econtrada');
      }
    }
  };

  const formatCharacteristicValue = (readValueInBase64) => {
    const notBuffer = Buffer.from(readValueInBase64, 'base64');
    let notConcatString = toHexString(notBuffer);
    if (notConcatString.length === 28) {
      return notConcatString.substr(1, 23);
    }
    return null;
  };

  const startConnect = async () => {
    const permission = await requestLocationPermission();

    if (permission && !isScan) {
      setIsScan(true);
      const deviceConnected = await startScanAndConnect(deviceName);

      if (deviceConnected.success) {
        readLabels(deviceConnected.data);
      }
    }
  };

  const simulateInventory = async () => {
    setIsScan(true);
    let value = '000000000000000000000001';
    let oldList = [];

    if (findedList.length > 0) {
      oldList = findedList;
    }

    pushNewLabel(value, oldList);
  };

  const stopScanAndConnect = async () => {
    bleManager.current.stopDeviceScan();
    bleManager.current.cancelTransaction(readLabelsTransactionId);
    bleManager.current.cancelDeviceConnection(deviceId);
    setFindedList([]);
    setIsScan(false);
    await fetchBooks();
  };

  const toHexString = (bytes) => {
    return Array.from(bytes)
      .map((byte) => byteToHex(byte))
      .join('');
  };

  const byteToHex = (byte) => {
    const unsignedByte = byte & 0xff;

    if (unsignedByte < 16) {
      return '0' + unsignedByte.toString(16);
    } else {
      return unsignedByte.toString(16);
    }
  };

  // #TODO Verificar se está permitido antes de solicitar
  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permição para Bluetooth BLE',
        message: 'Este App pode acessar o Bluetooth LE. ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  };

  const goToDetails = (book) => {
    navigation.navigate('Book', {book});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemList} onPress={() => goToDetails(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>ID: </Text>
        <Text style={styles.itemValue}>{item.id}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemValue}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFinded = () => (
    <SafeAreaView style={styles.container}>
      {findedList.length > 0 ? (
        <FlatList
          data={findedList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Nenhum livro encontrado ainda</Text>
          <Image
            style={styles.bigLogo}
            source={require('../assets/iconNotFound.png')}
          />
        </View>
      )}
    </SafeAreaView>
  );

  const renderNotFinded = () => (
    <SafeAreaView style={styles.container}>
      {notFindedList.length > 0 ? (
        <FlatList
          data={notFindedList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Nenhum livro encontrado ainda</Text>
          <Image
            style={styles.bigLogo}
            source={require('../assets/iconNotFound.png')}
          />
        </View>
      )}
    </SafeAreaView>
  );

  return (
    <View style={styles.body}>
      <View style={styles.headerList}>
        <View style={styles.headerItem}>
          <Text style={styles.headerTitle}>Econtrados: </Text>
          <Text style={styles.headerValue}>{findedList.length}</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerTitle}>Pendentes: </Text>
          <Text style={styles.headerValue}>{notFindedList.length}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      {!isScan ? (
        <Button
          text="Iniciar Inventário"
          textColor="#E5E7EB"
          backgroundColor="#1F2937"
          onPress={() => startConnect()}
        />
      ) : (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setDoneBy}
            value={doneBy}
            placeholder="Seu nome"
          />
          <Button
            text="Concluir Inventário"
            textColor="#E5E7EB"
            backgroundColor="#1F2937"
            onPress={() => storeInventory()}
          />
          <Button
            text="Cancelar"
            textColor="#E5E7EB"
            backgroundColor="#DC2626"
            onPress={() => stopScanAndConnect()}
          />
        </View>
      )}
      <View style={styles.headerList}>
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          style={
            activeTab === 1 ? styles.activeTabItem : styles.desactiveTabItem
          }>
          <Text
            style={
              activeTab === 1 ? styles.activeTabTitle : styles.desactiveTabTitle
            }>
            Econtrados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(2)}
          style={
            activeTab === 2 ? styles.activeTabItem : styles.desactiveTabItem
          }>
          <Text
            style={
              activeTab === 2 ? styles.activeTabTitle : styles.desactiveTabTitle
            }>
            Pendentes
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : activeTab === 1 ? (
        renderFinded()
      ) : (
        renderNotFinded()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  tabList: {
    width: '80%',
    height: '80%',
  },
  headerList: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerItem: {
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F3F4F6',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#4B5563',
  },
  headerTitle: {
    color: '#4B5563',
    fontSize: 20,
    textAlign: 'center',
  },

  activeTabItem: {
    padding: 5,
    margin: 5,
    borderBottomColor: '#4B5563',
    borderBottomWidth: 2,
    marginBottom: 30,
  },
  desactiveTabItem: {
    padding: 5,
    margin: 5,
    color: '#F9FAFB',
  },

  activeTabTitle: {
    color: '#374151',
    fontSize: 20,
    textAlign: 'center',
  },
  desactiveTabTitle: {
    color: '#4B5563',
    fontSize: 20,
    textAlign: 'center',
  },

  headerValue: {
    color: '#1F2937',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  itemList: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
    margin: 5,
    backgroundColor: '#F3F4F6',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#4B5563',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  itemTitle: {
    color: '#4B5563',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemValue: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'justify',
  },

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'justify',
    color: '#4B5563',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoTitle: {
    textAlign: 'left',
    color: '#4B5563',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    backgroundColor: '#1F2937',
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  flatItem: {
    padding: 5,
    margin: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigLogo: {
    margin: 5,
    width: 150,
    height: 150,
  },
});
