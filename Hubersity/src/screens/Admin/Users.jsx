import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchUsers,deleteUser} from '../../api';
import UserCard from '../../components/UserCards';
import Toast from 'react-native-toast-message';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers();

        if (response.status == 404) {
          console.log('Não há users');
        } else {
          setUsers(response || []);

        
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleDelete = async (id) => {
    const response = await deleteUser(id);
    if (response.success) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso',
        text2: response.message,
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: response,
      });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View>
          {users.map((user, index) => (
            <UserCard
              key={index}
              nome={user.nome}
              email={user.email}
              tipo={user.tipo_utilizador}
              onDeletePress={() => handleDelete(user.UserId)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginBottom: '15%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default Users;
