import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PerfilScreen from '../screens/PerfilScreen';
import Historico from '../screens/HistoricoScreen';

const Stack = createNativeStackNavigator();

const PerfilNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'PerfilScreen'}>
      <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
      <Stack.Screen name="Historico" component={Historico} />
    </Stack.Navigator>
  );
};

export default PerfilNavigation;
