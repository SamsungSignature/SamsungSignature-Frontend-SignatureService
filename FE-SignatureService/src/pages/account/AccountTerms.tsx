import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import ScrollTerms from '../../components/account/common/ScrollTerms';
import AppButton from '../../components/common/AppButton';
import STYLES from '../../constants/appStyles';
import useTerms from '../../hooks/useTerms';

const Wrapper = styled.View`
  flex: 1;
  background: ${theme.colors.white};
  align-items: center;
  padding: ${theme.space[3]} ${theme.space[4]};
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.space[3]};
`;

const AccountTerms = () => {
  const {
    agreement,
    setAgreement,
    termChecks,
    setTermChecks,
    agree,
    checkValid,
  } = useTerms('SIGNIN');

  return (
    <Wrapper>
      <Title>환영합니다</Title>
      <ScrollTerms
        terms="SIGNIN"
        termChecks={termChecks}
        setTermChecks={setTermChecks}
        agreement={agreement}
        setAgreement={setAgreement}
      />
      <AppButton
        text="동의"
        style={STYLES.BUTTONS.SMALL}
        onPress={agree}
        disabled={!checkValid()}
      />
    </Wrapper>
  );
};

export default AccountTerms;
