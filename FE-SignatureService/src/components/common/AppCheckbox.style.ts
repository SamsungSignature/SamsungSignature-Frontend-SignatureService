import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import {AppCheckboxStyle} from './AppCheckbox';

interface AppCheckboxStyleProps {
  $style?: AppCheckboxStyle;
  $checked?: boolean;
}

const Wrapper = styled.Pressable<AppCheckboxStyleProps>`
  height: ${({$style}) => `${$style?.size}px`};
  aspect-ratio: 1/1;
  background: ${({$checked}) => ($checked ? theme.colors.googleblue : 'white')};
  border-width: ${({$checked}) => ($checked ? '0' : '1px')};
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radii.circle};
`;

export {Wrapper};
