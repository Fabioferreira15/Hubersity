import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  RefreshControl,
  TextInput,
} from 'react-native';

import PrimaryBtn from '../components/PrimaryBtn';
import {AuthContext} from '../context/AuthProvider';
import MastercardLogo from '../assets/icons/Mastercard-Logo.svg';
import MBWayLogo from '../assets/icons/MBWay-Logo.svg';
import SetaDireita from '../assets/icons/seta-direita.svg';
import BtnSvg from '../assets/Home/btn.svg';
import BtnLogout from '../assets/icons/logout.svg';
import {
  fetchEstacionamento,
  fetcPaymentDetails,
  deletePaymentDetails,
  AddPaymentDetails,
  PagarEstacionamento,
} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrashSvg from '../assets/icons/trash.svg';
import Voltar from '../assets/icons/Voltar.svg';
import Toast from 'react-native-toast-message';
import UnderlineBtn from '../components/UnderlineBtn';

const PerfilScreen = ({navigation}) => {
  const {logout, getPerfilInfo, userInfo} = useContext(AuthContext);
  const [perfilInfo, setPerfilInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [estacionamentoInfo, setEstacionamentoInfo] = useState([]);
  const [modalEstacionamento, setModalEstacionamento] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartao, setCartao] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [numeroCartao, setNumeroCartao] = useState('');
  const [CVV, setCVV] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [nomeTitular, setNomeTitular] = useState('');

  const fetchAllData = async () => {
    try {
      const perfilData = await getPerfilInfo();

      if (perfilData) {
        setPerfilInfo(perfilData);
      }

      const id = await AsyncStorage.getItem('id');
      const idInt = parseInt(id, 10);

      const estacionamentoData = await fetchEstacionamento(idInt);

      if (estacionamentoData) {
        setEstacionamentoInfo(estacionamentoData.estacionamento || []);
      }

      const paymentDetails = await fetcPaymentDetails(idInt);

      if (paymentDetails) {
        setCartao(paymentDetails.data || []);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  const handlePagarEstacionamento = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const userIdInt = parseInt(id, 10);

      const response = await PagarEstacionamento(userIdInt);

      if (response.success) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Sucesso',
          text2: response.message,
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {},
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'Top',
          text1: 'Erro',
          text2: response.message,
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPaymentDetails = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const userIdInt = parseInt(id, 10);

      const detalhesPagamento = {
        NumeroCartao: numeroCartao,
        CVV: CVV,
        DataValidade: dataValidade,
        NomeTitular: nomeTitular,
      };

      detalhesPagamento.CVV = Number(detalhesPagamento.CVV);
      console.log('userIdInt:', userIdInt);
      console.log('detalhesPagamento:', detalhesPagamento);

      const response = await AddPaymentDetails(userIdInt, detalhesPagamento);
      console.log('response:', response);

      if (response.success) {
        setModalVisible(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Sucesso',
          text2: response.message,
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {},
        });
      } else {
        setModalVisible(false);
        Toast.show({
          type: 'error',
          position: 'Top',
          text1: 'Erro',
          text2: response.message,
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {},
        });
      }
      setCVV('');
      setNumeroCartao('');
      setDataValidade('');
      setNomeTitular('');
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAllData().then(() => setRefreshing(false));
  }, []);

  const handleDeletePaymentDetails = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const userIdInt = parseInt(id, 10);

      const response = await deletePaymentDetails(userIdInt);

      if (response) {
        setModalVisible(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Sucesso',
          text2: 'Detalhes de pagamento apagados com sucesso',
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {},
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'Top',
          text1: 'Erro',
          text2: 'Ocorreu um erro ao apagar os detalhes de pagamento',
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function addSpacesToCardNumber(number) {
    const numberLength = number.length;
    let newNumber = '';
    for (let i = 0; i < numberLength; i++) {
      if (i % 4 === 0 && i !== 0) {
        newNumber += ' ';
      }
      newNumber += number[i];
    }
    return newNumber;
  }

  function formatCardNumber(number) {
    const numberLength = number.length;
    let lastFourDigits = number.substr(numberLength - 4, numberLength);
    let firstDigits = number.substr(0, numberLength - 4);

    firstDigits = firstDigits.replace(/\d/g, '*');

    return firstDigits + lastFourDigits;
  }

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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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

        <View>
          {estacionamentoInfo.length === 0 ? (
            <>
              <Text style={styles.titlePay}>Não efetuou o pagamento</Text>
              <View style={styles.btnPay}>
                <PrimaryBtn
                  text="Pagamento"
                  borderRadius={5}
                  paddingHorizontal={'35%'}
                  onPress={handlePagarEstacionamento}
                />
              </View>
            </>
          ) : (
            <>
              <View>
                <Text
                  style={[
                    styles.title,
                    {
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      width: '90%',
                    },
                  ]}>
                  Parque de Estacionamento
                </Text>
              </View>

              <View style={styles.qrContainer}>
                <Image
                  source={{
                    uri: estacionamentoInfo.QRCode,
                  }}
                  style={styles.qrCode}
                />
              </View>

              <Text style={styles.validadeQR}>
                Válido até: {estacionamentoInfo.ProximoPagamento}
              </Text>
            </>
          )}
        </View>

        {cartao.length === 0 ? (
          <>
            <Modal visible={modalVisible} animationType="slide">
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#151C4D',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-start', marginLeft: '5%'}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Voltar />
                </TouchableOpacity>
                <View style={styles.containerCard}>
                  <View style={styles.creditCard}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.creditCardName}>{nomeTitular}</Text>
                    </View>
                    <View style={styles.cardNumberContainer}>
                      <Text style={styles.creditCardNumber}>
                        {addSpacesToCardNumber(numeroCartao)}
                      </Text>
                    </View>

                    <View style={styles.creditCardFooter}>
                      <View style={styles.data}>
                        <Text style={styles.creditCardFooterText}>
                          Validade
                        </Text>
                        <Text style={styles.txtData}>{dataValidade}</Text>
                      </View>
                      <View style={styles.CVV}>
                        <Text style={styles.creditCardFooterText}>CVV</Text>
                        <Text style={styles.txtCVV}>{CVV}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.form}>
                  <Text style={styles.txtForm}>Adicionar Cartão</Text>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Número do Cartão"
                      placeholderTextColor="#6c757d"
                      onChangeText={setNumeroCartao}
                      value={numeroCartao}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="CVV"
                      placeholderTextColor="#6c757d"
                      onChangeText={setCVV}
                      value={CVV}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Data de Validade"
                      placeholderTextColor="#6c757d"
                      onChangeText={setDataValidade}
                      value={dataValidade}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Nome do Titular"
                      placeholderTextColor="#6c757d"
                      onChangeText={setNomeTitular}
                      value={nomeTitular}
                    />
                  </View>
                </View>
                <View style={styles.btnFechar}>
                  <PrimaryBtn
                    text="Adicionar"
                    borderRadius={10}
                    paddingHorizontal={'35%'}
                    paddingVertical={5}
                    onPress={handleAddPaymentDetails}
                  />
                </View>
              </View>
            </Modal>
            <Text style={styles.title}>Formas de pagamento</Text>
            <UnderlineBtn
              style={{color: '#F0D060', fontSize: 20, marginBottom: '10%'}}
              text="Adicionar Cartão"
              borderRadius={5}
              paddingHorizontal={'35%'}
              onPress={() => setModalVisible(true)}
            />
          </>
        ) : (
          <>
            <Modal visible={modalVisible} animationType="slide">
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#151C4D',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                    marginTop: '5%',
                  }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Voltar />
                </TouchableOpacity>
                <View style={styles.creditCardContainer}>
                  <View style={styles.creditCard}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.creditCardName}>
                        {cartao.NomeTitular}
                      </Text>
                      <TouchableOpacity onPress={handleDeletePaymentDetails}>
                        <TrashSvg />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cardNumberContainer}>
                      <Text style={styles.creditCardNumber}>
                        {addSpacesToCardNumber(cartao.NumeroCartao)}
                      </Text>
                    </View>

                    <View style={styles.creditCardFooter}>
                      <View style={styles.data}>
                        <Text style={styles.creditCardFooterText}>
                          Validade
                        </Text>
                        <Text style={styles.txtData}>
                          {cartao.DataValidade}
                        </Text>
                      </View>
                      <View style={styles.CVV}>
                        <Text style={styles.creditCardFooterText}>CVV</Text>
                        <Text style={styles.txtCVV}>{cartao.CVV}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.btnFechar}>
                  <PrimaryBtn
                    text="Fechar"
                    borderRadius={10}
                    paddingHorizontal={'40%'}
                    paddingVertical={5}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </Modal>
            <Text style={styles.title}>Formas de pagamento</Text>
            <TouchableOpacity
              style={[styles.metodoPag, {borderTopWidth: 1}]}
              onPress={() => setModalVisible(true)}
              key={cartao.id}>
              <View style={styles.metodoPag2}>
                <MastercardLogo width={30} height={30} />
                <Text>{'  '}</Text>
                <Text
                  style={{fontWeight: 'bold', color: 'black', fontSize: 17}}>
                  {addSpacesToCardNumber(formatCardNumber(cartao.NumeroCartao))}
                </Text>
              </View>
              <SetaDireita width={20} height={20} />
            </TouchableOpacity>
          </>
        )}

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
    fontFamily: 'Tajawal-Regular',
    fontSize: 16,
    color: '#212529',
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
    marginBottom: '5%',
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  titlePay: {
    fontSize: 23,
    fontFamily: 'BaiJamjuree-Bold',
    color: 'black',
    marginBottom: '5%',
    alignSelf: 'flex-start',
  },
  title2: {
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Bold',
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

  qrContainer: {
    alignItems: 'center',
  },

  qrCode: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
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
  creditCardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '20%',
    flex: 1,
  },
  creditCard: {
    width: '95%',
    height: 200,
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#f8f9fa',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  creditCardNumber: {
    fontSize: 20,
    fontFamily: 'Tajawal-Bold',
    justifyContent: 'center',
    color: '#212529',
  },
  creditCardName: {
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Bold',
    color: '#212529',
  },
  creditCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  creditCardFooterText: {
    fontSize: 18,
    fontFamily: 'BaiJamjuree-SemiBold',
    color: '#212529',
  },
  btnFechar: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '5%',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    marginTop: '10%',
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: '5%',
  },
  input: {
    backgroundColor: '#DFE2FC',
    width: '90%',
    height: 39,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 5,
    color: '#212529',
  },
  containerCard: {
    width: '100%',
    alignItems: 'center',
    marginTop: '20%',
  },

  txtForm: {
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Bold',
    color: '#F0D060',
    marginBottom: '5%',
  },
  btnPay: {
    marginTop: '5%',
    marginBottom: '5%',
  },
});

export default PerfilScreen;
