import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'src/components/Button';
import Spinner from 'src/components/Spinner';
import Camera from './Camera';
import Controls from './Controls';

export default function Record({ changeScreen }) {
  const [loading, setLoading] = useState(true);

  const handleCameraReady = () => setLoading(false);

  const back = () => changeScreen('Browse');

  return (
    <View style={styles.wrapper}>
      <Camera onReady={handleCameraReady} />
      <Button onPress={back} text="button_back" style={styles.back} />
      <Controls />
      <Spinner visible={loading} />
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
