import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Bar from './src/components/Bar';
import Cantina from './src/components/Cantina';
import Home from './src/components/Home';
import Perfil from './src/components/Perfil';
import Roleta from './src/components/Roleta';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#7F8BF3', height: 80},
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#000',
        }}>
        <Tab.Screen
          name="Cantina"
          component={Cantina}
          options={{
            tabBarLabel: ({color, focused}) => (
              <Text style={[styles.text, {color}]}>Cantina</Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('./assets/icons/cantina_active.png')
                    : require('./assets/icons/cantina.png')
                }
                style={{width: 48, height: 48}}
              />
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
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('./assets/icons/bar_active.png')
                    : require('./assets/icons/bar.png')
                }
                style={{width: 48, height: 48}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: ({color, focused}) => (
              <Text style={[styles.text, {color}]}>Home</Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('./assets/icons/home_active.png')
                    : require('./assets/icons/home.png')
                }
                style={{width: 48, height: 48}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Roleta"
          component={Roleta}
          options={{
            tabBarLabel: ({color, focused}) => (
              <Text style={[styles.text, {color}]}>Roleta</Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('./assets/icons/roleta_active.png')
                    : require('./assets/icons/roleta.png')
                }
                style={{width: 48, height: 48}}
              />
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
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('./assets/icons/perfil_active.png')
                    : require('./assets/icons/perfil.pn')
                }
                style={{width: 48, height: 48}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'BaiJamjuree-SemiBold',
    fontSize: 18,
  },
});
