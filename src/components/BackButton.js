import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'src/utils/metrics';
import {useSafeArea} from 'react-native-safe-area-context';
import IconButton from './IconButton';

export default function BackButton(params) {
  const insets = useSafeArea();
  return <IconButton style={[styles.position, {top: insets.top}]} {...params} icon="chevron-left" color="#fff" />;
}

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    left: rem(10),
  },
});
