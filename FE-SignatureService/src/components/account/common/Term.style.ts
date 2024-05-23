import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.View`
  width: 100%;
  position: relative;
  padding-left: ${theme.space[4]};
  padding-right: ${theme.space[3]};
  gap: ${theme.space[2]};
`;

const CheckboxView = styled.View`
  position: absolute;
  left: -${theme.space[4]};
`;

const TitleView = styled.View`
  width: 100%;
  justify-content: center;
`;

const Title = styled.Text<{$titleLink: boolean}>`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[2]};
  text-decoration: ${({$titleLink}) => ($titleLink ? 'underline' : 'none')};
`;

const Optional = styled.Text`
  color: ${theme.colors.gray};
`;

const ToDetail = styled.Text`
  color: ${theme.colors.black};
  font-weight: ${theme.fontWeights.medium};
  text-decoration: underline;
`;

export {CheckboxView, Optional, Title, TitleView, ToDetail, Wrapper};
