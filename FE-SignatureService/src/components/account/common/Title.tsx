import Logo from './Logo';
import {Info, Slogan, Wrapper} from './Title.style';

const Title = () => {
  return (
    <Wrapper>
      <Logo />
      <Slogan>하나의 계정으로, 모든 기기에서 나만을 위한 서비스를!</Slogan>
      <Info>삼성 계정에 로그인하세요.</Info>
    </Wrapper>
  );
};

export default Title;
