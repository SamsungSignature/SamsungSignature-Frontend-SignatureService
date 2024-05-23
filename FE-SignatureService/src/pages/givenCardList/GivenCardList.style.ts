import LottieView from 'lottie-react-native';
import {Dimensions, Platform} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const windowWidth = Dimensions.get('window').width;
const lottieSize = windowWidth * 0.75;
const cardWidth = windowWidth * 0.8;
const cardHeight = cardWidth * 0.6;

export const Container = styled.View`
  background-color: ${theme.colors.white};
  flex-grow: 1;
  align-items: center;
`;

export const ScrollWrapper = styled.ScrollView`
  width: 100%;
`;

export const CardContainer = styled.View`
  align-items: center;
`;

export const LottieWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const LottieImage = styled(LottieView)`
  width: ${lottieSize}px;
  height: ${lottieSize}px;
`;

export const HeaderText = styled.Text`
  font-family: ${theme.fonts.samsungB};
  font-size: ${theme.fontSizes[3]};
  color: ${theme.colors.black};
`;

export const NaviView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

export const NaviText = styled.Text`
  font-family: ${theme.fonts.samsungR};
  font-size: ${theme.fontSizes[3]};
  color: ${theme.colors.black};
`;

export const TouchButton = styled.TouchableOpacity`
  background-color: ${theme.colors.background};
  padding: 10px 20px;
  border-radius: 15px;
  ${Platform.select({
    android: 'elevation: 0.01;',
  })}
`;

export const CardImage = styled.Image`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  z-index: 2;
`;

export const CardWrapper = styled.View`
  margin-top: 10%;
`;
