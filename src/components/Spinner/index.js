import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import {rem} from 'src/utils/metrics';
import animation from './animation';

const duration = 500;
const createAnimation = (value, toValue) => Animated.timing(value, {toValue, duration, useNativeDriver: true});

export default function Spinner({ visible }) {
  const opacity = useRef(new Animated.Value(visible ? 1 : 0));
  const [available, setAvailable] = useState(!!visible);
  const appearance = useRef();
  const player = useRef();

  useEffect(() => {
    if (visible) {
      show();
    } else {
      hide();
    }
  }, [visible]);

  const show = () => {
    if (available) {
      return;
    }
    setAvailable(true);
    if (appearance.current) {
      appearance.current.stop();
    }
    appearance.current = createAnimation(opacity.current, 1);
    appearance.current.start();
  };

  const hide = () => {
    if (!available) {
      return;
    }
    if (appearance.current) {
      appearance.current.stop();
    }
    appearance.current = createAnimation(opacity.current, 0);
    appearance.current.start(() => setAvailable(false));
  };

  const registerPlayer = (ref) => {
    if (ref) {
      player.current = ref;
      player.current.play();
    }
  };

  if (!available) {
    return null;
  }

  return (
    <Animated.View style={[styles.wrapper, {opacity: opacity.current}]}>
      <View style={styles.container}>
        <LottieView source={animation} autoPlay loop ref={registerPlayer} />
      </View>
    </Animated.View>
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
    width: rem(200),
    height: rem(200),
  },
});
