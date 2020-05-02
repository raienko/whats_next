import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'src/components/Spinner';
import Button from 'src/components/Button';
import {rem} from 'src/utils/metrics';
import Camera from './Camera';
import SplitSetup from './SplitSetup';
import {recordStatus} from './constants';

class Node {
  constructor(id, video, label) {
    this.id = id;
    this.video = video;
    this.label = label;
  }
}

class Edge {
  constructor(from, to) {
    this.id = `${from}_${to}`;
    this.from = from;
    this.to = to;
  }
}

export default function Record({changeScreen}) {
  const camera = useRef();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(recordStatus.idle);
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleCameraReady = () => setLoading(false);

  const leaveScreen = () => {
    changeScreen('Browse');
  };

  const registerCamera = (ref) => {
    camera.current = ref;
  };

  const addNodes = addToArray(setNodes);
  const updateNode = updateInArray(setNodes);
  const addEdges = addToArray(setEdges);

  const count = (increment = 1) => setIndex((currentIndex) => currentIndex + increment);

  const start = async () => {
    const node = new Node(current);
    addNodes(node);
    await startRecording(node.id);
  };

  const stop = async () => {
    await stopRecording();
    setStatus(recordStatus.finished);
  };

  const startRecording = async (nodeId) => {
    setStatus(recordStatus.recording);
    setCurrent(nodeId);
    const video = await camera.current.record();
    updateNode(nodeId, {video});
  };

  const stopRecording = async () => {
    camera.current.stop();
  };

  const editLabel = (nodeId, label) => {
    updateNode(nodeId, {label});
  };

  const setBreakpoint = async () => {
    const nodeA = new Node(index + 1);
    const edgeA = new Edge(current, nodeA.id);
    const nodeB = new Node(index + 2);
    const edgeB = new Edge(current, nodeB.id);
    addNodes(nodeA, nodeB);
    addEdges(edgeA, edgeB);
    count(2);
    stopRecording();
    setStatus(recordStatus.splitting);
  };

  const preview = () => {
    console.log({edges, nodes, current, status, index});
  };

  return (
    <View style={styles.wrapper}>
      <Camera onReady={handleCameraReady} onRef={registerCamera} />
      <View style={styles.controls}>
        <Button text="button_back" onPress={leaveScreen} style={styles.back} />
        {status === recordStatus.idle && <Button text="button_start" onPress={start} />}
        {status === recordStatus.recording && <Button text="button_split" onPress={setBreakpoint} />}
        {status === recordStatus.recording && <Button text="button_stop" onPress={stop} />}
        {
          status === recordStatus.splitting
          && <SplitSetup nodes={nodes} edges={edges} current={current} onStart={startRecording} onEditLabel={editLabel}/>
        }
        {status === recordStatus.finished && <Button text="button_preview" onPress={preview} />}
      </View>
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
  controls: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: rem(350),
  },
});

const addToArray = (setter) => (...items) => {
  return setter((arr) => {
    const unique = arr.filter((item) => !items.find((el) => el.id === item.id));
    const result = unique.concat(items);
    return result;
  });
};

const updateInArray = (setter) => (id, data) => {
  return setter((arr) => {
    const filtered = arr.filter((item) => item.id !== id);
    const current = arr.find((item) => item.id === id);
    const updated = {...current, ...data};
    return filtered.concat(updated);
  });
};

const removeFromArray = (setter) => (id) => {
  return setter((arr) => arr.filter((item) => item.id !== id));
};
