import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'src/utils/metrics';
import IconButton from './IconButton';

export default function BackButton(params) {
  return <IconButton style={styles.position} {...params} icon="chevron-left" color="#fff" />;
}

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    left: rem(10),
    top: rem(50),
  },
});
