import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeBar from '../screens/bar/HomeBarScreen';
import CartScreen from '../screens/bar/CartScreen';
import EmptyStateScreen from '../screens/bar/EmptyStateScreen';
import PendingOrdersScreen from '../screens/bar/PendingOrdersScreen';
import QrCode from '../screens/bar/QrCode';

const Stack = createNativeStackNavigator();

const BarNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomeBar'}>
      <Stack.Screen name="HomeBar" component={HomeBar} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="EmptyStateScreen" component={EmptyStateScreen} />
      <Stack.Screen
        name="PendingOrdersScreen"
        component={PendingOrdersScreen}
      />
      <Stack.Screen name="QrCode" component={QrCode} />

    </Stack.Navigator>
  );
};

export default BarNavigation;
