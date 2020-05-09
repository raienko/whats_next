import React from 'react';
import {StyleSheet} from 'react-native';
import Touchable from 'src/components/Touchable';
import VectorIcon from 'src/components/VectorIcon';
import {rem} from 'src/utils/metrics';

export default function IconButton({style, icon, color, collection, ...rest}) {
  return (
    <Touchable style={[styles.wrapper].concat(style)} {...rest}>
      <VectorIcon
        name={icon}
        collection={collection}
        size={rem(30)}
        color={color}
      />
    </Touchable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: rem(50),
    height: rem(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
