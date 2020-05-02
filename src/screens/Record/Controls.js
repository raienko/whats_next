import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {rem} from 'src/utils/metrics';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import {recordStatus} from './constants';

export default function Controls({
  status,
  onStart,
  onStop,
  onSplit,
  onBack,
  onPreview,
  onEditLabel,
  onBranchSelected,
  nodes,
  current,
  edges,
}) {
  const [choices, setChoices] = useState({});

  useEffect(() => {
    if (status === recordStatus.splitting) {
      const [edgeA, edgeB] = edges.filter((edge) => edge.from === current);
      const nodeA = nodes.find((node) => node.id === edgeA.to);
      const nodeB = nodes.find((node) => node.id === edgeB.to);
      setChoices({nodeA, nodeB});
    }
  }, [status, current, edges, nodes]);

  return (
    <View style={styles.wrapper}>
      <Button text="button_back" onPress={onBack} style={styles.back} />
      {status === recordStatus.idle && <Button text="button_start" onPress={onStart} />}
      {status === recordStatus.recording && <Button text="button_split" onPress={onSplit} />}
      {status === recordStatus.recording && <Button text="button_stop" onPress={onStop} />}
      {status === recordStatus.finished && <Button text="button_preview" onPress={onPreview} />}
      {
        status === recordStatus.splitting
        && choices.nodeA
        && <>
          <Input value={choices.nodeA.label} onChangeText={(text) => onEditLabel(choices.nodeA.id, text)} />
          <Button text="button_start" onPress={() => onBranchSelected(choices.nodeA.id)} />
        </>
      }
      {
        status === recordStatus.splitting
        && choices.nodeB
        && <>
          <Input value={choices.nodeB.label} onChangeText={(text) => onEditLabel(choices.nodeB.id, text)} />
          <Button text="button_start" onPress={() => onBranchSelected(choices.nodeB.id)} />
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: rem(50),
  },
  back: {
    position: 'absolute',
    left: rem(20),
    top: rem(50),
  },
});
