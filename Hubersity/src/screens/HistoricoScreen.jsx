import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {IP} from '../context/env';
import DateTimePicker from '@react-native-community/datetimepicker';
import Background from '../assets/Home/backgorund.svg';
import BtnSvg from '../assets/Home/btn.svg';
import BtnInvertedSvg from '../assets/Home/btnInverted.svg';
import Header from '../components/Header';
import CalendarioSvg from '../assets/icons/calendário.svg';

const Historico = ({navigation}) => {
  const [opcao, setOpcao] = useState('Cantina');
  const [dataDE, setDataDE] = useState(new Date());
  const [dataATE, setDataATE] = useState(new Date());
  const [showDatePickerDE, setShowDatePickerDE] = useState(false);
  const [showDatePickerATE, setShowDatePickerATE] = useState(false);

  const handleDateChangeDE = (event, date) => {
    if (date !== undefined && event.type === 'set') {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      setDataDE(new Date(formattedDate));
    }
    setShowDatePickerDE(false);
    fetchHistoricoCantina();
  };

  const handleDateChangeATE = (event, date) => {
    if (date !== undefined && event.type === 'set') {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      setDataATE(new Date(formattedDate));
    }
    setShowDatePickerATE(false);
    fetchHistoricoCantina();
  };

  const showDatePickerDEComponent = () => {
    setShowDatePickerDE(true);
  };

  const showDatePickerATEComponent = () => {
    setShowDatePickerATE(true);
  };

  //fetch historico cantina
  const fetchHistoricoCantina = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/cantina/historico?numeroRegistos=5&dataDe=2023-12-28&dataAte=2023-12-28',
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Background style={styles.Background} />
        <Header title="Histórico" />
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
                  ]}>
                  Cantina
                </Text>
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
          <View style={styles.containerDatas}>
            <View style={{width: '50%'}}>
              <Text style={{marginLeft: '5%'}}>De</Text>
              <TouchableOpacity
                style={styles.inputButton}
                onPress={showDatePickerDEComponent}>
                <Text style={styles.inputButtonText}>
                  {dataDE && dataDE.toLocaleDateString()}
                </Text>
                <CalendarioSvg style={styles.icon} />
              </TouchableOpacity>
              {showDatePickerDE && (
                <DateTimePicker
                  value={dataDE}
                  mode="date"
                  display="default"
                  onChange={handleDateChangeDE}
                  maximumDate={dataATE}
                />
              )}
            </View>
            <View style={{width: '50%'}}>
              <Text style={{marginLeft: '5%'}}>Até</Text>
              <TouchableOpacity
                style={styles.inputButton}
                onPress={showDatePickerATEComponent}>
                <Text style={styles.inputButtonText}>
                  {dataATE && dataATE.toLocaleDateString()}
                </Text>
                <CalendarioSvg style={styles.icon} />
              </TouchableOpacity>
              {showDatePickerATE && (
                <DateTimePicker
                  value={dataATE}
                  mode="date"
                  display="default"
                  onChange={handleDateChangeATE}
                  minimumDate={dataDE}
                  maximumDate={new Date()}
                />
              )}
            </View>
          </View>
          {opcao === 'Cantina' ? (
            <View>
              <FlatList></FlatList>
            </View>
          ) : (
            <View></View>
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
    borderRadius: 5,
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
  inputButton: {
    borderWidth: 1,
    borderColor: '#212529',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '5%',
    backgroundColor: 'white',
  },
  inputButtonText: {
    fontFamily: 'Tajawal-Regular',
    color: '#212529',
    fontSize: 17,
  },
  containerDatas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Historico;
