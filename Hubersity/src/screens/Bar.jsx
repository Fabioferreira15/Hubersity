import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import IP from '../context/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bar = () => {
  const [drinks, setDrinks] = useState([]);
  const [food, setFood] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
          console.error('Sem token');
          return;
        }
        setToken(storedToken);

        const response = await fetch(`http://${IP}:3000/bar/produtos`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const responseData = await response.json();
        console.log(responseData);

        // Separate drinks and food based on category
        const drinksData = responseData.find(
          category => category.categoria.nome === 'Bebidas',
        );
        const foodData = responseData.find(
          category => category.categoria.nome === 'Comida',
        );

        setDrinks(drinksData ? drinksData.produtos : []);
        setFood(foodData ? foodData.produtos : []);
        console.log(`bebidas: ${drinksData}`);
        console.log(`comida: ${foodData}`);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.titulo}>Bebidas:</Text>
        <ScrollView horizontal>
          <View style={styles.bebidas}>
            {drinks.map(drink => (
              <View key={drink.IdProduto} style={styles.bebidasCard}>
                <Text style={styles.cardTitle}>{drink.Nome}</Text>
                <Text style={styles.cardText}>Preço: {drink.Preco}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <Text style={styles.titulo}>Comida:</Text>
        <ScrollView horizontal>
          <View style={styles.bebidas}>
            {food.map(food => (
              <View key={food.IdProduto} style={styles.bebidasCard}>
                <Text style={styles.cardTitle}>{food.Nome}</Text>
                <Text style={styles.cardText}>Preço: {food.Preco}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
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
  },

  bebidasCard: {
    backgroundColor: 'blue',
    width: '30%',
    height: 100,
    borderRadius: 10,
    padding: 10,
    marginRight: 5,
  },
  bebidas: {
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    marginRight: 110,
    width: '95%',
  },
  titulo: {
    color: 'black',
  },
});

export default Bar;
