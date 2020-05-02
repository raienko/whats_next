import React, {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import translate from 'src/utils/translate';
import * as theme from 'src/theme';
import {PreferencesContext} from 'src/Preferences';

export default function Span({text, value, style, children, ...rest}) {
  const {language} = useContext(PreferencesContext);
  return (
    <Text {...rest} style={[styles.text].concat(style)}>
      {!!text && translate(text, language)}
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
