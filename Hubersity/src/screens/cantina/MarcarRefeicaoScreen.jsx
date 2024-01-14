import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import CalendarioSvg from '../../assets/icons/calendário.svg';
import URL from '../../context/env';
import HeaderYellow from '../../components/HeaderYellow';
import Voltar from '../../assets/icons/Voltar_preto.svg';
import {PayCanteenReservation} from '../../api';
import Toast from 'react-native-toast-message';

const Ementas = ({navigation}) => {
  const [ementas, setEmentas] = useState([]);
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [token, setToken] = useState('');
  const [periodo, setPeriodo] = useState('Almoço');
  const [refeicaoSelecionada, setRefeicaoSelecionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (!storedToken) {
          console.error('Sem token');
          return;
        }

        setToken(storedToken);

        const formattedDate = `${data.getFullYear()}-${String(
          data.getMonth() + 1,
        ).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;

        const dataURL = encodeURIComponent(formattedDate);

        const response = await fetch(
          `${URL}/cantina/refeicoes?data=${dataURL}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );
        const responseData = await response.json();
        setEmentas(responseData.refeicoes || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data, token]);

  const handlePay = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const userIdInt = parseInt(id, 10);

      const detalhes={
        IdRefeicao: refeicaoSelecionada.IdRefeicao,
      }
      const response = await PayCanteenReservation(
        userIdInt,
        detalhes,
      );

      if (response.success) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: response.message,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: response.message,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (event, date) => {
    if (date !== undefined && event.type === 'set') {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      setData(new Date(formattedDate));
      setRefeicaoSelecionada(null);
    }
    setShowDatePicker(false);
  };

  const showDatePickerComponent = () => {
    setShowDatePicker(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <HeaderYellow
          title="Marcar Refeição"
          iconPosition="left"
          onPress={() => navigation.navigate('HomeCantina')}
          customIcon={<Voltar />}
        />
        <Text style={styles.title3}>Data</Text>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={showDatePickerComponent}>
          <Text style={styles.inputButtonText}>
            {data && data.toLocaleDateString()}
          </Text>
          <CalendarioSvg style={styles.icon} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={handleDateChange}
            displayFormat={'DD MMM YYYY'}
          />
        )}
        <Text></Text>
        <Text style={styles.title4}>Refeição</Text>
        <Dropdown
          style={styles.dropdown}
          data={[{value: 'Almoço'}, {value: 'Jantar'}]}
          labelField="value"
          valueField="value"
          placeholder="Seleciona uma refeição"
          containerStyle={{width: 200}}
          onChange={item => {
            setPeriodo(item.value);
            setRefeicaoSelecionada(null);
          }}
        />
        <Text style={styles.refeicaoEscolhida}>{periodo}</Text>
        {ementas.filter(refeicao => refeicao.Periodo === periodo).length >
          0 && (
          <View style={styles.tabela}>
            <View style={[styles.linha, {backgroundColor: '#4D59C7'}]}>
              <View style={styles.celula}>
                <Text style={styles.tituloTabela}>Preço</Text>
              </View>
              <View style={styles.celula}>
                <Text style={styles.tituloTabela}>Prato</Text>
              </View>
            </View>
            {ementas
              .filter(refeicao => refeicao.Periodo === periodo)
              .map(refeicao => (
                <View
                  key={refeicao.IdRefeicao}
                  style={[styles.linha2, {backgroundColor: '#BFC5F9'}]}>
                  <View style={styles.celula}>
                    <Text>{refeicao.Preco}€</Text>
                  </View>
                  <View style={[styles.celula, styles.selectContainer]}>
                    <Text>{refeicao.Nome}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setRefeicaoSelecionada(refeicao);
                      }}
                      style={styles.select}>
                      <View
                        style={[
                          styles.selectDot,
                          refeicao === refeicaoSelecionada &&
                            styles.selectedDot,
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        )}
        {ementas.filter(refeicao => refeicao.Periodo === periodo).length ===
          0 && (
          <Text style={styles.noRefeicoesText}>
            Não há refeições disponíveis.
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            refeicaoSelecionada === null /* && {opacity: 0.7} */,
          ]}
          disabled={refeicaoSelecionada === null}
          onPress={handlePay}>
          <Text style={styles.tituloTabela}>
            Marcar Refeição
            {refeicaoSelecionada ? ` | ${refeicaoSelecionada.Preco}€` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert('Adicionar outro método de pagamento');
          }}>
          <Text style={styles.title2}>
            + Adicionar outro método de pagamento
          </Text>
        </TouchableWithoutFeedback>
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
  title: {
    fontSize: 27,
    fontFamily: 'BaiJamjuree-Bold',
    color: '#212529',
    textAlign: 'center',
  },
  title2: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#212529',
    textAlign: 'center',
    marginTop: 10,
  },
  refeicaoEscolhida: {
    marginTop: 20,
    marginLeft: '5%',
    fontFamily: 'BaiJamjuree-Bold',
    color: '#212529',
    fontSize: 23,
  },
  title3: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 5,
    marginTop: '7%',
    color: '#212529',
    fontSize: 16,
    fontFamily: 'BaiJamjuree-Bold',
  },
  title4: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 5,
    marginTop: '1%',
    color: '#212529',
    fontSize: 16,
    fontFamily: 'BaiJamjuree-Bold',
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
  dropdown: {
    borderWidth: 1,
    borderColor: '#212529',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    justifyContent: 'flex-end',
    marginLeft: '5%',
    backgroundColor: 'white',
    fontFamily: 'Tajawal-Regular',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  tabela: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    width: '90%',
    marginLeft: '5%',
  },
  linha: {
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  linha2: {
    flexDirection: 'row',
    borderLeftRadius: 10,
    borderRightRadius: 10,
  },
  celula: {
    flex: 1,
    height: 50,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloTabela: {
    fontSize: 18,
    color: 'white',
    padding: 5,
    fontFamily: 'BaiJamjuree-Bold',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  select: {
    marginLeft: 5,
  },
  selectDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  selectedDot: {
    backgroundColor: 'black',
  },
  noRefeicoesText: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    marginLeft: '5%',
  },
  button: {
    backgroundColor: '#4D59C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    marginLeft: '5%',
    marginTop: 20,
  },
});

export default Ementas;
