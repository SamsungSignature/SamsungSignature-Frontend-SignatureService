import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import Logo from '../../../components/account/common/Logo';
import AppButton from '../../../components/common/AppButton';
import STYLES from '../../../constants/appStyles';
import {RootStackParams} from '../../../routes/RootNavigator';
import {RegistData} from '../SignupFunnel';
import {
  Content,
  EmailText,
  EmailView,
  Info,
  LinkText,
  LinkView,
  Title,
  TitleView,
  Wrapper,
} from './Confirm.style';

interface ConfirmProps {
  data: RegistData;
  toNext: () => void;
  toPrev: () => void;
}

const Confirm = ({data, toNext, toPrev}: ConfirmProps) => {
  const noService = () => {
    Alert.alert('지원하지 않는 기능입니다.', '받은 메일함으로 이동해주세요.');
  };

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  useEffect(() => {
    navigation.setOptions({header: () => null});
  }, []);

  return (
    <Wrapper>
      <TitleView>
        <Logo option={{size: 'small'}} />
        <Title>이제 한 단계 남았어요!</Title>
        <Info>아래 주소로 보낸 인증 이메일에 포함된 링크를 누르세요.</Info>
      </TitleView>
      <Content>
        <EmailView>
          <EmailText>{data.email}</EmailText>
          <AppButton
            text="받은 메일함으로 이동"
            style={STYLES.BUTTONS.GRAY_SQUARE}
            onPress={toNext}
          />
        </EmailView>
        <LinkView>
          <LinkText onPress={toPrev}>이메일 주소 변경</LinkText>
          <LinkText onPress={noService}>이메일 다시 보내기</LinkText>
        </LinkView>
      </Content>
    </Wrapper>
  );
};

export default Confirm;
