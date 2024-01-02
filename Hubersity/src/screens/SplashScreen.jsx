import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import LottieView from 'lottie-react-native'


const SplashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Onboarding')
        }, 5000)
    }, [])



  return (
    <View style={{flex: 1}}>
      <LottieView
        source={require('../assets/Splash.json')}
        autoPlay
        loop
        style={{flex: 1}}
      />
    </View>
  )
}

export default SplashScreen