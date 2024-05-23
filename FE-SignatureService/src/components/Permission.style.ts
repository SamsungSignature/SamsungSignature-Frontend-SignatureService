import styled from 'styled-components/native';
import {theme} from '../assets/styles/theme';

const Wrapper = styled.View`
  flex-direction: row;
  margin: ${theme.space[3]} 0;
  gap: ${theme.space[2]};
`;

const IconBox = styled.View`
  margin: ${theme.space[2]} 0;
`;

const TextBox = styled.View`
  flex: 1;
  gap: ${theme.space[1]};
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights.semibold};
`;

const Content = styled.Text`
  color: ${theme.colors.gray};
  font-size: ${theme.fontSizes[1]};
`;

export {Content, IconBox, TextBox, Title, Wrapper};
