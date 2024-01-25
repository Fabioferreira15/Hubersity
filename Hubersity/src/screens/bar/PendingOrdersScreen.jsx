import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Voltar from '../../assets/icons/Voltar.svg';
import Header from '../../components/Header.jsx';
import {PendingOrders} from '../../api';
import EmptyStateScreenPedidosPorLevantar from './EmptyStateScreenPedidosPorLevantar.jsx';

const PendingOrdersScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ordersToTake = await PendingOrders();
        setOrders(ordersToTake.pedidos || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {}, [orders]);

  function formatData(data) {
    const dataObj = new Date(data);

    const day = ('0' + dataObj.getDate()).slice(-2);
    const month = ('0' + (dataObj.getMonth() + 1)).slice(-2);
    const year = ('' + dataObj.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  }

  return (
    <>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color="#5F6EF0" size="large" />
        </View>
      ) : orders.length === 0 ? (
        <EmptyStateScreenPedidosPorLevantar navigation={navigation} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Header
              title="Os seus pedidos"
              iconPosition="left"
              onPress={() => navigation.navigate('HomeBar')}
              customIcon={<Voltar />}
            />

            <View style={styles.main}>
              {orders.map((order, index) => (
                <View key={index} style={styles.pedidosContainer}>
                  <Text style={styles.numPedido}>
                    Pedido Nº{order.IdPedido}
                  </Text>
                  <View style={styles.card}>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>Data</Text>
                      <Text style={styles.text}>{formatData(order.Data)}</Text>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>Estado</Text>
                      <Text style={styles.text}>{order.Status}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('QrCode', {order})}>
                    <View style={styles.btnQR}>
                      <Text style={styles.textBtn}>Mostrar QR Code</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
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
  main: {
    marginTop: '40%',
    marginLeft: '5%',
  },
  pedidosContainer: {
    marginBottom: 20,
  },
  numPedido: {
    color: '#212529',
    fontSize: 23,
    fontFamily: 'BaiJamjuree-Bold',
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
  cardBody: {
    flexDirection: 'row',
  },
  cardTitle: {
    color: '#212529',
    fontSize: 17,
    fontFamily: 'BaiJamjuree-Bold',
    width: '50%',
  },
  text: {
    color: '#212529',
    fontSize: 18,
    fontFamily: 'Tajawal-Regular',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5F6EF0',
    height: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: '#F8F9FA',
    fontFamily: 'BaiJamjuree-Bold',
    fontSize: 17,
  },
});

export default PendingOrdersScreen;
