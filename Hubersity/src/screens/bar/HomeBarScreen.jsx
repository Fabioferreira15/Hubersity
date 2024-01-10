import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Header from '../../components/Header';
import {fetchBarProducts, addToCart} from '../../api.js';
import CarrinhoSvg from '../../assets/icons/carrinho.svg';
import CarrinhoHeader from '../../assets/icons/Carrinho_header.svg';
import Toast from 'react-native-toast-message';

const HomeBar = ({navigation}) => {
  const [categorias, setCategorias] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBarProducts().then(data => {
      setCategorias(data);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBarProducts();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categorias]);

  const handleAddToCart = async id => {
    const response = await addToCart(id);
    if (response.success) {
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: response.message,
        autoHide: true,
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: response.message,
        autoHide: true,
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header
          iconPosition="right"
          title="Bar"
          customIcon={<CarrinhoHeader />}
          onPress={() => navigation.navigate('CartScreen')}
        />
        <View style={styles.main}>
          {categorias.map(categoria => (
            <View key={categoria.categoria.idCategoriaBar}>
              <Text style={styles.title}>{categoria.categoria.nome}</Text>
              <ScrollView horizontal={true} style={styles.container}>
                {categoria.produtos.map(item => (
                  <View key={item.IdProduto} style={styles.card}>
                    <View style={styles.imagem}>
                      <Image
                        source={require('../../assets/Rectangle164.png')}
                        resizeMode="contain"
                        style={styles.capaImage}
                      />
                    </View>
                    <View style={styles.cardInfo}>
                      <View style={styles.info}>
                        <Text style={styles.textNome}>{item.Nome}</Text>
                        <Text style={styles.text}>{item.Preco}€</Text>
                      </View>
                      <View style={styles.btn}>
                        <TouchableOpacity
                          onPress={() => handleAddToCart(item.IdProduto)}>
                          <CarrinhoSvg />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
          {/* criar botão para com o nome Pedidos por levantar, que vai para a página PedidosBarLevantar */}
          <TouchableOpacity
            style={styles.btnPedidosPorLevantar}
            onPress={() => navigation.navigate('PendingOrdersScreen')}>
            <Text style={styles.textBtnPedidosPorLevantar}>Pedidos por levantar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginBottom: '15%',
  },
  main: {
    marginTop: '55%',
  },
  title: {
    fontSize: 27,
    fontFamily: 'BaiJamjuree-Bold',
    color: '#212529',
    paddingHorizontal: 10,
  },
  textNome: {
    fontSize: 14,
    fontFamily: 'BaiJamjuree-SemiBold',
    color: '#F8F9FA',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: 'BaiJamjuree-Regular',
    color: '#F8F9FA',
    paddingHorizontal: 10,
  },
  container: {
    padding: 8,
  },
  card: {
    flex: 1,
    width: 250,
    height: 200,
    backgroundColor: '#DFE2FC',
    borderRadius: 10,
    margin: 5,
  },
  imagem: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  capaImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    width: '100%',
    height: '30%',
    backgroundColor: '#5F6EF0',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 5,
  },
  btnPedidosPorLevantar: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: '10%',
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#F0D060',
    verticalAlignText: 'middle',
    paddingVertical: '2%',
  },
  textBtnPedidosPorLevantar: {
    color: '#151C4D',
    fontSize: 17,
    fontFamily: 'BaiJamjuree-Bold',
    textAlign: 'center',
  },
});

export default HomeBar;
