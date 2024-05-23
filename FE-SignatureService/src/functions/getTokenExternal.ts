import {getContactsMatchingString} from 'react-native-contacts';
import EncryptedStorage from 'react-native-encrypted-storage';
import {PERMISSIONS} from 'react-native-permissions';
import checkPermissions from './checkPermissions';

interface Token {
  refreshToken: string;
  accessToken: {
    access_token: string;
    created_at: number;
    expires_in: number;
  };
}

const getTokenExternal = async () => {
  return await checkPermissions([
    PERMISSIONS.ANDROID.READ_CONTACTS,
    PERMISSIONS.ANDROID.WRITE_CONTACTS,
  ])
    .then(statuses => {
      if (!statuses) {
        throw new Error('연락처 권한 없음');
      }
      return getContactsMatchingString('SamsungAccountToken');
    })
    .then(async contacts => {
      if (contacts.length === 0) {
        throw new Error('외부 토큰 없음');
      } else {
        const strToken = contacts[0].jobTitle;
        if (strToken === '') {
          throw new Error('외부 토큰 비었음');
        }
        const token: Token = JSON.parse(strToken);

        await EncryptedStorage.setItem(
          'token',
          JSON.stringify(token.accessToken),
        );
        await EncryptedStorage.setItem(
          'refreshToken',
          JSON.stringify(token.refreshToken),
        );

        return token;
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export default getTokenExternal;
