import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {rem} from 'src/utils/metrics';
import animation from './animation';

export default function Spinner() {
  const player = useRef();

  const register = (ref) => {
    if (ref) {
      player.current = ref;
      player.current.play();
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <LottieView source={animation} autoPlay loop ref={register} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  container: {
    width: rem(100),
    height: rem(100),
  },
});
