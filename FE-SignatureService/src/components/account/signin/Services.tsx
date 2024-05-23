import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {RootStackParams} from '../../../routes/RootNavigator';
import {ServicesLink, ServicesText} from './Services.style';

const Services = () => {
  const noService = () => {
    Alert.alert('지원하지 않는 기능입니다.', '로그인을 해주세요.');
  };

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const toSignup = () => {
    navigation.navigate('SelectAge');
  };

  return (
    <>
      <ServicesText>
        <ServicesLink onPress={noService}>ID 찾기</ServicesLink> 또는{' '}
        <ServicesLink onPress={noService}>비밀번호 재설정</ServicesLink>
      </ServicesText>
      <ServicesText onPress={toSignup}>
        <ServicesLink>계정 생성</ServicesLink>
      </ServicesText>
    </>
  );
};

export default Services;
