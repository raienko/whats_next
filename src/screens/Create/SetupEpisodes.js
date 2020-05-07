import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'src/components/Button';
import {rem} from 'src/utils/metrics';
import * as theme from 'src/theme';
import EpisodeInfo from './EpisodeInfo';

export default function SetupEpisodes({onEdit, state, onStart}) {
  const [nodeA, setNodeA] = useState(null);
  const [nodeB, setNodeB] = useState(null);
  const [active, setActive] = useState();

  useEffect(() => {
    const edges = state.edges.filter((edge) => edge.from === state.currentNode);
    const firstNode = state.nodes.find((node) => node.id === edges[0].to);
    const secondNode = state.nodes.find((node) => node.id === edges[1].to);
    setActive(firstNode.id);
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
      <EpisodeInfo
        episode={nodeA}
        onEdit={updateNodeA}
        style={[styles.containerA, active === nodeA.id && styles.active]}
        onPress={() => setActive(nodeA.id)}
      />
      <EpisodeInfo
        episode={nodeB}
        onEdit={updateNodeB}
        style={[styles.containerB, active === nodeB.id && styles.active]}
        onPress={() => setActive(nodeB.id)}
      />
      <Button
        text="button_record"
        onPress={start(active)}
        disabled={!nodeA.name || !nodeB.name}
        style={[styles.button, active === nodeA.id ? styles.activeA : styles.activeB]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.offset,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: rem(210),
    width: rem(370),
  },
  active: {
    zIndex: 10,
  },
  containerA: {
    position: 'absolute',
    left: rem(0),
    top: rem(10),
    backgroundColor: '#ff003f',
  },
  activeA: {
    backgroundColor: '#ff003f',
  },
  containerB: {
    position: 'absolute',
    right: rem(0),
    top: rem(15),
    backgroundColor: '#00aaff',
  },
  activeB: {
    backgroundColor: '#00aaff',
  },
  title: {
    marginLeft: theme.offset,
    fontSize: rem(30),
    borderRadius: rem(3),
    alignSelf: 'flex-start',
  },
  icon: {
    width: rem(300),
    height: rem(300),
  },
  input: {
    width: rem(160),
  },
  button: {
    width: rem(100),
  },
});
