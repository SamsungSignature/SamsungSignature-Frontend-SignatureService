import {Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {theme} from '../assets/styles/theme';

interface UseCardsStyleProps {
  $isLeft?: boolean;
}

const screen = Dimensions.get('screen');

const Wrapper = styled.Pressable`
  width: ${screen.width}px;
  height: ${screen.width * 0.6}px;
`;

const AfterPrevImage = styled(Animated.Image)`
  position: absolute;
  top: 7%;
  width: 82%;
  height: 90%;
  align-self: center;
  transform: ${`translateX(-${screen.width}px)`} scale(0.8);
  opacity: 0;
`;

const PrevImage = styled(Animated.Image)`
  position: absolute;
  top: 7%;
  width: 82%;
  height: 90%;
  align-self: center;
  transform: ${`translateX(-${screen.width}px)`} scale(0.8);
  opacity: 0.3;
`;

const CardImage = styled(Animated.Image)`
  position: absolute;
  top: 7%;
  width: 82%;
  height: 90%;
  align-self: center;
`;

const NextImage = styled(Animated.Image)<UseCardsStyleProps>`
  position: absolute;
  top: 7%;
  width: 82%;
  height: 90%;
  align-self: center;
  transform: ${({$isLeft}) =>
    $isLeft ? 'translateY(-6px)' : 'translateY(-12px)'};
  opacity: 0.9;
`;

const AfterNextImage = styled(Animated.Image)`
  position: absolute;
  top: 7%;
  width: 82%;
  height: 90%;
  align-self: center;
  transform: translateY(-12px);
  opacity: 0.9;
`;

const LastImage = styled(Animated.Image)`
  position: absolute;
  top: 7%;
  width: 82%;
  height: 90%;
  align-self: center;
  transform: translateY(-12px);
  opacity: 0;
`;

const NicknameView = styled(Animated.View)`
  position: absolute;
  top: 7%;
  width: 82%;
  height: 90%;
  align-self: center;
  justify-content: flex-end;
`;

const Nickname = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes[2]};
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.space[3]};
`;

export {
  AfterNextImage,
  AfterPrevImage,
  CardImage,
  LastImage,
  NextImage,
  Nickname,
  NicknameView,
  PrevImage,
  Wrapper,
};
