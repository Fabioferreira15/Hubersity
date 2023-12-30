import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PrimaryBtn from '../components/PrimaryBtn';
import {AuthContext} from '../context/AuthProvider';

const Perfil = () => {
  const {logout, getPerfilInfo, userInfo} = useContext(AuthContext);
  const [perfilInfo, setPerfilInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerfilInfo = async () => {
      try {
        const perfilData = await getPerfilInfo();

        if (perfilData) {
          setPerfilInfo(perfilData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfilInfo();
  }, [getPerfilInfo]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!perfilInfo) {
    return (
      <View style={styles.errorContainer}>
        <Text>Falha ao carregar informações do perfil.</Text>
        <PrimaryBtn
          text="Logout"
          onPress={() => {
            logout();
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={{flex: 1, flexGrow: 1}}>
      <Image source={{uri: perfilInfo.imgCapa}} style={styles.capaImage} />
      <View style={styles.overlayContainer}>
        <Image
          source={{uri: perfilInfo.imgPerfil}}
          style={styles.perfilImage}
        />
        <Text style={[styles.text, styles.title2]}>{perfilInfo.nome}</Text>
        <Text style={styles.text}>{perfilInfo.email}</Text>
        <View style={styles.pontosContainer}>
          <Text>{perfilInfo.pontos} pontos</Text>
        </View>
        <View style={styles.botaoLogout}>
          <PrimaryBtn
            text="Logout"
            onPress={() => {
              logout();
            }}
          />
        </View>
        <Text style={[styles.title, {textDecorationLine: 'underline'}]}>
          Parque de Estacionamento
        </Text>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/420px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png',
          }}
          style={styles.qrCode}
        />
        <Text style={{marginTop: '-10%'}}>Válido até 31/01/2024</Text>
        <Text style={styles.title}>Formas de pagamento</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: '15%',
  },

  capaImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  overlayContainer: {
    alignItems: 'center',
    marginTop: '-15%',
  },
  perfilImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    marginVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  title3: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '25%',
    marginBottom: 5,
  },
  pontosContainer: {
    backgroundColor: '#BFC5F9',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  botaoLogout: {
    position: 'absolute',
    top: '-50%',
    right: 0,
    marginRight: '5%',
  },
  qrCode: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    marginTop: '-10%',
  },
});

export default Perfil;
