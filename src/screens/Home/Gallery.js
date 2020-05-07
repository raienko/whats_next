import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Button from 'src/components/Button';
import {useNavigation} from '@react-navigation/native';
import Text from 'src/components/Text';
import * as theme from 'src/theme';
import gallery from 'src/utils/gallery';

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

  const fetchProjects = async () => {
    const items = await gallery.getProjects();
    setProjects(items);
  };

  const remove = (item) => async () => {
    await gallery.remove(item.id);
    await fetchProjects();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchProjects);
    fetchProjects();
    return unsubscribe;
  }, [navigation]);

  const renderProject = ({item}) => (
    <View style={styles.row}>
      <Text value={item.state.nodes[1].name} />
      <Button text="button_play" onPress={() => navigation.push('Play', {state: item.state})} />
      <Button text="button_remove" onPress={remove(item)} />
    </View>
  );

  return (
    <>
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => `${item.id}`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.offset,
  },
});
