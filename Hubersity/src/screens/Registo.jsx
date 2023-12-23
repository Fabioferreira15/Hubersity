import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Swiper from 'react-native-swiper';
import HeroSvg from '../assets/Registo/Herro-background.svg';
import HeroImg from '../assets/Registo/Hero-image.svg';
import HeroImgPassword from '../assets/Registo/Hero-image-password.svg';
import HeroImgCurso from '../assets/Registo/Hero-image-curso.svg';
import DropDownPicker from 'react-native-dropdown-picker';


const Registo = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const getCursos = async () => {
      try {
        const response = await fetch(`http:/${IP}:3000/cursos`);
        const data = await response.json();
        const cursos = data.map((curso) => ({
            label: curso.nomeCurso,
            value: curso.idCurso.toString(),
        }));

        console.log(cursos);


        setItems(cursos);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCursos();
  }, []);


  return (
    <>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        dotColor="#F9ECBF"
        dotStyle={{width: 8, height: 8, borderRadius: 10}}
        activeDotColor="#F0D060"
        activeDotStyle={{width: 12, height: 12, borderRadius: 10}}
        paginationStyle={{bottom: 100}}
        loop={false}>
        <View style={styles.slide}>
          <View style={styles.container}>
            <HeroSvg style={styles.blob} />
            <HeroImg style={styles.hero} />
            <View>
              <Text style={styles.title}>Informações pessoais</Text>
              <Text style={styles.text}>Passo 1 de 3</Text>
            </View>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#6C757D"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#6C757D"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.container}>
            <HeroSvg style={styles.blob} />
            <HeroImgPassword style={styles.hero2} />
            <View>
              <Text style={styles.title}>Cria a password</Text>
              <Text style={styles.text}>Passo 2 de 3</Text>
            </View>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#6C757D"
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmar Password"
                placeholderTextColor="#6C757D"
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.container}>
            <HeroSvg style={styles.blob3} />
            <HeroImgCurso width={300} height={230} style={styles.hero3} />
            <View>
              <Text style={styles.title}>Indica o teu curso</Text>
              <Text style={styles.text}>Passo 3 de 3</Text>
            </View>
            <View style={styles.form}>
              <DropDownPicker
                style={styles.DropDownPicker}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Escolhe o teu curso"
                searchable={true}
                searchablePlaceholder="Pesquisar..."
              />
            </View>
          </View>
        </View>
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#151C4D',
  },
  blob: {
    position: 'absolute',
    top: -100,
    left: 0,
    zIndex: -1,
  },
  blob3: {
    position: 'absolute',
    top: -150,
    left: 0,
    zIndex: -1,
  },
  hero: {
    marginTop: '20%',
    marginLeft: '10%',
  },
  hero2: {
    marginTop: '20%',
    marginLeft: '5%',
  },
  hero3: {
    marginTop: '20%',
    marginLeft: '5%',
  },
  title: {
    color: '#F8F9FA',
    fontSize: 27,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  text: {
    color: '#F0D060',
    fontSize: 11,
    marginLeft: '5%',
  },
  input: {
    backgroundColor: '#DFE2FC',
    width: '90%',
    height: 39,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 5,
    color: '#212529',
  },
  DropDownPicker: {
    backgroundColor: '#DFE2FC',
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 5,
    color: '#212529',
  },
});

export default Registo;
