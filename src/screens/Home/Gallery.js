import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {rem} from 'src/utils/metrics';

export default function Canvas({children}) {
  const [episodes, setEpisodes] = useState([]);

  const renderEpisode = ({item, index}) => <Episode data={item} />;
  return (
    <FlatList data={episodes} renderItem={renderEpisode} />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
