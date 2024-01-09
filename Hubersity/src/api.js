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

    /* const bebidasData = responseData.find(
      category => category.categoria.nome === 'Bebidas',
    );
    const comidaData = responseData.find(
      category => category.categoria.nome === 'Comida',
    );

    const bebidas = bebidasData ? bebidasData.produtos : [];
    const comida = comidaData ? comidaData.produtos : []; */

    return responseData;
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

    if (response.status !== 200) {
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

export const removeFromCart = async (id) => {
  const storedToken = await AsyncStorage.getItem('token');
  try {
    if (!storedToken) {
      console.error('Sem token');
      return {success: false, message: 'Sem token'};
    }

    const response = await fetch(`http://${IP}:3000/bar/carrinho/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return {success: true, message: responseData.message};
    } else {
      const responseData = await response.json();
      console.error(responseData);
      return {success: false, message: responseData.message};
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Ocorreu um erro ao remover o produto do carrinho.',
    };
  }
};

export const addToCart = async (id) => {
  const storedToken = await AsyncStorage.getItem('token');
  try {
    if (!storedToken) {
      console.error('Sem token');
      return {success: false, message: 'Sem token'};
    }

    const response = await fetch(`http://${IP}:3000/bar/carrinho/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return {success: true, message: responseData.message};
    } else {
      const responseData = await response.json();
      console.error(responseData);
      return {success: false, message: responseData.message};
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Ocorreu um erro ao adicionar o produto ao carrinho.',
    };
  }
};