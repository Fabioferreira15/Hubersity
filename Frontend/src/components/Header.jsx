import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper'; // Import Badge from react-native-paper
import Background from '../assets/Home/backgorund.svg';

const Header = props => {
  const {title, onPress, iconPosition, customIcon, totalCartQuantity} = props;

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
          {totalCartQuantity > 0 && (
            <Badge style={styles.badge}>{totalCartQuantity}</Badge>
          )}
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
    fontFamily: 'BaiJamjuree-Bold',
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
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
});

export default Header;
