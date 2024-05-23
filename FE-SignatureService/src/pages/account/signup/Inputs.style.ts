import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

interface InputsStyleProps {
  $headerHeight?: number;
}

const Wrapper = styled.SafeAreaView<InputsStyleProps>`
  flex: 1;
  margin-top: ${({$headerHeight}) => `${$headerHeight}px`};
`;

const Info = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[2]};
  margin: ${theme.space[3]};
`;

export {Info, Wrapper};
