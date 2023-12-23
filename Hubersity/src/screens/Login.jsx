import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Blob from '../assets/Login/Background-blob.svg';
import Logo from '../assets/Login/logo.svg';
import PrimaryBtn from '../components/PrimaryBtn';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Blob style={styles.blob} />
        <Logo width={407} height={212} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.txt}>Login</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#6C757D"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6C757D"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btn}>
            <PrimaryBtn onPress={() => navigation.navigate('Main')} text="Login" paddingHorizontal={"40%"} paddingVertical={10} borderRadius={5}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151C4D',
  },
  blob: {
    position: 'absolute',
    top: -100,
    left: 0,
    zIndex: -1,
  },
  txt: {
    color: '#F8F9FA',
    fontSize: 16,
    marginTop: '40%',
    marginLeft: '5%',
  },
  logo: {
    marginTop: '5%',
    marginLeft: '-7%',
  },

  input: {
    backgroundColor: '#DFE2FC',
    width: '90%',
    height: 39,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 5,
    color: '#212529',
  },
  btn: {
    marginTop: '45%',
  },
});

export default Login;
