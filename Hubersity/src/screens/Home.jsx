import {React, useEffect} from 'react';
import {View, Text} from 'react-native';

const Home = ({navigation}) => {
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      console.log(e.data.action);
      e.preventDefault();
    });
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
