import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../context/env';
import YellowBackground from '../../assets/Cantina/YellowSvg.svg';
import Voltar from '../../assets/icons/Voltar_preto.svg';
import HeaderYellow from '../../components/HeaderYellow';

const MarcacoesPendentes = ({navigation}) => {
  const [marcacoes, setMarcacoes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        let userId = await AsyncStorage.getItem('id');
        userId = parseInt(userId, 10);

        if (!token) {
          console.error('Sem token');
          return;
        }

        const response = await fetch(
          `${URL}/cantina/marcacao/pendentes/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const responseData = await response.json();
        setMarcacoes(responseData.marcacoes || []);
        console.log(responseData.marcacoes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Estado de marcacoes atualizado:', marcacoes);
  }, [marcacoes]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <HeaderYellow
          title="Marcações pendentes"
          iconPosition="left"
          onPress={() => navigation.navigate('HomeCantina')}
          customIcon={<Voltar />}
        />

        <View style={styles.main}>
          {marcacoes.length === 0 ? (
            <Text style={styles.titulo}>Não tem marcações pendentes</Text>
          ) : (
            marcacoes.map((marcacao, index) => (
              <View key={index} style={styles.marcacaoContainer}>
                <Text style={styles.titulo}>
                  {marcacao.RefeicaoCantina.Periodo}
                </Text>
                <View style={styles.card}>
                  <View style={styles.prato}>
                    <Text style={styles.txtBold}>Prato</Text>
                    <Text style={styles.txt}>
                      {marcacao.RefeicaoCantina.Nome}
                    </Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.txtBold}>Data</Text>
                    <Text style={styles.txt}>
                      {marcacao.RefeicaoCantina.Data}
                    </Text>
                  </View>
                  <View style={styles.estado}>
                    <Text style={styles.txtBold}>Estado</Text>
                    <Text style={styles.txt}>{marcacao.status}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('QrCode', {marcacao})}>
                  <View style={styles.btnQr}>
                    <Text style={styles.txtBtn}>Mostrar Qr Code</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: '15%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  Background: {
    position: 'absolute',
    zIndex: -1,
  },

  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginTop: '15%',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 27,
    fontFamily: 'BaiJamjuree-Bold',
    color: '#212529',
    textAlign: 'center',
    marginLeft: '20%',
  },
  main: {
    marginTop: '40%',
    marginLeft: '5%',
  },
  marcacaoContainer: {
    marginBottom: 20,
  },
  titulo: {
    color: '#212529',
    fontSize: 23,
    fontFamily: 'Tajawal-Regular',
  },
  txt: {
    color: '#212529',
    fontFamily: 'Tajawal-Regular',
    fontSize: 18,
  },
  txtBtn: {
    color: '#F8F9FA',
    fontFamily: 'BaiJamjuree-Bold',
    fontSize: 17,
  },
  prato: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  estado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  txtBold: {
    color: '#212529',
    fontFamily: 'Tajawal-Bold',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#DFE2FC',
    width: '95%',
    height: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  btnQr: {
    backgroundColor: '#5F6EF0',
    height: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MarcacoesPendentes;
