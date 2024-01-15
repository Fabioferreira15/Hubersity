import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import EmptyStateSvg from '../../assets/Bar/emptystate.svg';
import Header from '../../components/Header';
import Voltar from '../../assets/icons/Voltar.svg';

const EmptyStateScreenPedidosPorLevantar = ({navigation}) => {
    const {height} = Dimensions.get('window');
    return (
        <View style={StyleSheet.container}>
        <View>
            <Header
            iconPosition="left"
            title="Pedidos por Levantar"
            customIcon={<Voltar />}
            onPress={() => navigation.navigate('HomeBar')}
            />
        </View>
        <View style={[styles.main, {height: height - 60}]}>
            <View>
            <EmptyStateSvg />
            </View>
            <View style={styles.txtContainer}>
            <Text style={styles.txt}>Ups, não tens nenhum pedido no bar pendente!</Text>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtContainer: {
      width: '95%',
    },
    txt: {
      fontFamily: 'BaiJamjuree-Bold',
      fontSize: 27,
      textAlign: 'center',
      color: '#212529',
    },
  });
  
  export default EmptyStateScreenPedidosPorLevantar;