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
      placeholderTextColor="#eee"
    />
  );
}

export const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: theme.height,
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#fff',
    margin: theme.offset,
    paddingHorizontal: theme.offset,
    borderRadius: theme.borderRadius,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
