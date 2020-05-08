import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Touchable from 'src/components/Touchable';
import {rem} from 'src/utils/metrics';
import * as theme from 'src/theme';

export default function EpisodeName({episode, onEdit, style, onPress, ...rest}) {
  return (
    <View style={[styles.wrapper].concat(style)}>
      <Text style={styles.title} text="episode" value={` #${episode.id + 1}`} />
      <Touchable onPress={onPress} style={StyleSheet.absoluteFill} />
      <Input
        {...rest}
        value={episode.name}
        placeholder="episode_name_placeholder"
        multiline
        numberOfLines={2}
        onChangeText={(name) => onEdit({name})}
        maxLength={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: rem(180),
    margin: theme.offset,
    padding: theme.offset,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius,
    ...theme.shadow,
  },
});
