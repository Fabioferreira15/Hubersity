import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AddProdutosBar} from '../../api.js';
import Toast from 'react-native-toast-message';
import {TextInput} from 'react-native-paper';

const Bar = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [Stock, setStock] = useState('');

  const handlePost = async () => {
    const response = await AddProdutosBar(
      nome,
      preco,
      categoria,
      descricao,
      Stock,
    );
    if (response.success) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso',
        text2: response.message,
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: response.message,
      });
    }
    setCategoria('');
    setDescricao('');
    setNome('');
    setPreco('');
    setStock('');
  };

  return (
    <View style={StyleSheet.container}>
      <View>

        
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setNome}
        value={nome}
        label="Nome"
        selectionColor='#5F6EF0'
        underlineColor='#5F6EF0'
        activeUnderlineColor='#5F6EF0'
      />

      <TextInput
        style={styles.input}
        onChangeText={setPreco}
        value={preco}
        label="Preço"
        keyboardType="numeric"
        selectionColor='#5F6EF0'
        underlineColor='#5F6EF0'
        activeUnderlineColor='#5F6EF0'
      />

      <TextInput
        style={styles.input}
        onChangeText={setCategoria}
        value={categoria}
        label="Categoria"
        selectionColor='#5F6EF0'
        underlineColor='#5F6EF0'
        activeUnderlineColor='#5F6EF0'
      />

      <TextInput
        style={styles.input}
        onChangeText={setDescricao}
        value={descricao}
        label="Descrição"
        selectionColor='#5F6EF0'
        underlineColor='#5F6EF0'
        activeUnderlineColor='#5F6EF0'
      />

      <TextInput
        style={styles.input}
        onChangeText={setStock}
        value={Stock}
        label="Stock"
        keyboardType="numeric"
        selectionColor='#5F6EF0'
        underlineColor='#5F6EF0'
        activeUnderlineColor='#5F6EF0'
      />

      <Button title="Adicionar" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  input: {
    margin: 10,
    backgroundColor: '#DFE2FC',
  },
});

export default Bar;
