import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import imagePath from '../../assets/imagePath';
import {theme} from '../../assets/styles/theme';
import STYLES from '../../constants/appStyles';
import {RootStackParams} from '../../routes/RootNavigator';
import AppButton from '../common/AppButton';
import AppHr from '../common/AppHr';

const Wrapper = styled.View`
  flex: 1;
  gap: ${theme.space[3]};
  padding: 0 ${theme.space[4]};
`;

const InfoView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.Text`
  font-size: ${theme.fontSizes[1]};
  font-weight: ${theme.fontWeights.semibold};
  text-decoration: underline;
`;

const MainButtons = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  // 네비게이션
  const toLogin = () => {
    navigation.navigate('Signin');
  };
  const toService = () => {
    navigation.navigate('AccountServices');
  };
  const noService = () => {
    Alert.alert(
      '지원하지 않는 기능입니다.',
      '이메일 주소 또는 전화번호 로그인을 이용해주세요',
    );
  };

  return (
    <Wrapper>
      <AppButton
        text="이메일 주소 또는 전화번호"
        style={STYLES.BUTTONS.TO_LOGIN}
        onPress={toLogin}
      />
      <AppHr>또는</AppHr>
      <AppButton
        text="Google 계정으로 로그인"
        style={STYLES.BUTTONS.SOCIAL_LOGIN}
        image={imagePath.googlelogo}
        onPress={noService}
      />
      <AppButton
        text="QR 코드로 로그인"
        style={STYLES.BUTTONS.QR_LOGIN}
        image={imagePath.qr}
        onPress={noService}
      />
      <InfoView>
        <InfoText onPress={toService}>
          비밀번호를 잊어버렸거나 계정이 없나요?
        </InfoText>
      </InfoView>
    </Wrapper>
  );
};

export default MainButtons;
