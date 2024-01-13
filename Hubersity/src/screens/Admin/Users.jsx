import {View, Text,ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchUsers} from '../../api';
import UserCard from '../../components/UserCards';

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
  }, [ users ]);

  return (
    <ScrollView>
      <View>
        {users.map((user, index) => (
          <UserCard
            key={index}
            nome={user.nome}
            email={user.email}
            id={user.id}
            role={user.tipo}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Users;
