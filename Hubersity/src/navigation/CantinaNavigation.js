import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeCantina from '../screens/cantina/HomeCantina';
import Ementas from '../screens/cantina/Ementas';
import Marcacoes from '../screens/cantina/MarcarRefeicao';
import MarcacoesPendentes from '../screens/cantina/MarcacoesPendentes';
import QrCode from '../screens/cantina/QrCode';

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
        options={{ tabBarVisible: false }} // Oculta a barra de navegação inferior nesta página
      />
    </Stack.Navigator>
  );
};

export default CantinaNavigation;
