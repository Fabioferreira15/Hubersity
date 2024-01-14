import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import URL from '../context/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [historicoCantina, setHistoricoCantina] = useState([]);
  const [historicoBar, setHistoricoBar] = useState([]);

  useEffect(() => {
    fetchHistoricoCantina();
  }, [dataDE, dataATE]);

  const fetchHistoricoCantina = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        console.error('Sem token');
        return;
      }

      const response = await fetch(
        `${URL}/cantina/historico?numeroRegistos=5&dataDe=${dataDE}&dataAte=${dataATE}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );

      const json = await response.json();
      if (
        json.message === 'Marcações encontradas!' &&
        json.marcacoes.length > 0
      ) {
        setHistoricoCantina(json.marcacoes);
      } else {
        setHistoricoCantina([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChangeDE = (event, date) => {
    if (date !== undefined && event.type === 'set') {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      setDataDE(new Date(formattedDate));
    }
    setShowDatePickerDE(false);
  };

  const handleDateChangeATE = (event, date) => {
    if (date !== undefined && event.type === 'set') {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      setDataATE(new Date(formattedDate));
    }
    setShowDatePickerATE(false);
  };

  const showDatePickerDEComponent = () => {
    setShowDatePickerDE(true);
  };

  const showDatePickerATEComponent = () => {
    setShowDatePickerATE(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      /* style={{flex: 1, flexGrow: 1}} */>
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
                style={[
                  styles.inputButton,
                  {backgroundColor: '#DFE2FC', borderWidth: 0},
                ]}
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
                  displayFormat={'DD MMM YYYY'}
                />
              )}
            </View>
            <View style={{width: '50%'}}>
              <Text style={{marginLeft: '5%'}}>Até</Text>
              <TouchableOpacity
                style={[
                  styles.inputButton,
                  {backgroundColor: '#DFE2FC', borderWidth: 0},
                ]}
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
                  displayFormat={'DD MMM YYYY'}
                />
              )}
            </View>
          </View>
          <Text></Text>
          {opcao === 'Cantina' ? (
            <View style={{width: '100%'}}>
              {historicoCantina.length > 0 ? (
                historicoCantina.map(item => (
                  <View key={item.IdMarcacao} style={styles.marcacaoContainer}>
                    <Text style={{color: 'white', fontSize: 19}}>Marcação</Text>
                    <View style={styles.marcacaoContainer2}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 17,
                            fontWeight: 'bold',
                          }}>
                          {item.RefeicaoCantina.TipoPrato} |{' '}
                          {item.RefeicaoCantina.Nome}
                        </Text>
                        <Text style={{color: 'black', fontSize: 12}}>
                          {item.RefeicaoCantina.Periodo}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '50%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <Image
                          source={{
                            uri: item.QRCode,
                          }}
                          style={{
                            width: '70%',
                            height: '70%',
                            resizeMode: 'contain',
                          }}
                        />
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 12,
                            marginEnd: '15%',
                          }}>
                          {item.RefeicaoCantina.Data}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{fontSize: 17, marginLeft: '5%'}}>
                  Não existem registos de marcações durante o período de tempo
                  selecionado.
                </Text>
              )}
            </View>
          ) : (
            <View></View>
          )}
          <Text></Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: '35%',
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
    fontWeight: 'bold',
  },
  txtOpcaoSelecionada: {
    fontSize: 17,
    color: '#F8F9FA',
    padding: 5,
    justifyContent: 'center',
    fontWeight: 'bold',
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
    fontFamily: 'BaiJamjuree-SemiBold',
    color: '#212529',
    fontSize: 14,
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
  marcacaoContainer: {
    backgroundColor: '#5F6EF0',
    width: '90%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center',
    maxHeight: '20%',
  },
  marcacaoContainer2: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Historico;
