import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {rem} from 'src/utils/metrics';
import Button from 'src/components/Button';
import Languages from './Languages';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <Languages />
      <View style={styles.gallery} />
      {/*<Button text="button_play" onPress={() => navigation.navigate('Play')} />*/}
      <Button text="button_create" onPress={() => navigation.navigate('Create')} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery: {
    width: rem(300),
    height: rem(300),
  },
});
