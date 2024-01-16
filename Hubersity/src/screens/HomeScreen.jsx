import {React, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Background from '../assets/Home/backgorund.svg';
import Notificacoes from '../assets/icons/notificações.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BtnSvg from '../assets/Home/btn.svg';
import BtnInvertedSvg from '../assets/Home/btnInverted.svg';
import CantinaWhiteSvg from '../assets/icons/cantina_white.svg';
import BarWhiteSvg from '../assets/icons/bar_white.svg';
import RoletaWhiteSvg from '../assets/icons/roleta_white.svg';
import CustomButton from '../components/CustomBtns';

const Home = ({navigation}) => {
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [image, setImage] = useState('');

  const getUser = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('token');
      const idValue = await AsyncStorage.getItem('id');
      const nomeValue = await AsyncStorage.getItem('nome');
      const imageValue = await AsyncStorage.getItem('image');
      console.log(imageValue);

      setToken(tokenValue);
      setId(idValue);
      setNome(nomeValue);
      setImage(imageValue);
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      console.log(e.data.action);
      e.preventDefault();
    });
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.Background}>
          <Background />
        </View>
        <View style={styles.user}>
          <View style={styles.left}>
            {image && <Image source={{uri: image}} style={styles.imgPerfil} />}
            <Text style={styles.txt}>Olá, {nome}</Text>
          </View>
          <View style={styles.right}>
            <View style={styles.svgCircle}>
              <Notificacoes width={25} height={25} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <CustomButton
          onPress={() => navigation.navigate('Cantina')}
          text="Cantina"
          backgroundSvg={<BtnSvg width={300} height={131} />}
          svgComponent={<CantinaWhiteSvg />}
          svgContainerStyle={{
            borderRadius: 50,
            backgroundColor: '#3A459E',
            height: 35,
            width: 35,
            position: 'absolute',
            right: 0,
            top: 11,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <CustomButton
          onPress={() => navigation.navigate('Bar')}
          text="Bar"
          backgroundSvg={<BtnInvertedSvg width={300} height={131} />}
          svgComponent={<BarWhiteSvg />}
          svgContainerStyle={{
            borderRadius: 50,
            backgroundColor: '#3A459E',
            height: 35,
            width: 35,
            position: 'absolute',
            left: 3,
            top: 11,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        <CustomButton
          onPress={() => navigation.navigate('Roleta')}
          text="Roleta"
          backgroundSvg={<BtnSvg width={300} height={131} />}
          svgComponent={<RoletaWhiteSvg />}
          svgContainerStyle={{
            borderRadius: 50,
            backgroundColor: '#3A459E',
            height: 35,
            width: 35,
            position: 'absolute',
            right: 0,
            top: 11,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  Background: {
    position: 'absolute',
    zIndex: -1,
  },
  user: {
    marginTop: '10%',
    marginLeft: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgPerfil: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  txt: {
    fontSize: 23,
    marginLeft: '2%',
    fontFamily: 'BaiJamjuree-Bold',
    color: '#F8F9FA',
  },
  svgCircle: {
    backgroundColor: '#F8F9FA',
    width: 42,
    height: 42,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    marginRight: '5%',
  },
  main: {
    marginTop: '50%',
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  btn: {
    width: '80%',
    height: 131,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSvg: {
    position: 'absolute',
    zIndex: -1,
  },
  btnTxt: {
    fontSize: 30,
    color: '#F8F9FA',
    position: 'absolute',
    zIndex: 1,
    fontFamily: 'BaiJamjuree-Bold',
  },
});

export default Home;
