import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import * as theme from 'src/theme';

export default function Input({style, ...rest}) {
  return (
    <TextInput
      {...rest}
      style={[styles.input].concat(style)}
      placeholderTextColor={theme.colors.disabled}
    />
  );
}

export const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: theme.height,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    backgroundColor: theme.colors.basic,
    color: theme.colors.inverted,
    margin: theme.offset,
    paddingHorizontal: theme.offset,
  },
});
