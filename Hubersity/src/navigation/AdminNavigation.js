import {React, useState, useEffect} from 'react';
import {Text, View, StatusBar, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PerfilSvg from '../assets/icons/perfil.svg';
import BarSvg from '../assets/icons/bar.svg';
import HomeSvg from '../assets/icons/home.svg';
import RoletaSvg from '../assets/icons/roleta.svg';
import CantinaSvg from '../assets/icons/cantina.svg';
import PerfilActiveSvg from '../assets/icons/perfil_active.svg';
import BarActiveSvg from '../assets/icons/bar_active.svg';
import HomeActiveSvg from '../assets/icons/home_active.svg';
import RoletaActiveSvg from '../assets/icons/roleta_active.svg';
import CantinaActiveSvg from '../assets/icons/cantina_active.svg';

import Bar from '../screens/Admin/Bar';
import Users from '../screens/Admin/Users';
import Perfil from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

const Main = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Users"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#7F8BF3',height: 60,position:'absolute'},
        tabBarActiveTintColor: '#212529',
        tabBarInactiveTintColor: '#212529',
      }}>
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={[styles.text, {color}]}>utilizadores</Text>
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <CantinaActiveSvg width={30} height={30} />
            ) : (
              <CantinaSvg width={30} height={30} />
            ),
        }}
      />
      <Tab.Screen
        name="Bar"
        component={Bar}
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={[styles.text, {color}]}>Bar</Text>
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <BarActiveSvg width={30} height={30} />
            ) : (
              <BarSvg width={30} height={30} />
            ),
        }}
      />
        <Tab.Screen
            name="Perfil"
            component={Perfil}
            options={{
            tabBarLabel: ({color, focused}) => (
                <Text style={[styles.text, {color}]}>Perfil</Text>
            ),
            tabBarIcon: ({focused}) =>
                focused ? (
                <PerfilActiveSvg width={30} height={30} />
                ) : (
                <PerfilSvg width={30} height={30} />
                ),
            }}
        />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'BaiJamjuree-SemiBold',
    fontSize: 14,
  },
});
