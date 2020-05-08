import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'src/components/Button';

export default function RecordingControls({onSplit, onStop, state}) {
  const hasBreakpoints = state.nodes.length > 1;
  return (
    <View style={styles.wrapper}>
      <Button text="button_split" onPress={onSplit} />
      {
        hasBreakpoints
        && <Button text="button_finish_episode" onPress={onStop} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
});
