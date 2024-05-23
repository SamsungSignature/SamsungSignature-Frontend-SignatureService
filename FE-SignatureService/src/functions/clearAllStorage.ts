import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

const clearAllStorage = async () => {
  await EncryptedStorage.clear();
  await AsyncStorage.clear();
};

export default clearAllStorage;
