import {View, Text, StyleSheet, ScrollView,Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fetchCart} from '../../api';
import EmptyStateScreen from './EmptyStateScreen';
import CarrinhoCard from '../../components/CarrinhoCard';
import Header from '../../components/Header';
import Voltar from '../../assets/icons/Voltar.svg';
import PrimaryBtn from '../../components/PrimaryBtn';

const CartScreen = ({navigation}) => {
  const [cart, setCart] = useState([]);
  const [empty, setEmpty] = useState(true);
  const {height} = Dimensions.get('window');
  const total = cart.reduce((acc, item) => {
    return acc + item['ProdutosBar.Preco'] * item['Quantidade'];
  }, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartProducts = await fetchCart();
        if (cartProducts.status == 404) {
          setEmpty(true);
        } else {
          setCart(cartProducts);
          setEmpty(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(cart);
    console.log(total);
  }, [cart]);

  return (
    <View>
      {empty ? (
        <EmptyStateScreen />
      ) : (
        <View style={styles.container}>
          <View>
            <Header
              iconPosition="left"
              title="Carrinho"
              customIcon={<Voltar />}
              onPress={() => navigation.navigate('HomeBar')}
            />
          </View>
          <ScrollView style={styles.scroll}>
            <View>
              <View style={styles.main}>
                {cart.map(item => (
                  <CarrinhoCard
                    key={item.IdProduto}
                    nome={item['ProdutosBar.Nome']}
                    descricao={item['ProdutosBar.Descricao']}
                    preco={item['ProdutosBar.Preco']}
                    quantidade={item['Quantidade']}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={[styles.totalInfo, {marginBottom: height-350}]}>
            <View style={styles.total}>
              <Text style={styles.totalTitle}>Total: </Text>
              <Text style={styles.totaltxt}>{total}€</Text>
            </View>
            <View style={styles.Btn}>
              <PrimaryBtn
                text="Finalizar"
                paddingVertical={5}
                borderRadius={10}
                width={'90%'}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginTop: '50%',
    height: '32%',
  },
  container: {
    backgroundColor: '#F8F9FA',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  totalTitle: {
    fontFamily: 'BaiJamjuree-Bold',
    fontSize: 17,
    color: '#ADB5BD',
  },
  totaltxt: {
    fontFamily: 'BaiJamjuree-Bold',
    fontSize: 17,
    color: '#212529',
  },
  Btn: {
    alignItems: 'center',
  },
  totalInfo: {
    backgroundColor: '#F8F9FA',
  },
});

export default CartScreen;
