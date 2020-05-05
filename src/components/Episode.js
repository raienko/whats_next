import React from 'react';
import {View, StyleSheet} from 'react-native';
import {rem} from 'src/utils/metrics';

export default function Episode({children}) {
  return (
    <View style={styles.wrapper}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
