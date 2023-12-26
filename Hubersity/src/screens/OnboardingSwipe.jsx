import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import HeroSvg from '../assets/Onboarding/Hero-image.svg';
import PrimaryBtn from '../components/PrimaryBtn';
import UnderlineBtn from '../components/UnderlineBtn';
import Voltar from '../assets/icons/Voltar.svg';

const Onboarding = ({navigation}) => {

  let swiper;

  const handleSkip = () => {
    if (swiper) {
      swiper.scrollBy(3, true);
    }
  };

  const handleNext = () => {
    if (swiper) {
      swiper.scrollBy(1, true);
    }
  };

  const handlePrev = () => {
    if (swiper) {
      swiper.scrollBy(-1, true);
    }
  };
  

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
        loop={false}
        ref={(ref) => { swiper = ref; }}
        >
        <View style={styles.slide}>
          <View style={styles.container}>
            <View style={styles.btn}>
              <UnderlineBtn onPress={handleSkip} text="Skip" />
            </View>

            <View>
              <HeroSvg />
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>Marca as refeições facilmente</Text>
              <Text style={styles.text}>
                Dá uma vista de olhos nas ementas diárias da cantina e escolhe a
                tua refeição preferida sem complicações.
              </Text>
            </View>
            <View style={styles.primaryBtn}>
              <PrimaryBtn
                onPress={handleNext}
                text="Próximo"
                paddingHorizontal={59}
                paddingVertical={10}
                borderRadius={10}
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.container}>
            <View style={styles.btn}>
              <UnderlineBtn
                onPress={handleSkip}
                text="Skip"
              />
            </View>
            <Image
              source={require('../assets/Onboarding/Hero-image.png')}
              style={{width: '100%', height: 300, alignSelf: 'center'}}
            />
            <View></View>

            <View style={styles.content}>
              <Text style={styles.title}>Descobre o menu do bar</Text>
              <Text style={styles.text}>
                Adiciona ao carrinho e faz os teus pedidos de forma simples e
                rápida.
              </Text>
            </View>
            <View style={styles.primaryBtn}>
              <PrimaryBtn
                onPress={handleNext}
                text="Próximo"
                paddingHorizontal={59}
                paddingVertical={10}
                borderRadius={10}
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.container}>
            <View style={styles.btn}>
              <UnderlineBtn
                onPress={handleSkip}
                text="Skip"
              />
            </View>
            <Image
              source={require('../assets/Onboarding/hero-image-3.png')}
              style={{width: '100%', height: 300, alignSelf: 'center'}}
            />
            <View></View>

            <View style={styles.content}>
              <Text style={styles.title}>Paga sem complicações</Text>
              <Text style={styles.text}>
                Desfruta dos pagamentos fáceis e intuitivos, paga utilizando o
                telemóvel.
              </Text>
            </View>
            <View style={styles.primaryBtn}>
              <PrimaryBtn
                onPress={handleNext}
                text="Próximo"
                paddingHorizontal={59}
                paddingVertical={10}
                borderRadius={10}
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.container}>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={handlePrev}>
                <Voltar />
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/Onboarding/hero-image-4.png')}
              style={{width: '100%', height: 300, alignSelf: 'center'}}
            />
            <View></View>

            <View style={styles.content}>
              <Text style={styles.title}>Pronto para começar?</Text>
              <Text style={styles.text}>Explora e desfruta a Hubersity!</Text>
            </View>
            <PrimaryBtn
              onPress={() => navigation.navigate('Login')}
              text="Login"
              paddingHorizontal={59}
              paddingVertical={10}
              borderRadius={10}
            />
            <PrimaryBtn
              onPress={() => navigation.navigate('Registo')}
              text="Criar conta"
              paddingHorizontal={59}
              paddingVertical={10}
              borderRadius={10}
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
  },
  container: {
    flex: 1,
    backgroundColor: '#151C4D',
  },
  btn: {
    alignItems: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  content: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    color: '#F8F9FA',
    fontSize: 20,
    fontFamily: 'BaiJamjuree',
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    color: '#F8F9FA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  txt: {
    textDecorationLine: 'underline',
  },
  primaryBtn: {
    alignItems: 'center',
    marginTop: 157,
  },
});

export default Onboarding;
