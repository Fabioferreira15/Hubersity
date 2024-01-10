import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import PrimaryBtn from '../components/PrimaryBtn';
import {AuthContext} from '../context/AuthProvider';
import MastercardLogo from '../assets/icons/Mastercard-Logo.svg';
import MBWayLogo from '../assets/icons/MBWay-Logo.svg';
import SetaDireita from '../assets/icons/seta-direita.svg';
import BtnSvg from '../assets/Home/btn.svg';
import BtnLogout from '../assets/icons/logout.svg';

const Perfil = ({navigation}) => {
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
        <TouchableOpacity
          style={styles.botaoLogout}
          onPress={() => {
            logout();
          }}>
          <BtnLogout width={35} height={35} />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            {borderBottomColor: 'black', borderBottomWidth: 1, width: '90%'},
          ]}>
          Parque de Estacionamento
        </Text>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/420px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png',
          }}
          style={styles.qrCode}
        />
        <Text style={styles.validadeQR}>Válido até 31/01/2024</Text>
        <Text style={styles.title}>Formas de pagamento</Text>
        <TouchableOpacity style={styles.metodoPag}>
          <View style={styles.metodoPag2}>
            <MastercardLogo width={30} height={30} />
            <Text>{'  '}</Text>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 17}}>
              **** 4536
            </Text>
          </View>
          <SetaDireita width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.metodoPag, {borderTopWidth: 1}]}>
          <View style={styles.metodoPag2}>
            <MBWayLogo width={40} height={30} />
            <Text>{'  '}</Text>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 17}}>MB WAY</Text>
          </View>
          <SetaDireita width={20} height={20} />
        </TouchableOpacity>
        <Text />
        <PrimaryBtn
          text="Adicionar"
          borderRadius={10}
          paddingHorizontal={'35%'}
          paddingVertical={5}
          onPress={() => Alert.alert('Adicionar forma de pagamento')}
        />
        <Text />
        <Text />
        <TouchableOpacity
          onPress={() => navigation.navigate('Historico')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>Histórico</Text>
          <BtnSvg width={300} height={131} />
        </TouchableOpacity>
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
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'BaiJamjuree-Bold',
    color: 'black',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#212529',
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
    top: '-12%',
    right: '5%',
    backgroundColor: '#F8F9FA',
    borderRadius: 50,
    padding: 5,
  },

  qrCode: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    resizeMode: 'contain',
  },
  validadeQR: {
    fontSize: 16,
    fontFamily: 'BaiJamjuree-SemiBold',
    color: '#212529',
    alignSelf: 'flex-start',
    marginBottom: '15%',
    marginLeft: '5%',
  },
  metodoPag: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  metodoPag2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    height: 131,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: 30,
    color: '#F8F9FA',
    position: 'absolute',
    zIndex: 1,
    fontFamily: 'BaiJamjuree-Bold',
  },
});

export default Perfil;
