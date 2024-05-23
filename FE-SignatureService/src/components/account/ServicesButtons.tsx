import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import STYLES from '../../constants/appStyles';
import {RootStackParams} from '../../routes/RootNavigator';
import AppButton from '../common/AppButton';

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${theme.space[3]};
  padding: 0 ${theme.space[4]};
`;

const ServicesButtons = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  // 네비게이션
  const toSelectAge = () => {
    navigation.navigate('SelectAge');
  };
  const noService = () => {
    Alert.alert('지원하지 않는 기능입니다.', '계정 만들기를 눌러주세요.');
  };

  return (
    <Wrapper>
      <AppButton
        text="계정 만들기"
        style={STYLES.BUTTONS.SERVICE}
        onPress={toSelectAge}
      />
      <AppButton
        text="ID 찾기"
        style={STYLES.BUTTONS.SERVICE}
        onPress={noService}
      />
      <AppButton
        text="비밀번호 찾기"
        style={STYLES.BUTTONS.SERVICE}
        onPress={noService}
      />
    </Wrapper>
  );
};

export default ServicesButtons;
