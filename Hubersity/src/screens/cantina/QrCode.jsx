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
        <Text>Prato</Text>
        <Text>
          {marcacao.RefeicaoCantina.TipoPrato} - {marcacao.RefeicaoCantina.Nome}
        </Text>
      </View>
      <View>
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
    marginTop: 20,
    alignItems: 'center',
  },
  titleTxt: {
    color: '#F8F9FA',
    fontSize: 25,
    fontFamily: 'BaiJamjuree-Bold',
  },
  qrCode: {
    marginTop: '50%',
    alignItems: 'center',

  },

  info: {
    marginTop: '40%',
    alignItems: 'center',
  },
});

export default QrCode;
