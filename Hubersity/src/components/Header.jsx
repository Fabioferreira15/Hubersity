import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Background from '../assets/Home/backgorund.svg';

const Header = props => {
  const {title, onPress, iconPosition,customIcon} = props;

  const renderLeftContent = () => {
    if (iconPosition === 'left') {
      return (
        <TouchableOpacity style={styles.btnLeft} onPress={onPress}>
          {customIcon}
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderRightContent = () => {
    if (iconPosition === 'right') {
      return (
        <TouchableOpacity style={styles.btnRight} onPress={onPress}>
          {customIcon}
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View>
      <View style={styles.Background}>
        <Background />
      </View>
      <View style={styles.titleContainer}>
        {renderLeftContent()}
        <Text style={styles.txt}>{title}</Text>
        {renderRightContent()}
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
  titleContainer: {
    marginTop: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLeft: {
    position: 'absolute',
    left: 10,
  },
  btnRight: {
    position: 'absolute',
    right: 10,
  },
});

export default Header;
