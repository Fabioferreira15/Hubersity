import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const UnderlineBtn = ({ onPress, text, color = '#F8F9FA',size, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.Txt, { color: color,fontSize:size }, style]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Txt: {
    color: '#F8F9FA',
    textDecorationLine: 'underline',
    fontFamily: 'BaiJamjuree-Bold',
  },
});

export default UnderlineBtn;
