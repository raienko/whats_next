import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'src/components/Text';
import {PreferencesContext} from 'src/Preferences';
import {languages} from 'src/utils/translate';
import {rem} from 'src/utils/metrics';
import {useSafeArea} from 'react-native-safe-area-context';
import Touchable from 'src/components/Touchable';

const flags = {
  en: '🇺🇸',
  ru: '🇷🇺',
};

export default function Languages() {
  const {language, changeLanguage} = useContext(PreferencesContext);
  const insets = useSafeArea();
  const renderButton = (lang) => {
    const active = language === lang;
    return (
      <Touchable key={lang} disabled={active} onPress={() => changeLanguage(lang)}>
        <Text style={[styles.flag, active && styles.active]}>{flags[lang]}</Text>
      </Touchable>
    );
  };
  return (
    <View style={[styles.wrapper, {top: insets.top}]}>
      {languages.map(renderButton)}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
  },
  flag: {
    fontSize: rem(40),
  },
  active: {
    fontSize: rem(45),
  },
});
