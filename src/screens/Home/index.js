import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import {rem} from 'src/utils/metrics';
import Button from 'src/components/Button';
import Gallery from './components/Gallery';

export default function Home() {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const create = () => navigation.navigate('Create');
  return (
    <View style={styles.wrapper}>
      <Gallery />
      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <Button text="button_create" onPress={create} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  gallery: {
    width: rem(300),
    height: rem(300),
  },
  header: {
    backgroundColor: '#ccc',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
