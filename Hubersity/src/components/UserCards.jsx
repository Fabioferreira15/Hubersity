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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserCard;
