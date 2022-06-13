import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.body}>
      <Image
        style={styles.bigLogo}
        source={require('../assets/logoSmartLib.png')}
      />
      <Text style={styles.logoTitle}>Smart Lib</Text>
      <View style={styles.separator} />
      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.title}>Ultimo Inventário: </Text>
          <Text style={styles.titleItem}>20/11/2021</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.title}>Total de Inventários: </Text>
          <Text style={styles.titleItem}>5</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.title}>Total de livros: </Text>
          <Text style={styles.titleItem}>1000</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    margin: 20,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F3F4F6',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#4B5563',
  },
  title: {
    color: '#4B5563',
    fontSize: 20,
    textAlign: 'center',
  },
  titleItem: {
    color: '#1F2937',
    fontSize: 20,
    textAlign: 'center',
  },
  logoTitle: {
    color: '#1F2937',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    backgroundColor: '#1F2937',
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  tinyLogo: {
    marginRight: 25,
    width: 50,
    height: 50,
  },
  bigLogo: {
    marginTop: 25,
    width: 150,
    height: 150,
  },
});
