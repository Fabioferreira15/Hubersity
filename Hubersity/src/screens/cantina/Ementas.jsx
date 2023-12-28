import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarioSvg from '../../assets/icons/calendário.svg';
import IP from '../../context/env';

const Ementas = ({navigation}) => {
  const [ementas, setEmentas] = useState([]);
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.error('Sem token');
          return;
        }

        const response = await fetch(`http://${IP}:3000/cantina/refeicoes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        setEmentas(responseData.refeicoes);
        console.log(responseData.refeicoes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (event, date) => {
    if (date !== undefined && event.type === 'set') {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      setData(new Date(formattedDate));
      console.log(formattedDate);
    }
    setShowDatePicker(false);
  };

  const showDatePickerComponent = () => {
    setShowDatePicker(true);
  };

  const filtrarRefeicoesPorData = () => {
    return ementas.filter(refeicao => {
      const dataRefeicao = new Date(refeicao.Data);
      return (
        dataRefeicao.getDate() === data.getDate() &&
        dataRefeicao.getMonth() === data.getMonth() &&
        dataRefeicao.getFullYear() === data.getFullYear()
      );
    });
  };

  return (
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
      <Text style={styles.title2}>ALMOÇO</Text>
      <View style={styles.tabela}>
        <View style={[styles.linha, {backgroundColor: '#4D59C7'}]}>
          <View style={styles.celula}>
            <Text style={styles.tituloTabela}>Menu</Text>
          </View>
          <View style={styles.celula}>
            <Text style={styles.tituloTabela}>Prato</Text>
          </View>
        </View>
        {filtrarRefeicoesPorData().map(refeicao => (
          <View
            key={refeicao.IdRefeicao}
            style={[styles.linha, {backgroundColor: '#BFC5F9'}]}>
            <View style={styles.celula}>
              <Text>{refeicao.TipoPrato}</Text>
            </View>
            <View style={styles.celula}>
              <Text>{refeicao.Nome}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Ementas;
