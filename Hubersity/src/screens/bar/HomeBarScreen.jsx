import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import BarCards from '../../components/BarCards';
const HomeBar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <BarCards navigation={navigation} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scroll: {
    flex: 1,
    marginBottom: '15%',
  },
});

export default HomeBar;
