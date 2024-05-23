import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';
import {HeaderStyle} from './AppHeader';

interface AppHeaderStyleProps {
  $headerStyle?: HeaderStyle;
  $isLeft?: boolean;
}

const screen = Dimensions.get('screen');

const Wrapper = styled.View<AppHeaderStyleProps>`
  flex-direction: row;
  width: ${screen.width}px;
  height: ${({$headerStyle}) =>
    $headerStyle?.height
      ? `${(screen.height * $headerStyle.height) / 100}px`
      : `${screen.height * 0.11}px`};
  padding: 0 8px;
  background: ${({$headerStyle}) =>
    $headerStyle?.backgroundColor
      ? $headerStyle.backgroundColor
      : theme.colors.lightbackground};
  align-items: center;
`;

const LeftView = styled.View``;

const TitleView = styled.View`
  flex: 1;
`;

const RightView = styled.View``;

const Title = styled.Text<AppHeaderStyleProps>`
  color: black;
  font-size: 20px;
  font-weight: 700;
  margin-left: ${({$isLeft}) => ($isLeft ? '0px' : '18px')};
`;

export {LeftView, RightView, Title, TitleView, Wrapper};
