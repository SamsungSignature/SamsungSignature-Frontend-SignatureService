import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.View`
  background: ${theme.colors.white};
  flex: 1;
  align-items: center;
  gap: ${theme.space[3]};
  padding: ${theme.space[4]};
`;

const PhoneNums = styled.Text`
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights.medium};
`;

const InputView = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-around;
`;

export {InputView, PhoneNums, Wrapper};
