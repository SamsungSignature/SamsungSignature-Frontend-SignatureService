import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';
import {Option} from './Logo';

interface LogoStyleProps {
  $option?: Option;
}

const LogoText = styled.Text<LogoStyleProps>`
  color: ${theme.colors.black};
  font-size: ${({$option}) =>
    $option?.size === 'small' ? theme.fontSizes[3] : theme.fontSizes[4]};
  font-weight: ${theme.fontWeights.extrabold};
`;

export {LogoText};
