import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Content = styled.View`
  background: ${theme.colors.white};
  border-radius: ${theme.radii.large};
  padding: ${theme.space[4]};
  gap: ${theme.space[3]};
`;

const ButtonView = styled.View`
  margin: ${theme.space[3]} ${theme.space[4]};
`;

export {ButtonView, Content, Wrapper};
