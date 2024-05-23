import {Alert, Platform} from 'react-native';
import {Permission, RESULTS, check, request} from 'react-native-permissions';

const checkPermission = async (permission: Permission) => {
  if (Platform.OS === 'ios') {
    Alert.alert('ios는 지원되지 않습니다.');
    return;
  }

  const permissed = await check(permission)
    .then(result => {
      if (result === RESULTS.UNAVAILABLE) {
        return result;
      } else if (result === RESULTS.GRANTED) {
        return result;
      } else if (result === RESULTS.DENIED) {
        return request(permission);
      }
    })
    .then(response => {
      if (response !== RESULTS.DENIED && response !== RESULTS.BLOCKED) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });

  return permissed;
};

export default checkPermission;
