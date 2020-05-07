import AsyncStorage from '@react-native-community/async-storage';

export default new (class Storage {
  setItem = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));
  getItem = (key, placeholder) => AsyncStorage.getItem(key)
    .then(value => value ? JSON.parse(value) : placeholder);
})();
