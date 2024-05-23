import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {AppInputBorderStyle} from './AppInputBorder';

interface AppInputBorderStyleProps {
  $style: AppInputBorderStyle;
  $left: boolean;
}

const Wrapper = styled.View`
  position: absolute;
  bottom: -1px;
  flex-direction: row;
  height: 2px;
  width: 100%;
`;

const InputBorderContainer = styled.View`
  width: 50%;
  height: 100%;
  overflow: hidden;
`;

const InputBorder = styled(Animated.View)<AppInputBorderStyleProps>`
  width: 100%;
  height: 100%;
  background: ${({$style}) => $style?.focusColor};
  transform: ${({$left}) =>
    $left ? 'translateX(180px)' : 'translateX(-180px)'};
`;

export {InputBorder, InputBorderContainer, Wrapper};
