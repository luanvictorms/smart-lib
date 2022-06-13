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
import {findInventory} from '../services/SmartLibApiService';

export default function InventoryScreen({route, navigation}) {
  const [isLoading, setIsLoading] = useState([]);
  const [findedList, setFindedList] = useState([]);
  const [notFindedList, setNotFindedList] = useState([]);

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const {id} = route.params;
    fetchInventoryDetails(id);
  }, [route]);

  async function fetchInventoryDetails(id) {
    let response = await findInventory(id);

    setIsLoading(false);
    setFindedList(response.foundItems);
    setNotFindedList(response.missingItems);
  }

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
