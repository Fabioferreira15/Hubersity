import React,{useContext} from 'react';
import {Text, View} from 'react-native';
import PrimaryBtn from '../components/PrimaryBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthProvider';

const Perfil = () => {
  const {logout} = useContext(AuthContext);



  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Perfil</Text>
      <PrimaryBtn
        text="Logout"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};
export default Perfil;
