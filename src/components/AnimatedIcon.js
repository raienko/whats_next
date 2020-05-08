import React from 'react';
import LottieView from 'lottie-react-native';

export default function AnimatedIcon({size, onRef, ...rest}) {
  const handleRef = (ref) => {
    if (!ref) {
      return;
    }

    if (rest.autoPlay) {
      ref.play();
    }

    if (onRef) {
      return onRef(ref);
    }
  };
  return (
    <LottieView
      {...rest}
      ref={handleRef}
      style={[size && {width: size, height: size}].concat(rest.style)}
    />
  );
}
