import React, {useState, useEffect,useContext} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Swiper from 'react-native-swiper';
import HeroSvg from '../assets/Registo/Herro-background.svg';
import HeroImg from '../assets/Registo/Hero-image.svg';
import HeroImgPassword from '../assets/Registo/Hero-image-password.svg';
import HeroImgCurso from '../assets/Registo/Hero-image-curso.svg';
import DropDownPicker from 'react-native-dropdown-picker';
import PrimaryBtn from '../components/PrimaryBtn';
import { AuthContext } from '../context/AuthProvider';
import URL from '../context/env';

const Registo = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmarPassword, setConfirmarPassword] = useState('');

  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmarPasswordError, setConfirmarPasswordError] = useState('');
  const [cursoError, setCursoError] = useState('');

  const {login} = useContext(AuthContext);

  const registar = async () => {
    try {
      const response = await fetch(
        `${URL}/utilizadores/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            password: password,
            confirmarPassword: ConfirmarPassword,
            nomeCurso: value,
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        login(email,password);
      } else {
        const errors = data.errors || [];
        errors.forEach(error => {
          switch (error.path) {
            case 'nome':
              setNomeError(error.msg || '');
              break;
            case 'email':
              setEmailError(error.msg || '');
              break;
            case 'password':
              setPasswordError(error.msg || '');
              break;
            case 'confirmarPassword':
              setConfirmarPasswordError(error.msg || '');
              break;
            case 'nomeCurso':
              setCursoError(error.msg || '');
              break;
            default:
              break;
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCursos = async () => {
      try {
        const response = await fetch(`${URL}/cursos`);
        const data = await response.json();
        const cursos = data.map(curso => ({
          label: curso.nomeCurso,
          value: curso.nomeCurso,
        }));

        console.log(cursos);

        setItems(cursos);
      } catch (error) {
        console.log(error);
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
            <View style={styles.imgContainer}>
              <HeroSvg style={styles.blob} />
              <HeroImg style={styles.hero} />
            </View>
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
                value={nome}
                onChangeText={text => {
                  setNome(text);
                  setNomeError('');
                }}
              />
              {nomeError ? (
                <Text style={styles.errorText}>{nomeError}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#6C757D"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setEmailError('');
                }}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
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
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError('');
                }}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="Confirmar Password"
                placeholderTextColor="#6C757D"
                secureTextEntry={true}
                value={ConfirmarPassword}
                onChangeText={text => {
                  setConfirmarPassword(text);
                  setConfirmarPasswordError('');
                }}
              />
              {confirmarPasswordError ? (
                <Text style={styles.errorText}>{confirmarPasswordError}</Text>
              ) : null}
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
            {cursoError ? (
              <Text style={styles.errorText}>{cursoError}</Text>
            ) : null}
            <PrimaryBtn
              text="Registar"
              onPress={() => {
                registar();
              }}
            />
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: '5%',
  },
});

export default Registo;
