import React from 'react';
import {View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const collections = {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
};

function VectorIcon({collection, ...rest}) {
  const Icon = collections[collection];
  return (
    <Icon {...rest} />
  );
}

VectorIcon.collections = {
  FontAwesome: 'FontAwesome',
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
};

VectorIcon.defaultProps = {
  collection: VectorIcon.collections.FontAwesome,
};

export default VectorIcon;
