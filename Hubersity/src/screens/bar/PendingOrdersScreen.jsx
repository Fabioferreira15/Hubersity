import React, {useState, useEffect} from 'react'
import {
  View, 
  Text, 
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  } from 'react-native'
import Voltar from '../../assets/icons/Voltar_preto.svg';
import Header from '../../components/Header.jsx';
import {PendingOrders} from '../../api';

const PendingOrdersScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersToTake = await PendingOrders();

        if (ordersToTake.status == 404) {
          setEmpty(true);
          setLoading(false);
        } else {
          setOrders(ordersToTake);
          setEmpty(false);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Estado de orders atualizado:', orders);
  }, [orders])

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Header title='Os seus pedidos' iconPosition='left' onPress={()=> navigation.navigate('HomeBar')} customIcon={<Voltar />}/>

        <View style={styles.main}>
            {orders.map((order, index) => (
              <View key={index} style={styles.marcacaoContainer}>
                <View style={styles.marcacaoInfo}>
                  <Text style={styles.marcacaoText}>{order.nome}</Text>
                  <Text style={styles.marcacaoText}>{order.quantidade}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('OrderDetails', {
                      order: order,
                    })
                  }>
                  <Text style={styles.marcacaoButton}>Mostrar QRCode</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  )
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
});

export default PendingOrdersScreen