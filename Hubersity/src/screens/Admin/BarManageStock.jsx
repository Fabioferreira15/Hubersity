import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, RefreshControl,ActivityIndicator,TouchableOpacity,Image} from 'react-native';
import StockCard from '../../components/StockCard';
import {fetchBarProducts} from '../../api';
import CarrinhoSvg from '../../assets/icons/carrinho.svg';
import PlusSvg from '../../assets/icons/plus.svg';

const BarManageStock = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
        const data = await fetchBarProducts();
        setCategorias(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(categorias);
  }, [categorias]);

  return (
    <View>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.main}>
          {loading ? (
            <>
              <ActivityIndicator animating={true} color="red" size="large" />
              <Text style={styles.loadingTxt}>Loading...</Text>
            </>
          ) : (
            categorias.map(categoria => (
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
                          <Text style={styles.text}>{item.Stock} em Stock</Text>
                        </View>
                        <View style={styles.btn}>
                          <TouchableOpacity
                            onPress={() => handleAddToCart(item.IdProduto)}>
                            <PlusSvg />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginBottom: '15%',
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
  loadingTxt: {
    fontFamily: 'BaiJamjuree-Bold',
    fontSize: 20,
    color: '#212529',
    textAlign: 'center',
  },
});

export default BarManageStock;
