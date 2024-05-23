import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Content = styled.ScrollView`
  flex: 1;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${theme.colors.lightergray};
`;

const Title = styled.Text`
  color: ${theme.colors.black};
`;

const TermsView = styled.View`
  gap: ${theme.space[3]};
`;

const AgreeView = styled.View`
  width: 100%;
  position: relative;
  margin: ${theme.space[3]};
  padding-left: ${theme.space[4]};
  padding-right: ${theme.space[3]};
`;

const CheckboxView = styled.View`
  position: absolute;
  left: 0;
  height: 100%;
  justify-content: center;
`;

const AgreeText = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[2]};
`;

export {AgreeText, AgreeView, CheckboxView, Content, TermsView, Title};
