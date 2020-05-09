import React from 'react';
import {Text, StyleSheet} from 'react-native';
import localization from 'src/utils/localization';
import * as theme from 'src/theme';

export default function Span({text, options, value, style, children, ...rest}) {
  return (
    <Text {...rest} style={[styles.text].concat(style)}>
      {!!text && localization.translate(text, options)}
      {value}
      {children}
    </Text>
  );
}

export const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: theme.colors.inverted,
  },
});
