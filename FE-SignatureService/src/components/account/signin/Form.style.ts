import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const RememberView = styled.View`
  width: 100%;
  flex-direction: row;
  gap: ${theme.space[2]};
`;

const RememberText = styled.Text`
  flex: 1;
  font-size: ${theme.fontSizes[2]};
`;

const ButtonView = styled.View`
  padding: 0 ${theme.space[3]};
`;

export {ButtonView, RememberText, RememberView};
