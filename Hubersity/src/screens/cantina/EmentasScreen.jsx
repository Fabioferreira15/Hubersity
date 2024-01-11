import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarioSvg from '../../assets/icons/calendário.svg';
import URL from '../../context/env';
import HeaderYellow from '../../components/HeaderYellow';
import Voltar from '../../assets/icons/Voltar_preto.svg';

const Ementas = ({navigation}) => {
  const [ementas, setEmentas] = useState([]);
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [token, setToken] = useState('');

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
        console.log(responseData.refeicoes);
        console.log(`ementas: ${ementas}`);
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
    }
    setShowDatePicker(false);
  };

  const showDatePickerComponent = () => {
    setShowDatePicker(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <HeaderYellow title="Ementas" iconPosition='left' onPress={()=>navigation.navigate('HomeCantina')} customIcon={<Voltar />}/>
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
        <Text style={styles.title2}>ALMOÇO</Text>
        {ementas.length > 0 ? (
          <View style={styles.tabela}>
            <View style={[styles.linha, {backgroundColor: '#4D59C7'}]}>
              <View style={styles.celula}>
                <Text style={styles.tituloTabela}>Menu</Text>
              </View>
              <View style={styles.celula}>
                <Text style={styles.tituloTabela}>Prato</Text>
              </View>
            </View>
            {ementas
              .filter(refeicao => refeicao.Periodo === 'Almoço')
              .map(refeicao => (
                <View
                  key={refeicao.IdRefeicao}
                  style={[styles.linha2, {backgroundColor: '#BFC5F9'}]}>
                  <View style={styles.celula}>
                    <Text style={styles.tipoPratoText}>
                      {refeicao.TipoPrato}
                    </Text>
                  </View>
                  <View style={styles.celula}>
                    <Text>{refeicao.Nome}</Text>
                  </View>
                </View>
              ))}
          </View>
        ) : (
          <Text style={styles.textNoMeal}>Não há ementas disponíveis.</Text>
        )}
        <Text></Text>
        <Text style={styles.title2}>JANTAR</Text>
        {ementas.length > 0 ? (
          <View style={styles.tabela}>
            <View style={[styles.linha, {backgroundColor: '#4D59C7'}]}>
              <View style={styles.celula}>
                <Text style={styles.tituloTabela}>Menu</Text>
              </View>
              <View style={styles.celula}>
                <Text style={styles.tituloTabela}>Prato</Text>
              </View>
            </View>
            {ementas
              .filter(refeicao => refeicao.Periodo === 'Jantar')
              .map(refeicao => (
                <View
                  key={refeicao.IdRefeicao}
                  style={[styles.linha2, {backgroundColor: '#BFC5F9'}]}>
                  <View style={styles.celula}>
                    <Text style={styles.tipoPratoText}>
                      {refeicao.TipoPrato}
                    </Text>
                  </View>
                  <View style={styles.celula}>
                    <Text>{refeicao.Nome}</Text>
                  </View>
                </View>
              ))}
          </View>
        ) : (
          <Text style={styles.textNoMeal}>Não há ementas disponíveis.</Text>
        )}
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
    marginTop: 5,
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
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  linha2: {
    flexDirection: 'row',
    borderLeftRadius:10,
    borderRightRadius:10,
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
  tipoPratoText: {
    fontSize: 16,
    color: '#212529',
    fontFamily: 'BaiJamjuree-Bold',
    /* direcionar a direita */
    textAlign: 'right',
  },
  textNoMeal: {
    fontFamily: 'Tajawal-Regular',
    color: '#212529',
    fontSize: 17,
    marginLeft: '5%',
  }
});

export default Ementas;
