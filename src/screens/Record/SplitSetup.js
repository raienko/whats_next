import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'src/components/Button';
import {rem} from 'src/utils/metrics';
import Input from 'src/components/Input';
import {options} from './constants';

export default function SplitSetup({
  onEditLabel,
  nodes,
  current,
  edges,
  onStart,
}) {
  const [choices, setChoices] = useState(null);

  useEffect(() => {
    const [edgeA, edgeB] = edges.filter((edge) => edge.from === current);
    const nodeA = nodes.find((node) => node.id === edgeA.to);
    const nodeB = nodes.find((node) => node.id === edgeB.to);
    setChoices({nodeA, nodeB});
  }, [current, edges, nodes]);

  if (!choices) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Input
          value={choices.nodeA.label}
          style={styles.input}
          onChangeText={(text) => onEditLabel(choices.nodeA.id, text)}
        />
        <Button
          text="button_record"
          value={` ${options[choices.nodeA.id]}`}
          onPress={() => onStart(choices.nodeA.id)}
          disabled={!choices.nodeA.label}
          style={styles.button}
        />
      </View>
      <View style={styles.container}>
        <Input
          value={choices.nodeB.label}
          style={styles.input}
          onChangeText={(text) => onEditLabel(choices.nodeB.id, text)}
        />
        <Button
          text="button_record"
          value={` ${options[choices.nodeB.id]}`}
          onPress={() => onStart(choices.nodeB.id)}
          disabled={!choices.nodeB.label}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: rem(200),
  },
  button: {
    width: rem(100),
  },
});
