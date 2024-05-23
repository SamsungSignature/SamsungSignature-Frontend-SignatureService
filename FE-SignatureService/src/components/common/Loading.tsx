import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import LoadingLottie from '../../assets/lotties/Loading.json';
import {theme} from '../../assets/styles/theme';

const Wrapper = styled.View`
  flex: 1;
  background: ${theme.colors.white};
  align-items: center;
  justify-content: center;
`;

const Lottie = styled(LottieView)`
  width: 100px;
  height: 100px;
`;

const Loading = () => {
  return (
    <Wrapper>
      <Lottie source={LoadingLottie} autoPlay loop resizeMode="contain" />
    </Wrapper>
  );
};

export default Loading;
