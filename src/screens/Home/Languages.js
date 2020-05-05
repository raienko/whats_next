import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'src/components/Text';
import {PreferencesContext} from 'src/Preferences';
import {languages} from 'src/utils/translate';
import * as theme from 'src/theme';
import Touchable from 'src/components/Touchable';

const flags = {
  en: '🇺🇸',
  ru: '🇷🇺',
};

export default function Languages() {
  const {language, changeLanguage} = useContext(PreferencesContext);
  const renderButton = (lang) => {
    const active = language === lang;
    return (
      <Touchable
        key={lang}
        disabled={active}
        onPress={() => changeLanguage(lang)}
        style={[styles.btn, active && styles.active]}>
        <Text style={styles.flag}>{flags[lang]}</Text>
      </Touchable>
    );
  };
  return (
    <View style={styles.wrapper}>
      {
        languages.map(renderButton)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  flag: {
    fontSize: 50,
  },
  btn: {
    padding: theme.offset,
    borderRadius: theme.borderRadius,
  },
  active: {
    backgroundColor: theme.colors.primary,
  },
});
