import {Alert} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {PERMISSIONS, openSettings} from 'react-native-permissions';
import styled from 'styled-components/native';
import {theme} from '../assets/styles/theme';
import Permission from '../components/Permission';
import AppButton from '../components/common/AppButton';
import APP_PERMISSIONS from '../constants/permissions';
import checkPermission from '../functions/checkPermission';
import {useAppDispatch} from '../stores/hooks';
import {setPermiss} from '../stores/slices/user';

const Wrapper = styled.View`
  flex: 1;
  padding: ${theme.space[4]};
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights.semibold};
  text-align: center;
  padding: ${theme.space[4]} 0;
`;

const PermissitionsView = styled.ScrollView`
  flex: 1;
`;

const Permissions = () => {
  const dispatch = useAppDispatch();
  const requestPermissions = async () => {
    const readContacts = await checkPermission(
      PERMISSIONS.ANDROID.READ_CONTACTS,
    );
    const writeContacts = await checkPermission(
      PERMISSIONS.ANDROID.WRITE_CONTACTS,
    );
    const camera = await checkPermission(PERMISSIONS.ANDROID.CAMERA);
    const postNotifications = await checkPermission(
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    );
    if (camera && postNotifications && readContacts && writeContacts) {
      dispatch(setPermiss(true));
    } else {
      Alert.alert(
        '필수 권한 허용 안내',
        '위 권한들은 필수 권한입니다. 설정에서 권한을 허용해주세요.',
        [
          {text: '앱 닫기', onPress: () => RNExitApp.exitApp()},
          {text: '설정으로', onPress: () => openSettings()},
        ],
      );
    }
  };

  return (
    <Wrapper>
      <Title>Wallet 사용을 위한 접근 권한 안내</Title>
      <PermissitionsView>
        {APP_PERMISSIONS.map(permission => (
          <Permission key={permission.title} permission={permission} />
        ))}
      </PermissitionsView>
      <AppButton text="계속" onPress={requestPermissions} />
    </Wrapper>
  );
};

export default Permissions;
