import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import PrimaryBtn from '../../components/PrimaryBtn';

const QrCode = ({navigation,route}) => {
  const marcacao = route.params.marcacao;

  useEffect(() => {
    console.log(marcacao);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleTxt}>
          {marcacao.RefeicaoCantina.Periodo} - {marcacao.RefeicaoCantina.Data}
        </Text>
      </View>
      <View style={styles.qrCode}>
        <Text style={styles.qrCodeTxt}>QR CODE</Text>
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
    borderWidth: 2,
  },
  qrCodeTxt: {
    color: '#F8F9FA',
    fontSize: 25,
    fontFamily: 'BaiJamjuree-Bold',
  },
  info: {
    marginTop: '20%',
    alignItems: 'center',
  },
});

export default QrCode;
