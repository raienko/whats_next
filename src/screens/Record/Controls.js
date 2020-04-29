import React from 'react';
import {View, StyleSheet} from 'react-native';
import {rem} from 'src/utils/metrics';
import Button from 'src/components/Button';

export default function Controls() {
  return (
    <View style={styles.wrapper}>
      <Button text="button_start" />
      <Button text="button_split" />
      <Button text="button_stop" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: rem(50),
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
