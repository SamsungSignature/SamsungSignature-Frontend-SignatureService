import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.View`
  padding: ${theme.space[5]};
  gap: ${theme.space[4]};
  align-items: center;
`;

const Slogan = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[4]};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
`;

const Info = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights.semibold};
`;

export {Info, Slogan, Wrapper};
