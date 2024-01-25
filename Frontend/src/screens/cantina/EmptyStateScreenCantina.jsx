import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import EmptyStateSvg from '../../assets/Bar/emptystate.svg';
import HeaderYellow from '../../components/HeaderYellow';
import Voltar from '../../assets/icons/Voltar_preto.svg';

const EmptyStateScreenCantina = ({navigation}) => {
    const {height} = Dimensions.get('window');
    return (
        <View style={StyleSheet.container}>
        <View>
            <HeaderYellow
            iconPosition="left"
            title="Marcações Pendentes"
            customIcon={<Voltar />}
            onPress={() => navigation.navigate('HomeCantina')}
            />
        </View>
        <View style={[styles.main, {height: height - 60}]}>
            <View>
            <EmptyStateSvg />
            </View>
            <View style={styles.txtContainer}>
            <Text style={styles.txt}>Ups, não tens nenhuma marcação!</Text>
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
  
  export default EmptyStateScreenCantina;