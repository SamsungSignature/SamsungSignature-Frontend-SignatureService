import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Alert} from 'react-native';
import IconPath from '../../../assets/iconPath';
import {theme} from '../../../assets/styles/theme';
import {RootStackParams} from '../../../routes/RootNavigator';
import {Wrapper} from './AppBackButoon.style';

const AppBackButton = (props: HeaderBackButtonProps, onPress?: () => void) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const onBackPress = () => {
    if (onPress) {
      onPress();
    } else if (props.canGoBack) {
      navigation.goBack();
    } else {
      Alert.alert('뒤로갈 수 없습니다.');
    }
  };

  if (!props.canGoBack) {
    return <></>;
  }

  return (
    <Wrapper
      onPress={onBackPress}
      style={({pressed}) => ({
        backgroundColor: pressed ? theme.colors.lightergray : 'transparent',
      })}>
      <IconPath.chevron />
    </Wrapper>
  );
};

export default AppBackButton;
