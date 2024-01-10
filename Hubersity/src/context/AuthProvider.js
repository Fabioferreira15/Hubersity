import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from './env';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://${IP}:3000/utilizadores/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo(data.UserInfo);
        setUserToken(data.token);
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('id', data.UserInfo.UserId.toString());
        AsyncStorage.setItem('nome', data.UserInfo.nome);
        AsyncStorage.setItem('image', data.UserInfo.imgPerfil);
      } else {
        if (data.errors) {
          data.errors.forEach(error => {
            if (error.path === 'email') {
              setEmailError(error.msg);
            } else if (error.path === 'password') {
              setPasswordError(error.msg);
            }
          });
        }
        console.log('Falha ao fazer login:', data);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    try {
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('id');
      AsyncStorage.removeItem('nome');
      AsyncStorage.removeItem('image');
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const isAuthenticated = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('token');
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  const getUserInfo = () => userInfo;
  const getPerfilInfo = async () => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('id');

      const response = await fetch(`http://${IP}:3000/utilizadores/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.log('Falha ao obter informações do perfil:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter informações do perfil:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        emailError,
        passwordError,
        isLoading,
        userToken,
        getUserInfo,
        getPerfilInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
