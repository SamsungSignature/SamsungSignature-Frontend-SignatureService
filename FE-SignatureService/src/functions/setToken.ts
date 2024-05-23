import {
  addContact,
  getContactsMatchingString,
  updateContact,
} from 'react-native-contacts';
import EncryptedStorage from 'react-native-encrypted-storage';
import {PERMISSIONS} from 'react-native-permissions';
import checkPermissions from './checkPermissions';

interface TokenResponse {
  headers: {'set-cookie'?: string[]};
  data: {body: {access_token: string; created_at: number; expires_in: number}};
}

const setTokens = async <T extends TokenResponse>(response: T) => {
  // refresh_token
  const cookies = response.headers['set-cookie'];
  if (!cookies) {
    throw new Error('쿠키가 없습니다');
  }
  const refreshTokenCookie = cookies.find(cookie =>
    /refresh_token=/.test(cookie),
  );
  if (!refreshTokenCookie) {
    throw new Error('리프레시 토큰이 없습니다');
  }
  const refreshToken = refreshTokenCookie.split(';')[0].split('=')[1];
  await EncryptedStorage.setItem('refreshToken', refreshToken);

  // acess_token
  if (!response.data.body) {
    throw new Error('액세스 토큰이 없습니다');
  }
  await EncryptedStorage.setItem('token', JSON.stringify(response.data.body));

  // 외부 디렉토리에 저장
  const token = {
    refreshToken: refreshToken,
    accessToken: response.data.body,
  };
  const result = await checkPermissions([
    PERMISSIONS.ANDROID.WRITE_CONTACTS,
    PERMISSIONS.ANDROID.READ_CONTACTS,
  ])
    .then(statuses => {
      if (!statuses) {
        throw new Error('권한 없음');
      }
      return getContactsMatchingString('SamsungAccountToken');
    })
    .then(async constacts => {
      if (constacts.length === 0) {
        return await addContact({
          givenName: 'SamsungAccountToken',
          jobTitle: JSON.stringify(token),
        });
      } else {
        let recode = constacts[0];
        recode.jobTitle = JSON.stringify(token);
        return await updateContact(recode);
      }
    })
    .then(() => {
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });

  return result;
};

export default setTokens;
