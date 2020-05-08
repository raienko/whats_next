import React, {useReducer, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'src/components/Spinner';
import BackButton from 'src/components/BackButton';
import Text from 'src/components/Text';
import {rem} from 'src/utils/metrics';

import reducer, {initialState} from './state/reducer';
import * as actions from './state/actions';
import {status} from './state/constants';

import Camera from './components/Camera';
import ReadyControls from './components/ReadyControls';
import RecordingControls from './components/RecordingControls';
import SplittingControls from './components/SplittingControls';
import SwitchingControls from './components/SwitchingControls';
import gallery from 'src/utils/gallery';

export default function Create() {
  const navigation = useNavigation();
  const camera = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCameraReady = async () => {
    await actions.start(dispatch)();
    await actions.setStatus(dispatch)(status.ready);
  };

  const leaveScreen = () => navigation.pop();

  const registerCamera = (ref) => (camera.current = ref);

  const stop = async () => {
    await stopRecording();
    await actions.setStatus(dispatch)(status.switching);
  };

  const record = async (nodeId) => {
    await actions.setStatus(dispatch)(status.recording);
    await actions.setCurrentNode(dispatch)(nodeId);
    const video = await camera.current.record();
    await actions.updateNode(dispatch)(nodeId, {video});
  };

  const stopRecording = async () => {
    return camera.current.stop();
  };

  const split = async () => {
    await stopRecording();
    await actions.createBreakpoint(dispatch)();
  };

  const edit = async (id, changes) => {
    return await actions.updateNode(dispatch)(id, changes);
  };

  const play = async () => {
    return navigation.navigate('Play', state);
  };

  const save = async () => {
    await gallery.saveProject(state);
    leaveScreen();
  };

  const currentEpisode = state.nodes.find((node) => node.id === state.currentNode);
  return (
    <View style={styles.wrapper}>
      <Camera onReady={handleCameraReady} onRef={registerCamera} />
      <View style={styles.controls}>
        {
          state.status === status.ready
          && <ReadyControls state={state} onEdit={edit} onStart={record} />
        }
        {
          state.status === status.recording &&
          <>
            <Text style={styles.title} value={currentEpisode.name} />
            <RecordingControls state={state} onSplit={split} onStop={stop} />
          </>
        }
        {
          state.status === status.splitting
          && <SplittingControls state={state} onStart={record} onEdit={edit} />
        }
        {
          state.status === status.switching
          && <SwitchingControls state={state} onRecord={record} onPlay={play} onSave={save} />
        }
        <BackButton onPress={leaveScreen} />
      </View>
      <Spinner visible={state.status === status.loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: rem(350),
  },
  title: {
    position: 'absolute',
    top: rem(50),
    alignSelf: 'center',
    color: '#fff',
  },
});
