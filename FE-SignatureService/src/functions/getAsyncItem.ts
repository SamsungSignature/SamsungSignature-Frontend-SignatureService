import AsyncStorage from '@react-native-async-storage/async-storage';

const getAsyncItem = async <T = any>(key: string) => {
  const jsonString = await AsyncStorage.getItem(key);

  if (!jsonString) {
    return null;
  }

  const item: T = JSON.parse(jsonString);

  return item;
};

export default getAsyncItem;
