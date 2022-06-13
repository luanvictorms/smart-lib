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
import moment from 'moment';

export default function HistoryDetailsScreen({route}) {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const {book} = route.params;
    setItem(book);
    console.log('book => ', book);
  }, [item, route.params]);

  return (
    <View style={styles.body}>
      <View style={styles.itemList}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>ID: </Text>
          <Text style={styles.itemValue}>{item.id}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Título: </Text>
          <Text style={styles.itemValue}>{item.title}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Classificação: </Text>
          <Text style={styles.itemValue}>{item.classification}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Coleção: </Text>
          <Text style={styles.itemValue}>{item.collectionCode}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Cópia: </Text>
          <Text style={styles.itemValue}>{item.copyCode}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Status: </Text>
          <Text style={styles.itemValue}>{item.status}</Text>
        </View>
      </View>
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
    justifyContent: 'center',
    padding: 5,
    margin: 20,
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
