import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const Wrapper = styled.ScrollView`
  flex: 1;
  background: ${theme.colors.white};
`;

const TitleView = styled.View`
  align-items: center;
  gap: ${theme.space[3]};
  padding-top: ${theme.space[3]};
  padding-bottom: ${theme.space[4]};
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights.semibold};
  text-align: center;
`;

export {Title, TitleView, Wrapper};
