import AsyncStorage from '@react-native-async-storage/async-storage';

const setAsyncItem = async (key: string, value: any) => {
  const jsonString = JSON.stringify(value);

  await AsyncStorage.setItem(key, jsonString);
};

export default setAsyncItem;
