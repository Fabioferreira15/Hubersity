import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import HeroSvg from '../assets/Onboarding/Hero-image.svg';
import PrimaryBtn from '../components/PrimaryBtn';
import UnderlineBtn from '../components/UnderlineBtn';
import Voltar from '../assets/icons/Voltar.svg';
import LottieView from 'lottie-react-native';

const Onboarding = ({navigation}) => {
  const {width, height} = Dimensions.get('window');

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

  const imgContainerHeight = height * 0.4;
  const contentHeight = height * 0.2;
  const primaryBtnHeight = height * 0.25;

  return (
    <>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        dotColor="#F9ECBF"
        dotStyle={{width: 8, height: 8, borderRadius: 10}}
        activeDotColor="#F0D060"
        activeDotStyle={{width: 12, height: 12, borderRadius: 10}}
        paginationStyle={{bottom: height * 0.12}}
        loop={false}
        ref={ref => {
          swiper = ref;
        }}>
        <View style={styles.slide}>
          <View style={styles.container}>
            <View style={styles.btn}>
              <TouchableOpacity onPress={handlePrev}>
                <Voltar />
              </TouchableOpacity>
              <UnderlineBtn onPress={handleSkip} text="Skip" />
            </View>
            <View style={[styles.imgContainer, {height: imgContainerHeight}]}>
              <View style={styles.img}>
                <Image
                  source={require('../assets/Onboarding/Hero-image-1.png')}
                  resizeMode="contain"
                  style={{width: '100%', height: 300}}
                />
              </View>
            </View>

            <View style={[styles.content, {height: contentHeight}]}>
              <Text style={styles.title}>Marca as refeições facilmente</Text>
              <Text style={styles.text}>
                Dá uma vista de olhos nas ementas diárias da cantina e escolhe a
                tua refeição preferida sem complicações.
              </Text>
            </View>
            <View style={[styles.primaryBtn, {height: primaryBtnHeight}]}>
              <PrimaryBtn
                onPress={handleNext}
                text="Próximo"
                paddingHorizontal={59}
                paddingVertical={5}
                borderRadius={10}
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.container}>
            <View style={styles.btn}>
              <TouchableOpacity onPress={handlePrev}>
                <Voltar />
              </TouchableOpacity>
              <UnderlineBtn onPress={handleSkip} text="Skip" />
            </View>
            <View style={[styles.imgContainer, {height: imgContainerHeight}]}>
              <View style={styles.img}>
                <Image
                  source={require('../assets/Onboarding/Hero-image.png')}
                  resizeMode="contain"
                  style={{width: '100%', height: 300}}
                />
              </View>
            </View>

            <View style={[styles.content, {height: contentHeight}]}>
              <Text style={styles.title}>Descobre o menu do bar</Text>
              <Text style={styles.text}>
                Adiciona ao carrinho e faz os teus pedidos de forma simples e
                rápida.
              </Text>
            </View>
            <View style={[styles.primaryBtn, {height: primaryBtnHeight}]}>
              <PrimaryBtn
                onPress={handleNext}
                text="Próximo"
                paddingHorizontal={59}
                paddingVertical={5}
                borderRadius={10}
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.container}>
            <View style={styles.btn}>
              <TouchableOpacity onPress={handlePrev}>
                <Voltar />
              </TouchableOpacity>
              <UnderlineBtn onPress={handleSkip} text="Skip" />
            </View>
            <View style={[styles.imgContainer, {height: imgContainerHeight}]}>
              <View style={styles.img}>
                <Image
                  source={require('../assets/Onboarding/hero-image-3.png')}
                  resizeMode="contain"
                  style={{width: '100%', height: 300}}
                />
              </View>
            </View>

            <View style={[styles.content, {height: contentHeight}]}>
              <Text style={styles.title}>Paga sem complicações</Text>
              <Text style={styles.text}>
                Desfruta dos pagamentos fáceis e intuitivos, paga utilizando o
                telemóvel.
              </Text>
            </View>
            <View style={[styles.primaryBtn, {height: primaryBtnHeight}]}>
              <PrimaryBtn
                onPress={handleNext}
                text="Próximo"
                paddingHorizontal={59}
                paddingVertical={5}
                borderRadius={10}
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.container}>
            <View style={styles.btn}>
              <TouchableOpacity onPress={handlePrev}>
                <Voltar />
              </TouchableOpacity>
            </View>
            <View style={[styles.imgContainer, {height: imgContainerHeight}]}>
              <View style={styles.img}>
                <Image
                  source={require('../assets/Onboarding/hero-image-4.png')}
                  resizeMode="contain"
                  style={{width: '100%', height: 300, alignSelf: 'center'}}
                />
              </View>
            </View>

            <View style={[styles.content, {height: contentHeight}]}>
              <Text style={styles.title}>Pronto para começar?</Text>
              <Text style={styles.text}>Explora e desfruta a Hubersity!</Text>
            </View>
            <View style={[styles.teste, {height: primaryBtnHeight}]}>
              <PrimaryBtn
                onPress={() => navigation.navigate('Registo')}
                text="Criar conta"
                paddingHorizontal={10}
                paddingVertical={5}
                borderRadius={10}
              />

              <UnderlineBtn
                onPress={() => navigation.navigate('Login')}
                text="Login"
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
  },
  container: {
    flex: 1,
    backgroundColor: '#151C4D',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '5%',
    marginTop: '5%',
    marginRight: '5%',
  },
  content: {
    alignItems: 'center',
    marginTop: '10%',
    height: '20%',
  },
  title: {
    color: '#F8F9FA',
    fontSize: 20,
    width: '95%',
    textAlign: 'center',
    fontFamily: 'BaiJamjuree-Bold',
  },
  text: {
    color: '#F8F9FA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    fontFamily: 'Tajawal-Regular',
    width: '95%',
  },
  primaryBtn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  img: {
    width: '90%',
  },
  imgContainer: {
    alignItems: 'center',
  },
  animationContainer: {
    flex: 1,
  },
  teste: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});

export default Onboarding;
