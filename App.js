import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './src/screens/HomeScreen';

import InventoryScreen from './src/screens/InventoryScreen';
import BookScreen from './src/screens/BookScreen';

import HistoryScreen from './src/screens/HistoryScreen';
import HistoryDetailsScreen from './src/screens/HistoryDetailsScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const StackHistory = () => {
  return (
    <Stack.Navigator
      initialRouteName="HistoryList"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#E5E7EB',
        headerStyle: {backgroundColor: '#4B5563'},
      }}>
      <Stack.Screen
        name="HistoryList"
        component={HistoryScreen}
        options={{title: 'Histórico'}}
      />
      <Stack.Screen
        name="HistoryDetails"
        component={HistoryDetailsScreen}
        options={{title: 'Detalhes'}}
      />
    </Stack.Navigator>
  );
};

const StackInventory = () => {
  return (
    <Stack.Navigator
      initialRouteName="InventoryList"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#E5E7EB',
        headerStyle: {backgroundColor: '#4B5563'},
      }}>
      <Stack.Screen
        name="InventoryList"
        component={InventoryScreen}
        options={{title: 'Inventário'}}
      />
      <Stack.Screen
        name="Book"
        component={BookScreen}
        options={{title: 'Livro'}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#E5E7EB"
        barStyle={{backgroundColor: '#4B5563'}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="inventory"
          component={StackInventory}
          options={{
            tabBarLabel: 'Inventário',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="book" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="history"
          component={StackHistory}
          options={{
            tabBarLabel: 'Histórico',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="history" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
