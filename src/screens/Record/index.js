import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'src/components/Button';
import Spinner from 'src/components/Spinner';
import Camera from './Camera';
import Controls from './Controls';

export default function Record({ changeScreen }) {
  const [ready, setReady] = useState(false);
  return (
    <View style={styles.wrapper}>
      <Camera onReady={() => setReady(true)} />
      <Button onPress={() => changeScreen('Browse')} text="button_back" style={styles.back} />
      <Controls />
      {!ready && <Spinner />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 10,
    top: 50,
  },
});
