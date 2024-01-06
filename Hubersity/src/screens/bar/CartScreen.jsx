import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fetchCart} from '../../api';
import EmptyStateScreen from './EmptyStateScreen';

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartProducts = await fetchCart();
        if (cartProducts.status == 404){
          setEmpty(true);
        } else {
          setCart(cartProducts.data);
          setEmpty(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      {empty? (
        <EmptyStateScreen />
      ) : (
        <Text>Carrinho não vazio</Text>
      )}
    </View>
  );
};

export default CartScreen;
