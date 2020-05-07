import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'src/components/Button';
import {rem} from 'src/utils/metrics';
import Input from 'src/components/Input';
import * as theme from 'src/theme';

export default function SetupEpisodes({onEdit, state, onStart}) {
  const [nodeA, setNodeA] = useState(null);
  const [nodeB, setNodeB] = useState(null);

  useEffect(() => {
    const edges = state.edges.filter((edge) => edge.from === state.currentNode);
    const firstNode = state.nodes.find((node) => node.id === edges[0].to);
    const secondNode = state.nodes.find((node) => node.id === edges[1].to);
    setNodeA(firstNode);
    setNodeB(secondNode);
  }, [state]);

  const updateNodeA = (changes) => {
    setNodeA((currentState) => ({...currentState, ...changes}));
  };

  const updateNodeB = (changes) => {
    setNodeB((currentState) => ({...currentState, ...changes}));
  };

  const start = (id) => async () => {
    await onEdit(nodeA.id, nodeA);
    await onEdit(nodeB.id, nodeB);
    await onStart(id);
  };

  if (!nodeA || !nodeB) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Input
        value={nodeA.name}
        style={styles.input}
        placeholder="label_placeholder"
        onChangeText={(name) => updateNodeA({name})}
      />
      <Button
        text="button_record"
        onPress={start(nodeA.id)}
        disabled={!nodeA.name}
        style={styles.button}
      />
      <Input
        value={nodeB.name}
        style={styles.input}
        placeholder="label_placeholder"
        onChangeText={(name) => updateNodeB({name})}
      />
      <Button
        text="button_record"
        onPress={start(nodeB.id)}
        disabled={!nodeB.name}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: rem(30),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  input: {
    width: rem(200),
  },
  button: {
    width: rem(100),
  },
});
