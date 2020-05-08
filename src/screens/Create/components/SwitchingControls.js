import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import AnimatedIcon from 'src/components/AnimatedIcon';
import Text from 'src/components/Text';
import IconButton from 'src/components/IconButton';
import SaveButton from 'src/components/SaveButton';
import PlayButton from 'src/components/PlayButton';
import {rem} from 'src/utils/metrics';
import * as theme from 'src/theme';
import animation from './checked_animation';

export default function SwitchingControls({state, onRecord, onPlay, onSave}) {
  const renderEpisode = ({item, index}) => (
    <View style={[styles.episode, index && styles.divider]}>
      <Text value={item.name} />
      <View style={styles.controls}>
        {item.video && <AnimatedIcon source={animation} size={rem(50)} autoPlay loop={false} />}
        {!item.video && <IconButton icon="plus" onPress={() => onRecord(item.id)} />}
      </View>
    </View>
  );

  const finished = isFinished(state);
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
        finished &&
        <View style={styles.panel}>
          <SaveButton onPress={onSave} />
          <PlayButton onPress={onPlay} />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: rem(500),
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    borderTopWidth: 1,
  },
  panel: {
    marginTop: theme.offset,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    height: rem(50),
    borderRadius: theme.borderRadius,
    width: rem(150),
    backgroundColor: theme.colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const isFinished = (state) => {
  let finished = true;
  state.nodes.forEach((node) => {
    if (!node.video || !node.name) {
      finished = false;
    }
  });
  return finished;
};
