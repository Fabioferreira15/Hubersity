import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const UserCard = ({nome,email,tipo, onDeletePress}) => {
  

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.userInfo}>Nome: {nome}</Text>
      <Text style={styles.userInfo}>Email: {email}</Text>
      <Text style={styles.userInfo}>Tipo: {tipo}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    padding: 16,
    margin: 8,
    backgroundColor: '#DFE2FC',
  },
  userInfo: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    marginBottom: 8,
    color: '#212529',
  },
  deleteButton: {
    backgroundColor: '#C61111',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#F8F9FA',
    fontFamily: 'BaiJamjuree-Bold',
  },
});

export default UserCard;
