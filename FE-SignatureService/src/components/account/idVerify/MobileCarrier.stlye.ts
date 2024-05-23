import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.View`
  gap: ${theme.space[3]};
`;

const BudgetLink = styled.Text`
  color: ${theme.colors.googleblue};
  text-decoration: underline;
`;

export {BudgetLink, Wrapper};
