import React from 'react';
import {StyleSheet} from 'react-native';
import {rem, offset} from 'src/utils/metrics';
import Touchable from 'src/components/Touchable';
import Text from 'src/components/Text';

export default function Button({text, style, ...rest}) {
  return (
    <Touchable {...rest} style={[styles.wrapper].concat(style)}>
      <Text text={text} />
    </Touchable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: rem(100),
    height: rem(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#64ff82',
    borderRadius: rem(5),
    margin: offset,
  },
});
