import {Alert} from 'react-native';
import axios from 'axios';

const baseUrl = 'https://api-smartlibrary.herokuapp.com/v1';

export const getBooks = async (limit = 1000) => {
  try {
    const {data: response} = await axios.get(`${baseUrl}/lib?limit=${limit}`);
    return response.data;
  } catch (e) {
    console.log('error => ', e.message);
    Alert.alert('Erro buscar os livros', e.message);
  }
};

export const storeInventoryService = async (
  foundItems,
  notFindedList,
  doneBy,
) => {
  try {
    const {data: response} = await axios.post(`${baseUrl}/inventory`, {
      doneBy: doneBy,
      foundItems: foundItems,
      missingItems: notFindedList,
    });
    return response;
  } catch (e) {
    console.log('error => ', e.message);
    Alert.alert('Erro registrar o inventario', e.message);
  }
};

export const getInventoryHistoryList = async (limit = 1000) => {
  try {
    const {data: response} = await axios.get(
      `${baseUrl}/inventory?limit=${limit}`,
    );

    return response.data;
  } catch (e) {
    console.log('error => ', e.message);
    Alert.alert('Erro buscar o historico de inventarios', e.message);
  }
};

export const findInventory = async (id) => {
  try {
    const {data: response} = await axios.get(`${baseUrl}/inventory/${id}`);

    return response.data;
  } catch (e) {
    console.log('error => ', e.message);
    Alert.alert('Erro buscar o inventario', e.message);
  }
};
