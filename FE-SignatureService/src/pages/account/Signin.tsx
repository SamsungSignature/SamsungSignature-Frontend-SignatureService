import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import Logo from '../../components/account/common/Logo';
import Form from '../../components/account/signin/Form';
import Help from '../../components/account/signin/Help';
import Services from '../../components/account/signin/Services';
import SocialLogin from '../../components/account/signin/SocialLogin,';
import {Wrapper} from './Common.style';

const Container = styled.View`
  flex: 1;
  padding: ${theme.space[4]};
  align-items: center;
  gap: ${theme.space[3]};
`;

const Slogan = styled.Text`
  color: ${theme.colors.googleblue};
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.space[3]};
`;

const Signin = () => {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <Slogan>삼성계정으로 로그인</Slogan>
        <Form />
        <Services />
        <SocialLogin />
        <Help />
      </Container>
    </Wrapper>
  );
};

export default Signin;
