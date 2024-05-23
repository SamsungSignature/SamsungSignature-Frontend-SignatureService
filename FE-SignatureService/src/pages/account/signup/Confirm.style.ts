import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.View`
  flex: 1;
`;

const TitleView = styled.View`
  align-items: center;
  padding: ${theme.space[4]};
  gap: ${theme.space[3]};
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights.semibold};
`;

const Info = styled.Text`
  color: ${theme.colors.gray};
  font-size: ${theme.fontSizes[3]};
  text-align: center;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
`;

const EmailView = styled.View`
  width: 100%;
  background: ${theme.colors.white};
  border-radius: ${theme.radii.large};
  padding: ${theme.space[4]};
  align-items: center;
`;

const EmailText = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[3]};
  margin-bottom: ${theme.space[4]};
`;

const LinkView = styled.View`
  width: 100%;
  align-items: center;
  padding: ${theme.space[4]};
  gap: ${theme.space[1]};
`;

const LinkText = styled.Text`
  text-decoration: underline;
  font-size: ${theme.fontSizes[2]};
`;

export {
  Content,
  EmailText,
  EmailView,
  Info,
  LinkText,
  LinkView,
  Title,
  TitleView,
  Wrapper,
};
