import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.View`
  margin-top: ${theme.space[4]};
`;

const TermsView = styled.View`
  gap: ${theme.space[2]};
  padding-bottom: ${theme.space[4]};
  border-color: ${theme.colors.lightgray};
  border-style: dotted;
  border-bottom-width: 2px;
`;

const AllCheckView = styled.View`
  flex-direction: row;
  margin-left: ${theme.space[4]};
  padding: ${theme.space[3]} 0;
  align-items: center;
  margin-bottom: ${theme.space[3]};
`;

const AllCheckText = styled.Text`
  color: ${theme.colors.darkgray};
`;

export {AllCheckText, AllCheckView, TermsView, Wrapper};
