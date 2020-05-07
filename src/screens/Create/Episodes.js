import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import LottieView from 'lottie-react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import {rem} from 'src/utils/metrics';
import * as theme from 'src/theme';
import animation from './checked_animation';

export default function Episodes({state, onPlay, onRecord}) {
  const renderEpisode = ({item, index}) => (
    <View style={[styles.episode, index && styles.divider]}>
      <Text value={!item.id ? 'Initial' : item.name} />
      <View style={styles.controls}>
        {
          item.video && <LottieView source={animation} style={styles.icon} ref={ref => ref && ref.play()} loop={false} />
        }
        {
          !item.video && <Button text="button_record" onPress={() => onRecord(item.id)} />
        }
      </View>
    </View>
  );
  const finished = !state.nodes.find((node) => !node.video);
  return (
    <View style={styles.wrapper}>
      <FlatList
        bounces={false}
        data={state.nodes}
        renderItem={renderEpisode}
        keyExtractor={(item) => `${item.id}`}
        style={styles.list}
        contentContainerStyle={styles.container}
      />
      {
        finished && <Button text="button_play" onPress={onPlay} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexGrow: undefined,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius,
  },
  container: {
    padding: theme.offset,
    width: rem(360),
  },
  episode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controls: {
    flexDirection: 'row',
  },
  divider: {
    borderTopWidth: 1,
  },
  icon: {
    width: rem(50),
    height: rem(50),
  },
});
