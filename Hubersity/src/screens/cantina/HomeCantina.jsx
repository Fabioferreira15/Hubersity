import {React, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Background from '../../assets/Home/backgorund.svg';
import BtnSvg from '../../assets/Home/btn.svg';
import BtnInvertedSvg from '../../assets/Home/btnInverted.svg';

const HomeCantina = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.Background}>
          <Background />
        </View>
        <View style={styles.title}>
            <Text style={styles.txt}>Cantina</Text>
        </View>
      </View>
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Ementas')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>Cantina</Text>
          <BtnSvg width={300} height={131} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Bar')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>Bar</Text>
          <BtnInvertedSvg width={300} height={131} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Roleta')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>Roleta</Text>
          <BtnSvg width={300} height={131} />
        </TouchableOpacity>
        
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
  title: {
    marginTop: '15%',
    alignItems: 'center',
  },
  txt: {
    fontSize: 27,
    color: '#F8F9FA',
  },
  main: {
    marginTop: '50%',
    alignItems: 'center',
  },

  btn: {
    width: '90%',
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
  },
});

export default HomeCantina;
