import {View, Text, StyleSheet,Image} from 'react-native';
import React, {useEffect} from 'react';
import PrimaryBtn from '../../components/PrimaryBtn';



const QrCode = ({navigation,route}) => {
  const marcacao = route.params.marcacao;


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleTxt}>
          {marcacao.RefeicaoCantina.Periodo} - {marcacao.RefeicaoCantina.Data}
        </Text>
      </View>
      <View style={styles.qrCode}>
        <Image
          source={{
            uri: marcacao.QRCode,
          }}
          style={{width: 200, height: 200, resizeMode: 'contain',borderRadius:10}}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTxtTitle}>Prato</Text>
        <Text style={styles.infoTxt}>
          {marcacao.RefeicaoCantina.TipoPrato} - {marcacao.RefeicaoCantina.Nome}
        </Text>
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
    marginTop: '20%',
    alignItems: 'center',
  },
  infoTxtTitle: {
    color: '#F8F9FA',
    fontSize: 25,
    fontFamily: 'BaiJamjuree-Bold',
  },
  infoTxt: {
    color: '#F8F9FA',
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Regular',
  },
  btn: {
    marginTop: '45%',
    alignItems: 'center',
  },
});

export default QrCode;
