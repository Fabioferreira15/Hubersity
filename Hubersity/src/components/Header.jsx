import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Background from '../assets/Home/backgorund.svg';
import CarrinhoHeader from '../assets/icons/Carrinho_header.svg';

const Header = props => {
  const {title, onPress} = props;

  return (
    <View>
      <View style={styles.Background}>
        <Background />
      </View>
      <View style={styles.title}>
        <Text style={styles.txt}>{title}</Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <CarrinhoHeader />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Background: {
    position: 'absolute',
    zIndex: -1,
  },
  txt: {
    fontSize: 27,
    color: '#F8F9FA',
  },
  title: {
    marginTop: '15%',
    marginLeft: '45%',
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Header;
