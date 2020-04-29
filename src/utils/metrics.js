import {Dimensions} from 'react-native';

export const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export const vw = (value) => Math.floor((screenWidth / 100) * value);
export const vh = (value) => Math.floor((screenHeight / 100) * value);
export const rem = (value) => Math.floor((screenWidth / 380) * value);

export const offset = rem(5);
