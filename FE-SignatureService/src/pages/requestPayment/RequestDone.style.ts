import LottieView from 'lottie-react-native';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const {fontSizes} = theme;

const screen = Dimensions.get('screen');

export const Wrpper = styled.View`
  flex: 1;
  background: ${theme.colors.white};
`;

export const BoldText = styled.Text`
  font-weight: bold;
  color: black;
  font-size: ${fontSizes[4]};
  text-align: center;
`;

export const NormalText = styled.Text`
  color: black;
  font-size: ${fontSizes[3]};
  margin-top: 4px;
  text-align: center;
`;

export const CompleteView = styled.View`
  flex: 1;
  align-items: center;
  padding: 48px 24px;
`;

export const TextArea = styled.View`
  align-items: center;
  gap: ${theme.space[3]};
`;

export const BottomText = styled.Text`
  color: black;
  font-size: ${fontSizes[3]};
`;

export const BottomArea = styled.Pressable`
  /* position: absolute;
  bottom: 50px; */
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin: 10px;
  border-radius: 999px;
`;

export const Lottie = styled(LottieView)`
  flex: 1;
  width: ${screen.width * 0.8}px;
  height: ${screen.width * 0.8}px;
`;
