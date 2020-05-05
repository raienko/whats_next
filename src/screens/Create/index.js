import React, {useReducer, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'src/components/Spinner';
import Button from 'src/components/Button';
import {rem} from 'src/utils/metrics';
import Text from 'src/components/Text';
import reducer, {initialState} from './state/reducer';
import * as actions from './state/actions';
import {status} from './state/constants';
import Camera from './Camera';
import SetupEpisodes from './SetupEpisodes';

export default function Create() {
  const navigation = useNavigation();
  const camera = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCameraReady = () => actions.setStatus(dispatch)(status.ready);

  const leaveScreen = () => navigation.pop();

  const registerCamera = (ref) => camera.current = ref;

  const start = async () => {
    await actions.start(dispatch)();
    await startRecording(state.currentNode);
  };

  const startRecording = async (nodeId) => {
    console.log({nodeId});
    await startRecording();
    const video = await camera.current.record();
    await actions.updateNode(dispatch)(nodeId, {video});
  };

  const stopRecording = async () => {
    return camera.current.stop();
  };

  const setBreakpoint = async () => {
    await stopRecording();
    await actions.createBreakpoint(dispatch)();
  };

  const editNode = async (id, changes) => {
    return await actions.updateNode(dispatch)(id, changes);
  };

  const preview = async () => {
    return navigation.navigate('Play', state);
  };

  return (
    <View style={styles.wrapper}>
      <Camera onReady={handleCameraReady} onRef={registerCamera} />
      <Text />
      <View style={styles.controls}>
        <Button text="button_back" onPress={leaveScreen} style={styles.back} />
        {
          state.status === status.ready
          && <Button text="button_start" onPress={start} />
        }
        {
          state.status === status.recording
          && <Button text="button_split" onPress={setBreakpoint} />
        }
        {
          state.status === status.recording
          && <Button text="button_finish_episode" onPress={stopRecording} />
        }
        {
          state.status === status.splitting
          && <SetupEpisodes state={state} onStart={startRecording} onEdit={editNode} />
        }
        {
          state.status === status.finished
          && <Button text="button_preview" onPress={preview} />
        }
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
