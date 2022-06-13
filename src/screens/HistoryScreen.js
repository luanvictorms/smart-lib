import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useState, useEffect} from 'react';
import {getInventoryHistoryList} from '../services/SmartLibApiService';
import moment from 'moment';

export default function HistoryScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryHistoryList, setinventoryHistoryList] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    let response = await getInventoryHistoryList();

    if (response.length > 0) {
      response = response.map((item, index) => {
        return {
          id: item.id,
          doneBy: item.doneBy,
          occurDate: moment(item.occurDate)
            .locale('pt-br')
            .format('DD/MM/YYYY HH:mm:ss'),
        };
      });

      setinventoryHistoryList(response);
    }
    setIsLoading(false);
  }

  const goToDetails = (id) => {
    navigation.navigate('HistoryDetails', {id});
  };

  const renderHistory = () => (
    <SafeAreaView style={styles.container}>
      {inventoryHistoryList.length > 0 ? (
        <FlatList
          data={inventoryHistoryList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Nenhum registro encontrado ainda</Text>
          <Image
            style={styles.bigLogo}
            source={require('../assets/iconNotFound.png')}
          />
        </View>
      )}
    </SafeAreaView>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemList}
      onPress={() => goToDetails(item.id)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Nome: </Text>
        <Text style={styles.itemValue}>{item.doneBy}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Data: </Text>
        <Text style={styles.itemValue}>{item.occurDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.body}>
      <View style={styles.headerList}>
        <View style={styles.headerItem}>
          <Text style={styles.headerTitle}>Total: </Text>
          <Text style={styles.headerValue}>{inventoryHistoryList.length}</Text>
        </View>
      </View>

      <View style={styles.separator} />

      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        renderHistory()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
