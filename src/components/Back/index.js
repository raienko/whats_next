import React from 'react';
import Touchable from 'src/components/Touchable';
import Text from 'src/components/Text';

export default function Back(params) {
  return (
    <Touchable {...params}>
      <Text text="button_back" style={{color: '#fff'}} />
    </Touchable>
  );
}
