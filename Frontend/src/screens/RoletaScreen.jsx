import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Voltar from '../assets/icons/Voltar.svg';
import Header from '../components/Header.jsx';
import Roleta from '../assets/Wheel.svg';
import Pointer from '../assets/Pointer.svg';

export default function App({navigation}) {
  const [rotationValue] = useState(new Animated.Value(0));

  const rotateRoleta = () => {
    rotationValue.setValue(0);

    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const spin = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Header
          title="Roleta"
          iconPosition="left"
          onPress={() => navigation.navigate('Home')}
          customIcon={<Voltar />}
        />
        <View style={styles.main}>
          <Text style={styles.txtTitulo}>
            Aqui tens hipótese de ganhares um brinde todos os dias!
          </Text>
          <Text style={styles.txtInfo}>Gira a roleta e testa a tua sorte.</Text>
        </View>
        <View style={styles.pointer}>
          <Pointer />
        </View>
        <Animated.View
          style={[
            styles.roletaContainer,
            {
              transform: [{translateY: -50}, {rotate: spin}],
            },
          ]}>
          <Roleta style={styles.roleta} />
        </Animated.View>
        <TouchableOpacity
          style={styles.btnGirar}
          onPress={() => {
            rotateRoleta();
          }}>
          <Text style={styles.textBtnGirar}>Spin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  roletaContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  roleta: {
    resizeMode: 'contain',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: '15%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  main: {
    marginTop: '30%',
    marginLeft: '5%',
  },
  txtTitulo: {
    fontSize: 18,
    fontFamily: 'BaiJamjuree-Bold',
    color: '#212529',
  },
  txtInfo: {
    fontSize: 16,
    fontFamily: 'BaiJamjuree-Regular',
    color: '#212529',
  },
  btnGirar: {
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: '10%',
    borderRadius: 10,
    width: '40%',
    backgroundColor: '#F0D060',
    verticalAlignText: 'middle',
    paddingVertical: '2%',
  },
  textBtnGirar: {
    color: '#151C4D',
    fontSize: 15,
    fontFamily: 'BaiJamjuree-Bold',
    textAlign: 'center',
  },
  pointer: {
    marginTop: 356,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
});
