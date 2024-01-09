import React from 'react';
import {Text, View,Button} from 'react-native';
import Toast from 'react-native-toast-message';

const Roleta = () => {

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Toast',
      text2: 'Hello world',
      autoHide:true,
      visibilityTime:3000,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Roleta</Text>
      <Button title="Show Toast" onPress={showToast} />
    </View>
  );
};
export default Roleta;