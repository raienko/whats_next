import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Video from 'react-native-video';
import Title from 'src/components/Title';
import RestartButton from 'src/components/RestartButton';
import Button from 'src/components/Button';
import BackButton from 'src/components/BackButton';
import Spinner from 'src/components/Spinner';
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

  return (
    <View style={styles.wrapper}>
      <Video
        source={episode ? {uri: episode.video.uri} : undefined}
        ref={registerPlayer}
        onEnd={next}
        style={styles.video}
      />
      {episode && <Title value={episode.name} />}
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
      <RestartButton onPress={start} style={styles.restart} />
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
    // backgroundColor: '#ccc',
  },
  video: {
    width: screenWidth,
    height: screenHeight * 0.8,
  },
  controls: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  restart: {
    position: 'absolute',
    right: 0,
    bottom: rem(30),
  },
});
