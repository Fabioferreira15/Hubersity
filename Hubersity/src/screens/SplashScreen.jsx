import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const checkOnboardingSeen = async () => {
      try {
        const onboardingSeen = await AsyncStorage.getItem('OnboardingSeen');
        console.log('Onboarding Seen:', onboardingSeen);

        if (onboardingSeen === 'true') {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 5000);
        } else {
          setTimeout(() => {
            navigation.navigate('Onboarding');
          }, 5000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkOnboardingSeen();
  }, []);


  return (
    <View style={{flex: 1}}>
      <LottieView
        source={require('../assets/Splash.json')}
        autoPlay
        loop
        style={{flex: 1}}
      />
    </View>
  );
};

export default SplashScreen;
