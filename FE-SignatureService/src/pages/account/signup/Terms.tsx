import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';
import Logo from '../../../components/account/common/Logo';
import ScrollTerms from '../../../components/account/common/ScrollTerms';
import AppButton from '../../../components/common/AppButton';
import useTerms from '../../../hooks/useTerms';
import {RootStackParams} from '../../../routes/RootNavigator';
import {Title, TitleView} from '../Common.style';

const Wrapper = styled.View`
  flex: 1;
  background: ${theme.colors.white};
  align-items: center;
  padding: ${theme.space[4]};
`;

interface TermsData {
  termChecks: boolean[];
}

interface TermsProps {
  toNext: (data: TermsData) => void;
}

const Terms = ({toNext}: TermsProps) => {
  const {
    agreement,
    setAgreement,
    termChecks,
    setTermChecks,
    checkValid,
    agree,
  } = useTerms('SIGNUP');

  const pressAgree = () => {
    if (!checkValid()) {
      return;
    }
    const data: TermsData = {
      termChecks,
    };
    agree();
    toNext(data);
  };

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  useEffect(() => {
    navigation.setOptions({header: () => null});
  }, []);

  return (
    <Wrapper>
      <TitleView>
        <Logo option={{size: 'small'}} />
        <Title>삼성 계정 만들기</Title>
      </TitleView>
      <ScrollTerms
        title="아래 항목을 확인하세요."
        terms="SIGNIN"
        agreement={agreement}
        setAgreement={setAgreement}
        termChecks={termChecks}
        setTermChecks={setTermChecks}
      />
      <AppButton text="동의" onPress={pressAgree} disabled={!checkValid()} />
    </Wrapper>
  );
};

export type {TermsData};
export default Terms;
