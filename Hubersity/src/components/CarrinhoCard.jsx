import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import UnderlineBtn from './UnderlineBtn';

const CarrinhoCard = ({id, nome, preco, quantidade}) => {
  

  return (
    <View style={styles.card}>
      <View style={styles.Image}>
        <Image
          source={require('../assets/Rectangle164.png')}
          resizeMode="contain"
          style={styles.capaImage}
        />
      </View>
      <View style={styles.info}>
        <Text>Nome: {nome}</Text>
        <Text>Preço: {preco}€</Text>
        <UnderlineBtn text="remover" />
      </View>
      <View style={styles.quantidade}>
        <Text>{quantidade}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5F6EF0',
    height: 100,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
  },
  Image: {
    width: '20%',
  },
  capaImage: {
    width: '100%',
    height: '100%',
  },
  info: {
    width: '60%',
    justifyContent: 'center',
  },
  quantidade: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
});

export default CarrinhoCard;
