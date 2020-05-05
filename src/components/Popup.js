import React from 'react';
import {View, StyleSheet} from 'react-native';
import {rem} from 'src/utils/metrics';
import * as theme from 'src/theme';

export default function Popup({children}) {
  return (
    <View style={styles.wrapper}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: rem(300),
    height: rem(300),
    backgroundColor: theme.colors.primary,
    borderWidth: theme.borderWidth,
    borderRadius: theme.borderRadius,
    padding: theme.offset,
  },
});
