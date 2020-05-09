import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
