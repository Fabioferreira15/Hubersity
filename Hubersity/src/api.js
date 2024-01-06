import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from './context/env';

export const fetchBarProducts = async () => {
  try {
    const storedToken = await AsyncStorage.getItem('token');
    if (!storedToken) {
      console.error('Sem token');
      return [];
    }

    const response = await fetch(`http://${IP}:3000/bar/produtos`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    const responseData = await response.json();

    const bebidasData = responseData.find(
      category => category.categoria.nome === 'Bebidas',
    );
    const comidaData = responseData.find(
      category => category.categoria.nome === 'Comida',
    );

    const bebidas = bebidasData ? bebidasData.produtos : [];
    const comida = comidaData ? comidaData.produtos : [];

    return {bebidas, comida};
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCart = async () => {
  try {
    const storedToken = await AsyncStorage.getItem('token');
    if (!storedToken) {
      console.error('Sem token');
      return [];
    }

    const response = await fetch(`http://${IP}:3000/bar/carrinho`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (response.status!== 200) {
      const status = response.status;
      return {status};
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
