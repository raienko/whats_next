import React, {useContext} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import * as theme from 'src/theme';
import {PreferencesContext} from 'src/Preferences';
import translate from 'src/utils/translate';

export default function Input({style, placeholder, ...rest}) {
  const {language} = useContext(PreferencesContext);
  return (
    <TextInput
      {...rest}
      placeholder={translate(placeholder, language)}
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
    textAlign: 'center',
  },
});
