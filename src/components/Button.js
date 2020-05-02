import React from 'react';
import {StyleSheet} from 'react-native';
import Touchable from 'src/components/Touchable';
import Text from 'src/components/Text';
import * as theme from 'src/theme';

export default function Button({text, value, disabled, style, ...rest}) {
  return (
    <Touchable {...rest} disabled={disabled} style={[styles.wrapper, disabled && styles.disabled].concat(style)}>
      <Text text={text} value={value} style={styles.text} />
    </Touchable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: theme.height,
    borderRadius: theme.borderRadius,
    padding: theme.offset,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    margin: theme.offset,
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
  },
  text: {
    color: theme.colors.basic,
  },
});
