import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Video from 'react-native-video';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import BackButton from 'src/components/BackButton';
import RemoveButton from 'src/components/RemoveButton';
import Spinner from 'src/components/Spinner';
import SaveButton from 'src/components/SaveButton';
import {screenWidth, screenHeight, rem} from 'src/utils/metrics';
import * as theme from 'src/theme';

export default function Play({route, navigation}) {
  const player = useRef();
  const {state, initial} = route.params;
  const [episode, setEpisode] = useState(null);
  const [options, setOptions] = useState(null);

  const leaveScreen = () => {
    navigation.pop();
  };

  const registerPlayer = (ref) => {
    if (ref) {
      player.current = ref;
    }
  };

  const next = () => {
    const edges = state.edges.filter((edge) => edge.from === episode.id);
    if (!edges.length) {
      return Alert.alert('FINISHED!');
    }
    const nodeIds = edges.map((edge) => edge.to);
    const nodes = state.nodes.filter((node) => nodeIds.includes(node.id));
    setOptions(nodes);
  };

  const select = (id) => {
    setOptions(null);
    const selected = state.nodes.find((node) => node.id === id);
    setEpisode(selected);
  };

  const start = () => {
    const firstEpisode = state.nodes.find((node) => node.id === (initial || 0));
    setEpisode(firstEpisode);
  };

  useEffect(() => {
    start();
  }, []);

  const save = () => {
    leaveScreen();
  };

  const remove = () => {
    leaveScreen();
  };

  return (
    <View style={styles.wrapper}>
      <Video
        source={episode ? {uri: episode.video.uri} : undefined}
        ref={registerPlayer}
        onEnd={next}
        style={styles.video}
      />
      {episode && <Text value={episode.name} style={styles.title} />}
      {
        options &&
        <View style={styles.controls}>
          <Button
            value={options[0].name}
            style={{backgroundColor: '#ff003f'}}
            onPress={() => select(options[0].id)}
          />
          <Button
            value={options[1].name}
            style={{backgroundColor: '#00aaff'}}
            onPress={() => select(options[1].id)}
          />
        </View>
      }
      <View style={styles.panel}>
        {
          !state.saved && <SaveButton onPress={save} />
        }
        <Button text="button_restart" onPress={start} />
        <RemoveButton onPress={remove} />
      </View>
      <BackButton onPress={leaveScreen} />
      <Spinner visible={!episode} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: screenWidth,
    height: screenHeight * 0.8,
  },
  panel: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    alignItems: 'center',
    borderRadius: theme.borderRadius,
  },
  controls: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    position: 'absolute',
    top: rem(50),
    fontSize: rem(25),
    backgroundColor: 'yellow',
    paddingHorizontal: theme.offset,
  },
});
