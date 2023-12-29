import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../../context/env';
import YellowBackground from '../../assets/Cantina/YellowSvg.svg';
import Voltar from '../../assets/icons/Voltar.svg';

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
          `http://${IP}:3000/cantina/marcacao/pendentes/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const responseData = await response.json();
        setMarcacoes(responseData.marcacoes);
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.Background}>
          <YellowBackground />
        </View>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Voltar />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>Marcacoes Pendentes</Text>
        </View>
        <View style={styles.main}>
          {marcacoes.map((marcacao, index) => (
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
              <View style={styles.btnQr}>
                <Text>Mostrar Qr Code</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
    marginLeft: '5%',
    marginTop: '15%',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 27,
    width: '50%',
    fontWeight: 'bold',
    color: '#F8F9FA',
    textAlign: 'center',
  },
  main: {
    marginTop: '40%',
    marginLeft: '5%',
  },
  marcacaoContainer: {
    marginBottom: 20,
  },
  titulo: {
    color: '#000',
  },
  txt: {
    color: '#000',
  },
  prato: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  estado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtBold: {
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: '#DFE2FC',
    width: '90%',
    height: 100,
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
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MarcacoesPendentes;
