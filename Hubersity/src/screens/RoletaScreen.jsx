/* import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import WheelComponent from 'react-wheel-of-prizes'; // Use default import

const Roleta = () => {
  const wheelRef = useRef(null);

  const segments = [
    '30 pontos',
    'Sem prémio',
    'Compal',
    'Sem prémio',
    'Merenda de Chocolate',
    'Sem prémio',
  ];

  const segColors = ['black', '#60BA97', 'black', '#60BA97', 'black', '#60BA97'];

  const onFinished = (winner) => {
    console.log(winner);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Spinner wheel Demo for TDC</Text>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment="MM"
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Start"
        isOnlyOnce={false}
        size={190}
        upDuration={500}
        downDuration={600}
        fontFamily="Helvetica"
      />
      <Button
        title="Start"
        onPress={() => {
          wheelRef.current._onPress();
        }}
      />
      <Text>Spin the wheel and win exciting offers</Text>
    </View>
  );
};

export default Roleta; */
