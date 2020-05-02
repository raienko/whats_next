import React from 'react';
import {StyleSheet} from 'react-native';
import Text from 'src/components/Text';

export default function Timer({style}) {
  return (
    <Text style={[styles.text].concat(style)}>{`00:00:00`}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'pink',
  },
});
