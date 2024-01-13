import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const StockCard = ({nome, qunatidade, onpress}) => {
  return (
    <View style={StyleSheet.container}>
      <Text style={styles.text}>{nome}</Text>
      <Text style={styles.text}>{qunatidade}</Text>
      {/* aumentar diminuir quantidade */}
      <TouchableOpacity style={styles.button} onPress={onpress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onpress}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    margin: 8,
    backgroundColor: '#DFE2FC',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    marginBottom: 8,
    color: '#212529',
  },
  button: {
    backgroundColor: '#C61111',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#F8F9FA',
    fontFamily: 'BaiJamjuree-Bold',
  },
});

export default StockCard;
