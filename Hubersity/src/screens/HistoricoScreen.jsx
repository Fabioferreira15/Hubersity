import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Background from '../assets/Home/backgorund.svg';
import BtnSvg from '../assets/Home/btn.svg';
import BtnInvertedSvg from '../assets/Home/btnInverted.svg';
import Header from '../components/Header';

const Historico = ({navigation}) => {
  const [opcao, setOpcao] = useState('Cantina');
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View>
          <Header title="Histórico" />
        </View>
        <View style={styles.main}>
          <View style={styles.containerOpcoes}>
            <View
              style={[
                opcao === 'Cantina'
                  ? styles.containerOpcaoSelecionada
                  : styles.containerOpcao,
              ]}>
              <TouchableOpacity onPress={() => setOpcao('Cantina')}>
              <Text
                  style={[
                    opcao === 'Cantina'
                      ? styles.txtOpcaoSelecionada
                      : styles.txtOpcao,
                  ]}>Cantina</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                opcao === 'Bar'
                  ? styles.containerOpcaoSelecionada
                  : styles.containerOpcao,
              ]}>
              <TouchableOpacity onPress={() => setOpcao('Bar')}>
                <Text
                  style={[
                    opcao === 'Bar'
                      ? styles.txtOpcaoSelecionada
                      : styles.txtOpcao,
                  ]}>
                  Bar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  title: {
    marginTop: '15%',
    alignItems: 'center',
  },
  txt: {
    fontSize: 27,
    color: 'black',
  },
  txtOpcao: {
    fontSize: 17,
    color: '#212529',
  },
  main: {
    marginTop: '50%',
    alignItems: 'center',
  },
  containerOpcoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 16,
    backgroundColor: '#DFE2FC',
    padding: 15,
    borderRadius: 10,
  },
  containerOpcao: {
    alignItems: 'center',
    width: '50%',
    borderRadius: 10,
  },
  containerOpcaoSelecionada: {
    alignItems: 'center',
    width: '50%',
    borderRadius: 10,
    backgroundColor: '#5F6EF0',
  },
  txtOpcao: {
    fontSize: 17,
    color: '#212529',
    padding: 5,
    justifyContent: 'center',
  },
  txtOpcaoSelecionada: {
    fontSize: 17,
    color: '#F8F9FA',
    padding: 5,
    justifyContent: 'center',
  },
});

export default Historico;
