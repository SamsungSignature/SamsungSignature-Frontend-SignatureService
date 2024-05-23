import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import {AppInputStyle} from './AppInput';
import InputWithRef from './InputWithRef';

interface AppInputStyleProps {
  $style?: AppInputStyle;
  $isFocus?: boolean;
  $left?: boolean;
  $type?: 'hoverUp';
  $isValue?: boolean;
}

const Wrapper = styled.View<AppInputStyleProps>`
  width: 100%;
  position: ${({$type}) => $type === 'hoverUp' && 'relative'};
  margin-top: ${({$type}) => $type === 'hoverUp' && theme.space[3]};
`;

const TitleView = styled(Animated.View)<AppInputStyleProps>`
  position: ${({$type}) => $type === 'hoverUp' && 'absolute'};
  left: ${({$type}) => $type === 'hoverUp' && '0'};
  top: ${({$type}) => $type === 'hoverUp' && '4.8px'};
  transform: translateY(0);
`;

const Title = styled(Animated.Text)<AppInputStyleProps>`
  font-size: ${({$type, $isFocus, $isValue}) =>
    $type === 'hoverUp'
      ? !$isFocus && !$isValue
        ? theme.fontSizes[2]
        : theme.fontSizes[0]
      : theme.fontSizes[1]};
  color: ${({$style, $isFocus}) =>
    $isFocus ? $style?.focusColor : $style?.titleColor};
  font-weight: ${({$style}) => $style?.titleWeight};
`;

const InputView = styled.View<AppInputStyleProps>`
  position: relative;
  height: fit-content;
  flex-direction: row;
  border-color: ${({$style}) => $style?.titleColor};
  border-bottom-width: 1px;
  margin-bottom: ${theme.space[1]};
  justify-content: center;
`;

const Input = styled(InputWithRef)<AppInputStyleProps>`
  flex: 1;
  color: ${({$style}) => $style?.color};
  font-size: ${({$style}) => $style?.fontSize};
  padding: ${({$style}) => $style?.padding};
`;

const InputIcon = styled.Pressable`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  aspect-ratio: 1/1;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radii.circle};
`;

export {Input, InputIcon, InputView, Title, TitleView, Wrapper};
