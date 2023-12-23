import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
const UnderlineBtn = ({
  onPress,
  text,
}) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.Txt}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Txt: {
    color: '#F8F9FA',
    textDecorationLine: 'underline',
  },
});

export default UnderlineBtn;
