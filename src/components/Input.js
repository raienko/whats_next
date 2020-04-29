import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function Input({text, style, children, ...rest}) {
  return <TextInput {...rest} style={[styles.text].concat(style)} />;
}

export const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
