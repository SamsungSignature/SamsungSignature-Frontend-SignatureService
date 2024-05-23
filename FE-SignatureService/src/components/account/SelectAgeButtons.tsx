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

const SelectAgeButtons = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  // 네비게이션
  const toSignup = () => {
    navigation.navigate('IdVerifyFunnel');
  };
  const noService = () => {
    Alert.alert('지원하지 않는 기능입니다.', '14세 이상만 가입 가능합니다.');
  };

  return (
    <Wrapper>
      <AppButton
        text="14세 이상"
        style={STYLES.BUTTONS.SERVICE}
        onPress={toSignup}
      />
      <AppButton
        text="14세 미만"
        style={STYLES.BUTTONS.SERVICE}
        onPress={noService}
      />
    </Wrapper>
  );
};

export default SelectAgeButtons;
