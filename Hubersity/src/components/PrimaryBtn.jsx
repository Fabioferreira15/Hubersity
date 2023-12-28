import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';
const PrimaryBtn = ({
  onPress,
  text,
  paddingHorizontal,
  paddingVertical,
  borderRadius,
}) => {
  const buttonStyles = [
    styles.primaryBtn,
    {
      paddingHorizontal,
      paddingVertical,
      borderRadius,
    },
  ];

  return (
    <TouchableHighlight onPress={onPress} style={buttonStyles}>
      <Text style={styles.primaryBtnTxt}>{text}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: '#F0D060',
    alignSelf: 'center',
  },
  primaryBtnTxt: {
    color: '#151C4D',
    fontSize: 17,
    fontFamily: 'BaiJamjuree',
    fontWeight: 'bold',
  },
});

export default PrimaryBtn;
