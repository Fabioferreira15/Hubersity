import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeCantina from '../screens/cantina/HomeCantinaScreen';
import Ementas from '../screens/cantina/EmentasScreen';
import Marcacoes from '../screens/cantina/MarcarRefeicaoScreen';
import MarcacoesPendentes from '../screens/cantina/MarcacoesPendentesScreen';
import QrCode from '../screens/cantina/QrCodeScreen';

const Stack = createNativeStackNavigator();

const CantinaNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomeCantina'}>
      <Stack.Screen name="HomeCantina" component={HomeCantina} />
      <Stack.Screen name="Ementas" component={Ementas} />
      <Stack.Screen name="Marcacoes" component={Marcacoes} />
      <Stack.Screen name="MarcacoesPendentes" component={MarcacoesPendentes} />
      <Stack.Screen
        name="QrCode"
        component={QrCode}
      />
    </Stack.Navigator>
  );
};

export default CantinaNavigation;
