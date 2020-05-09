import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Text from 'src/components/Text';
import {rem} from 'src/utils/metrics';
import * as theme from 'src/theme';

export default function Title({text, value, style}) {
  const insets = useSafeArea();
  return (
    <View style={[styles.wrapper, {top: insets.top}].concat(style)}>
      <Text text={text} value={value} style={styles.title} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.offset,
  },
  title: {
    fontSize: rem(30),
    textAlign: 'center',
    marginHorizontal: theme.offset,
    textDecorationLine: 'underline',
  },
});
