import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import {AppButtonStyle} from './AppButton';

interface AppButtonStyleProps {
  $style: AppButtonStyle;
  $disabled?: boolean;
}

const Wrapper = styled.View<AppButtonStyleProps>`
  border-radius: ${({$style}) => $style.borderRadius};
  padding: ${({$style}) => $style.margin};
  overflow: hidden;
`;

const ButtonView = styled.TouchableOpacity<AppButtonStyleProps>`
  flex-direction: row;
  width: ${({$style}) => $style.width};
  background: ${({$style, $disabled}) =>
    $disabled ? theme.colors.lightgray : $style.backgroundColor};
  border-radius: ${({$style}) => $style.borderRadius};
  border-color: ${({$style}) => $style.borderColor};
  border-width: ${({$style}) => $style.borderWidth};
  padding: ${({$style}) => $style.padding};
  margin: ${({$style}) => $style.margin};
  align-items: center;
  align-self: center;
`;

const PressableView = styled.Pressable<AppButtonStyleProps>`
  flex-direction: row;
  width: ${({$style}) => $style.width};
  background: ${({$style, $disabled}) =>
    $disabled ? theme.colors.lightgray : $style.backgroundColor};
  border-radius: ${({$style}) => $style.borderRadius};
  border-color: ${({$style}) => $style.borderColor};
  border-width: ${({$style}) => $style.borderWidth};
  padding: ${({$style}) => $style.padding};
  align-items: center;
  align-self: center;
`;

const ButtonImageView = styled.View<AppButtonStyleProps>`
  background: white;
  border-radius: ${theme.radii.circle};
  padding: ${({$style}) => $style.imagePadding};
`;

const ButtonImage = styled.Image<AppButtonStyleProps>`
  height: ${({$style}) => $style.imageSize};
  width: ${({$style}) => $style.imageSize};
`;

const ButtonText = styled.Text<AppButtonStyleProps>`
  flex: 1;
  color: ${({$style}) => $style.color};
  font-size: ${({$style}) => $style.fontSize};
  font-weight: ${({$style}) => $style.fontWeight};
  text-align: ${({$style}) => $style.textAlign};
`;

export {
  ButtonImage,
  ButtonImageView,
  ButtonText,
  ButtonView,
  PressableView,
  Wrapper,
};
