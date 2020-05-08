import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Canvas({children}) {
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
