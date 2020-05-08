import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import showNativeAlert from 'src/utils/showNativeAlert';
import Text from 'src/components/Text';
import {rem} from 'src/utils/metrics';
import * as theme from 'src/theme';
import gallery from 'src/utils/gallery';
import IconButton from 'src/components/IconButton';

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();
  const insets = useSafeArea();

  const fetchProjects = async () => {
    const items = await gallery.getProjects();
    setProjects(items);
  };

  const onRemove = (item) => () => {
    return showNativeAlert({
      title: 'Are you sure?',
      message: 'Item will be deleted forever!',
      buttons: [
        { text: 'Ok', onPress: remove(item) },
        { text: 'Cancel'},
      ],
    });
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

  const play = (item) => () => navigation.push('Play', {state: item.state});

  const renderProject = ({item}) => (
    <View style={styles.row}>
      <Text value={item.state.nodes[0].name} />
      <View style={styles.controls}>
        <IconButton icon="trash" onPress={onRemove(item)} />
        <IconButton icon="play" onPress={play(item)} />
      </View>
    </View>
  );

  return (
    <View style={{paddingTop: insets.top, flex: 1}}>
      <Text text="my_gallery" style={styles.title} />
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
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
    borderBottomWidth: rem(1),
  },
  controls: {
    flexDirection: 'row',
  },
  title: {
    margin: theme.offset,
    fontSize: rem(25),
  },
});
