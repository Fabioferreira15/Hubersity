import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryBtn from '../../components/PrimaryBtn';

const QrCode = ({navigation, route}) => {
  const pedido = route.params.order;
  console.log('Pedido:', pedido);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleTxt}>Pedido Nº{pedido.IdPedido}</Text>
      </View>
      <View style={styles.qrCode}>
        <Image
          source={{
            uri: pedido.QRCode,
          }}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain',
            borderRadius: 10,
          }}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTxtTitle}>Produtos</Text>
        {pedido.produtos.map(produto => (
          <Text key={produto.IdProduto} style={styles.infoTxt}>
            {produto['ProdutosBar.Nome']} - {produto.Quantidade}x
          </Text>
        ))}
      </View>
      <View style={styles.btn}>
        <PrimaryBtn
          text="Voltar"
          onPress={() => {
            navigation.goBack();
          }}
          paddingHorizontal={130}
          paddingVertical={5}
          borderRadius={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151C4D',
  },
  title: {
    marginTop: '25%',
    alignItems: 'center',
  },
  titleTxt: {
    color: '#F8F9FA',
    fontSize: 25,
    fontFamily: 'BaiJamjuree-Bold',
  },
  qrCode: {
    marginTop: '20%',
    alignItems: 'center',
  },
  info: {
    marginTop: '10%',
    alignItems: 'center',
  },
  infoTxtTitle: {
    color: '#F8F9FA',
    fontSize: 25,
    fontFamily: 'BaiJamjuree-Bold',
  },
  infoTxt: {
    color: '#F8F9FA',
    fontSize: 17,
    fontFamily: 'BaiJamjuree-Regular',
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '17%',
    alignItems: 'center',
  },
});

export default QrCode;
