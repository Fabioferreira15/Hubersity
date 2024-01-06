import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Background from '../assets/Home/backgorund.svg';

const Header = props => {
  const {title} = props;

  return (
    <View>
      <View style={styles.Background}>
        <Background />
      </View>
      <View style={styles.title}>
        <Text style={styles.txt}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Background: {
    position: 'absolute',
    zIndex: -1,
  },
  txt: {
    fontSize: 27,
    color: '#F8F9FA',
  },
  title: {
    marginTop: '15%',
    alignItems: 'center',
  },
});

export default Header;
