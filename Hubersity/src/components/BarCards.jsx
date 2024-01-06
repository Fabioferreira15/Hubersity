import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import IP from '../context/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const BarCards = () => {
  const [bebidas, setBebidas] = useState([]);
  const [comida, setComida] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
          console.error('Sem token');
          return;
        }
        setToken(storedToken);

        const response = await fetch(`http://${IP}:3000/bar/produtos`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const responseData = await response.json();
        console.log(responseData);

        const bebidasData = responseData.find(
          category => category.categoria.nome === 'Bebidas',
        );
        const comidaData = responseData.find(
          category => category.categoria.nome === 'Comida',
        );

        setBebidas(bebidasData ? bebidasData.produtos : []);
        setComida(comidaData ? comidaData.produtos : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log(`bebidas: ${bebidas}`);
  }, []);

  return (
    <View>
      <Header 
        title="Bar"
      />
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
                <Text style={styles.textNome}>{item.Nome}</Text>
                <Text style={styles.text}>{item.Preco}€</Text>
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
                <Text style={styles.textNome}>{item.Nome}</Text>
                <Text style={styles.text}>{item.Preco}€</Text>
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
    marginTop: '55%'
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
    width: 200,
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
    padding: 5,
    flexDirection: 'column',
  },
});

export default BarCards;
