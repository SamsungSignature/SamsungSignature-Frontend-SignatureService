import {Permission, RESULTS, checkMultiple} from 'react-native-permissions';

const checkPermissions = async (permissions: Permission[]) => {
  const isPremissed = await checkMultiple(permissions).then(statuses => {
    const results = permissions.map(premission => {
      if (statuses[premission] === RESULTS.GRANTED) {
        return true;
      }
      return false;
    });

    return results.every(result => result);
  });

  return isPremissed;
};

export default checkPermissions;
