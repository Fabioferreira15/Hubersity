import { View, Text,StyleSheet,Button } from 'react-native'
import React,{useEffect,useState} from 'react'
import { AddCategoriaBar } from '../../api'
import Toast from 'react-native-toast-message'
import { TextInput } from 'react-native-paper'

const BarCategory = () => {
  const [nome, setNome] = useState('')

  const handlePost = async () => {
    const response = await AddCategoriaBar(nome)
    if (response.success) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso',
        text2: response.message,
      })
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: response.message,
      })
    }
    setNome('')
  }


  return (
    <View>
      <View>
        <Text>Nome da categoria</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          value={nome}
          label="Nome"
          selectionColor='#5F6EF0'
          underlineColor='#5F6EF0'
          activeUnderlineColor='#5F6EF0'
        />
        <Button title="Adicionar" onPress={handlePost} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    height: 40,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontFamily: 'BaiJamjuree-Regular',
    fontSize: 16,
    color: '#212529',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'BaiJamjuree-Regular',
    fontSize: 16,
    color: '#212529',
  },
})

export default BarCategory