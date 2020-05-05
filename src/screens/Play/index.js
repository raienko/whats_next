import React, {useState, useRef} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import {rem} from 'src/utils/metrics';

export default function Play({route, navigation}) {
  const {nodes, edges, choices} = route.params;
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const player = useRef();
  const episode = nodes.find((node) => node.id === current);
  const options = edges.filter((edge) => edge.from === choices);
  const hasOptions = !!options.length;
  const last = !options.length;

  const leaveScreen = () => {
    navigation.pop();
  };

  const selectOption = (edge) => {
    const nextNode = nodes.find((node) => node.id === edge.to);
    if (!nextNode) {
      return Alert.alert('No video for this episode');
    }
    setFinished(false);
    setCurrent(edge.to);
  };

  const registerPlayer = (ref) => {
    if (ref) {
      console.log({player: ref});
      player.current = ref;
    }
  };

  const handleVideoFinished = () => {
    setFinished(true);
  };

  return (
    <View style={styles.wrapper}>
      <Video
        source={{uri: episode.video.uri}}
        ref={registerPlayer}
        onEnd={handleVideoFinished}
        style={styles.video}
      />
      <Text value={episode.label} />
      {
        finished
        && hasOptions
        && (
          <View style={styles.wrapper}>
            <Button text={options[0].label || 'button_episode_a'} onPress={() => selectOption(options[0].id)} />
            <Button text={episode[1].label || 'button_episode_b'} onPress={() => selectOption(options[1].id)}/>
          </View>
        )
      }
      {finished && last && <Button text="button_share" />}
      <Button text="button_back" onPress={leaveScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  video: {
    width: rem(300),
    height: rem(500),
  },
});
