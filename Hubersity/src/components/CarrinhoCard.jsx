import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import UnderlineBtn from './UnderlineBtn';
import MinusSvg from '../assets/icons/minus.svg';
import PlusSvg from '../assets/icons/plus.svg';
import {removeFromCart, changeCartQuantity} from '../api';
import Toast from 'react-native-toast-message';

const CarrinhoCard = ({id, nome, preco, quantidade}) => {
  const handleRemoveFromCart = async id => {
    const response = await removeFromCart(id);
    if (response.success) {
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: response.message,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          fontFamily: 'BaiJamjuree-Bold',
          fontSize: 16,
          color: '#04BE0C',
        },
        text2Style: {
          fontFamily: 'BaiJamjuree-SemiBold',
          fontSize: 14,
          color: '#212529',
        },
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

  const handleChangeCartQuantity = async (id, operacao) => {
    const response = await changeCartQuantity(id, operacao);
    if (response.success) {
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: response.message,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          fontFamily: 'BaiJamjuree-Bold',
          fontSize: 16,
          color: '#04BE0C',
        },
        text2Style: {
          fontFamily: 'BaiJamjuree-SemiBold',
          fontSize: 14,
          color: '#212529',
        },
             
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: response.message,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          fontFamily: 'BaiJamjuree-Bold',
          fontSize: 16,
          color: '#C61111',
        },
        text2Style: {
          fontFamily: 'BaiJamjuree-SemiBold',
          fontSize: 14,
          color: '#212529',
        },
        
      });
    }
  };

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
        <Text style={styles.infoTxtTitle}>{nome}</Text>
        <Text style={styles.infoTxt}>{preco}€</Text>
        <UnderlineBtn text="remover" onPress={() => handleRemoveFromCart(id)} />
      </View>
      <View style={styles.quantidade}>
        <TouchableOpacity
          onPress={() => {
            handleChangeCartQuantity(id, 'diminuir');
          }}>
          <MinusSvg />
        </TouchableOpacity>
        <Text style={styles.qnt}>{quantidade}</Text>
        <TouchableOpacity
          underlayColor="#C7AC4D"
          onPress={() => {
            handleChangeCartQuantity(id, 'aumentar');
          }}>
          <PlusSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5F6EF0',
    height: 100,
    paddingRight: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
  },
  Image: {
    width: '20%',
    backgroundColor: '#DFE2FC',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  capaImage: {
    width: '100%',
    height: '100%',
  },
  info: {
    width: '60%',
    justifyContent: 'center',
    marginLeft: '2%',
  },
  quantidade: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20%',
    flexDirection: 'row',
  },
  infoTxtTitle: {
    color: '#F8F9FA',
    fontFamily: 'BaiJamjuree-SemiBold',
    fontSize: 15,
  },
  infoTxt: {
    color: '#F8F9FA',
    fontFamily: 'BaiJamjuree-Regular',
    fontSize: 12,
  },
  qnt: {
    color: '#F8F9FA',
    fontFamily: 'BaiJamjuree-Bold',
    fontSize: 15,
  },
});

export default CarrinhoCard;
