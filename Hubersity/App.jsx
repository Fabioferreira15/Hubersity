import React, {useState, useEffect, useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/auth.js';
import AppNavigation from './src/navigation/AppNavigation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider, AuthContext} from './src/context/AuthProvider.js';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen.jsx';
import AdminNavigation from './src/navigation/AdminNavigation.js';

const AppNav = () => {
  const {isLoading, userToken, isAdmin} = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color="#5F6EF0" size="large" />
      </View>
    );
  }
  return userToken ? (
    isAdmin ? (
      <AdminNavigation />
    ) : (
      <AppNavigation />
    )
  ) : (
    <AuthStack />
  );
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <AppNav />
        </AuthProvider>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
