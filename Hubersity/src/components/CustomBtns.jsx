
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, text, backgroundSvg, svgComponent, position, svgContainerStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, position]}>
      <Text style={styles.btnTxt}>{text}</Text>
      {backgroundSvg && <View style={[styles.btnSvg]}>{backgroundSvg}</View>}
      {svgComponent && (
        <View style={[styles.svgContainer, svgContainerStyle]}>{svgComponent}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    height: 131,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  btnTxt: {
    fontSize: 30,
    color: '#F8F9FA',
    fontFamily: 'BaiJamjuree-Bold',
    zIndex: 1,
  },
  btnSvg: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
  },

});

export default CustomButton;