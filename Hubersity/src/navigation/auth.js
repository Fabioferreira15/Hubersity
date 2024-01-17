import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegistoScreen';
import Onboarding from '../screens/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const splashSeen = async () => {
    try {
      const splashSeen = await AsyncStorage.getItem('SplashSeen');
      console.log('Splash Seen:', splashSeen);
      return splashSeen;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'SplasScreen'}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registo" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
