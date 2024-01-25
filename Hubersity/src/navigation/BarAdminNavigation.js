import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeBarAdmin from '../screens/Admin/BarProduct';
import BarCategory from '../screens/Admin/BarCategory';
import BarManageStock from '../screens/Admin/BarManageStock';

const Tab = createMaterialTopTabNavigator();

const BarAdminNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeBarAdmin"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Adicionar Produto" component={HomeBarAdmin} />
      <Tab.Screen name="Adicionar Categoria" component={BarCategory} />
      <Tab.Screen name="Gerir Stock" component={BarManageStock} />
    </Tab.Navigator>
  );
};

export default BarAdminNavigation;
