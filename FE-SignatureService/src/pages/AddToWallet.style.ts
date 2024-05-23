import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../assets/styles/theme';

const screen = Dimensions.get('screen');

const Wrapper = styled.View`
  flex: 1;
  background: ${theme.colors.white};
  align-items: center;
  justify-content: center;
`;

const TitleView = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
`;

const Body = styled.View`
  flex: 5;
  gap: ${theme.space[4]};
`;

const InfoView = styled.View`
  width: ${screen.width * 0.9}px;
`;

const SubTitle = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights.semibold};
`;

const Info = styled.Text`
  font-size: ${theme.fontSizes[2]};
`;

const CardImage = styled.Image`
  width: ${screen.width * 0.9}px;
  height: ${screen.width * 0.64 * 0.9}px;
`;

const Btn = styled.TouchableOpacity``;

const BtnImage = styled.Image`
  width: ${screen.width * 0.9}px;
  height: ${screen.width * 0.14 * 0.9}px;
  border-radius: 10px;
`;

export {
  Body,
  Btn,
  BtnImage,
  CardImage,
  Info,
  InfoView,
  SubTitle,
  Title,
  TitleView,
  Wrapper,
};
