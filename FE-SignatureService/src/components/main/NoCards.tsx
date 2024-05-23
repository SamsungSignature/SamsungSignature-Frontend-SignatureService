import LottieView from 'lottie-react-native';
import {Dimensions, View} from 'react-native';
import styled from 'styled-components/native';
import MainCard from '../../assets/lotties/MainCard.json';
import {Info, Title, Wrapper} from './Common.stlye';

const windowWidth = Dimensions.get('window').width;
const lottieSize = windowWidth * 0.75;

const Lottie = styled(LottieView)`
  width: ${lottieSize}px;
  height: ${lottieSize}px;
`;

const NoCards = () => {
  return (
    <Wrapper>
      <Title>받은 카드가 없습니다</Title>
      <Lottie source={MainCard} autoPlay loop />
      <View>
        <Info>대리결제를 요청하여</Info>
        <Info>간편하게 사용하세요</Info>
      </View>
    </Wrapper>
  );
};

export default NoCards;
