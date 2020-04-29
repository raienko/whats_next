import React from 'react';
import {View, StyleSheet} from 'react-native';
import {rem} from 'src/utils/metrics';
import Button from 'src/components/Button';
import Languages from './Languages';

export default function Browse({changeScreen}) {
  return (
    <View style={styles.wrapper}>
      <Languages />
      <View style={styles.gallery} />
      <Button text="button_create" onPress={() => changeScreen('Record')} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery: {
    width: rem(300),
    height: rem(300),
  },
});
