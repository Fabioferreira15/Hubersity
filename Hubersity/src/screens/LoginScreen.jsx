import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Blob from '../assets/Login/Background-blob.svg';
import Logo from '../assets/Login/logo.svg';
import PrimaryBtn from '../components/PrimaryBtn.jsx';
import UnderlineBtn from '../components/UnderlineBtn.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthProvider.js';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  const {emailError, passwordError} = useContext(AuthContext);

  useEffect(() => {
    console.log(emailError);
  }, [emailError]);

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
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {/* {emailError &&
            emailError.map((error, index) => (
              <Text key={index} style={styles.errorText}>
                {error}
              </Text>
            ))} */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6C757D"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        {/*  <PrimaryBtn
          onPress={() => {
            navigation.navigate('Registo');
          }}
          text="Register"
          borderRadius={5}
        /> */}
        <View style={styles.btn}>
          <PrimaryBtn
            onPress={() => {
              login(email, password);
            }}
            text="Login"
            paddingHorizontal={'40%'}
            paddingVertical={10}
            borderRadius={5}
          />
          <View style={styles.registo}>
            <Text style={styles.registoTxt}>Ainda não tens conta?</Text>
            <UnderlineBtn
              onPress={() => {
                navigation.navigate('Registo');
              }}
              text="Regista-te"
              color="#F0D060"
              size={16}
            />
          </View>
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
    marginTop: '40%',
    width: '95%',
    alignSelf: 'center',
  },
  registo:{
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  registoTxt:{
    color: '#F8F9FA',
    fontSize: 16,
    marginRight: '2%',
  },
});

export default Login;
