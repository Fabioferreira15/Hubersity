import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fetchCart, payBarOrder,payBarOrderPoints} from '../../api';
import EmptyStateScreen from './EmptyStateScreen';
import CarrinhoCard from '../../components/CarrinhoCard';
import Header from '../../components/Header';
import Voltar from '../../assets/icons/Voltar.svg';
import PrimaryBtn from '../../components/PrimaryBtn';
import {LoadingModal} from 'react-native-loading-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const CartScreen = ({navigation}) => {
  const [cart, setCart] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(true);
  const {height} = Dimensions.get('window');
  const total = cart.reduce((total, item) => {
    return total + item['ProdutosBar.Preco'] * item['Quantidade'];
  }, 0);

  const totalPontos = total * 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartProducts = await fetchCart();

        if (cartProducts.status == 404) {
          setEmpty(true);
          setLoading(false);
        } else {
          setCart(cartProducts);
          setEmpty(false);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cart]);

  
  const handlePay = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const userIdInt = parseInt(id);

      const response = await payBarOrder(userIdInt);
      if (response.success) {
        Toast.show({
          text1: 'Sucesso',
          text2: response.message,
          type: 'success',
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        Toast.show({
          text1: 'Erro',
          text2: response.message,
          type: 'error',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayPoints = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const userIdInt = parseInt(id);

      const response = await payBarOrderPoints(userIdInt);
      if (response.success) {
        Toast.show({
          text1: 'Sucesso',
          text2: response.message,
          type: 'success',
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        Toast.show({
          text1: 'Erro',
          text2: response.message,
          type: 'error',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View>
      {loading ? (
        <View>
          <LoadingModal
            visible={true}
            color="white"
            size="large"
            loadingMessage="Loading..."
          />
        </View>
      ) : empty ? (
        <EmptyStateScreen navigation={navigation} />
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
                    id={item.IdProduto}
                    nome={item['ProdutosBar.Nome']}
                    descricao={item['ProdutosBar.Descricao']}
                    preco={item['ProdutosBar.Preco']}
                    quantidade={item['Quantidade']}
                    imagem={item['ProdutosBar.Imagem']}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={[styles.totalInfo, {marginBottom: height - 350}]}>
            <View style={styles.total}>
              <Text style={styles.totalTitle}>Total: </Text>
              <Text style={styles.totaltxt}>
                {total.toFixed(2)}€ - {totalPontos.toFixed(1)} pontos
              </Text>
            </View>

            <View style={styles.Btn}>
              <PrimaryBtn
                text="Finalizar"
                paddingVertical={5}
                borderRadius={10}
                width={"45%"}
                onPress={handlePay}
              />

              <PrimaryBtn
                text="Pagar com pontos"
                paddingVertical={5}
                borderRadius={10}
                width={"45%"}
                onPress={handlePayPoints}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  totalInfo: {
    backgroundColor: '#F8F9FA',
    height: '20%',
  },
});

export default CartScreen;
