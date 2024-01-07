import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Header from './Header';
import {fetchBarProducts} from '../api';
import CarrinhoSvg from '../assets/icons/carrinho.svg';
import CarrinhoHeader from '../assets/icons/Carrinho_header.svg';

const BarCards = ({navigation}) => {
  const [bebidas, setBebidas] = useState([]);
  const [comida, setComida] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBarProducts();
        setBebidas(data.bebidas);
        setComida(data.comida);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Header iconPosition='right' title="Bar" customIcon={<CarrinhoHeader />} onPress={() => navigation.navigate('CartScreen')} />
      <View style={styles.main}>
        <Text style={styles.title}>Bebidas</Text>
        <ScrollView horizontal={true} style={styles.container}>
          {bebidas.map(item => (
            <View key={item.IdProduto} style={styles.card}>
              <View style={styles.imagem}>
                <Image
                  source={require('../assets/Rectangle164.png')}
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
                  <CarrinhoSvg />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.title}>Comida</Text>
        <ScrollView horizontal={true} style={styles.container}>
          {comida.map(item => (
            <View key={item.IdProduto} style={styles.card}>
              <View style={styles.imagem}>
                <Image
                  source={require('../assets/Rectangle164.png')}
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
                  <CarrinhoSvg />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default BarCards;
