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
import IP from '../../context/env';

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
          `http://${IP}:3000/cantina/refeicoes?data=${dataURL}`,
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
        <Text style={styles.title}>Ementas</Text>
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
          />
        )}
        <Text></Text>
        <Text style={styles.title3}>Refeição</Text>
        <Dropdown
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
        <Text style={styles.title2}>{periodo}</Text>
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
                  style={[styles.linha, {backgroundColor: '#BFC5F9'}]}>
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
            refeicaoSelecionada === null && {opacity: 0.7},
          ]}
          disabled={refeicaoSelecionada === null}
          onPress={()=>{
            Alert.alert(`Marcar refeição ${refeicaoSelecionada.Nome}`)
          }}>
          <Text style={styles.tituloTabela}>
            Marcar Refeição
            {refeicaoSelecionada ? ` | ${refeicaoSelecionada.Preco}€` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert('Adicionar outro método de pagamento')
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  title3: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '25%',
    marginBottom: 5,
  },
  inputButton: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingVertical: 20,
    width: '80%',
  },
  linha: {
    flexDirection: 'row',
    borderRadius: 5,
  },
  celula: {
    flex: 1,
    height: 50,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloTabela: {
    fontSize: 20,
    color: 'white',
    padding: 5,
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
  },
  button: {
    backgroundColor: '#4D59C7',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
});

export default Ementas;
