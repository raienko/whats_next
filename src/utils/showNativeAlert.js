import {Alert} from 'react-native';

export default function ShowNativeAlert({title, message, buttons, options}) {
  return Alert.alert(title, message, buttons, options);
}
