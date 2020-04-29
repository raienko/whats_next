import React from 'react';
import {TouchableOpacity} from 'react-native';

export default function Touchable({onPress, ...rest}) {
  const handlePress = () => {
    if (!onPress) {
      return;
    }
    requestAnimationFrame(onPress);
  };
  return (
    <TouchableOpacity activeOpacit={0.8} {...rest} onPress={handlePress} />
  );
}
