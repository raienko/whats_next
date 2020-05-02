import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {rem, offset} from 'src/utils/metrics';

export default function Input({style, ...rest}) {
  return <TextInput {...rest} style={[styles.input].concat(style)} />;
}

export const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: rem(30),
    width: rem(320),
    borderWidth: 1,
    backgroundColor: '#fff',
    margin: offset,
  },
});
