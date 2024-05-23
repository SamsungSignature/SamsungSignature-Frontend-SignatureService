import EncryptedStorage from 'react-native-encrypted-storage';
import getTokenExternal from './getTokenExternal';

const getRefreshToken = async () => {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (!refreshToken) {
      const externalToken = await getTokenExternal();
      if (!externalToken) {
        throw new Error('외부 토큰 없음');
      }
      const externalRefreshToken = externalToken.refreshToken;

      return {refreshToken: externalRefreshToken};
    }

    return {refreshToken};
  } catch (err) {
    return {refreshToken: ''};
  }
};

export default getRefreshToken;
