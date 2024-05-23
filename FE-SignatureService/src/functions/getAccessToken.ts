import EncryptedStorage from 'react-native-encrypted-storage';
import {LoginResponseData} from '../api/member/useLogin';
import getTokenExternal from './getTokenExternal';

const getAccessToken = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      const externalToken = await getTokenExternal();
      if (!externalToken) {
        throw new Error('외부 토큰 없음');
      }
      const {access_token, expires_in, created_at} = externalToken.accessToken;

      const now = new Date().getTime();
      const expired_at = created_at + expires_in;
      const isExpired = now > expired_at;

      return {accessToken: access_token, isExpired, created_at, expires_in};
    }

    const {access_token, expires_in, created_at}: LoginResponseData =
      JSON.parse(token);

    const now = new Date().getTime();
    const expired_at = created_at + expires_in;

    const isExpired = now > expired_at;

    return {accessToken: access_token, isExpired, created_at, expires_in};
  } catch (err) {
    return {accessToken: '', isExpired: true, created_at: 0, expires_in: 0};
  }
};

export default getAccessToken;
