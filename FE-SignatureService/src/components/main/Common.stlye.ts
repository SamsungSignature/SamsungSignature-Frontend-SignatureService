import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const Wrapper = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
  gap: ${theme.space[2]};
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[3]};
  font-family: ${theme.fonts.samsungB};
`;

const Info = styled.Text`
  color: ${theme.colors.darkgray};
  font-size: ${theme.fontSizes[2]};
  font-family: ${theme.fonts.samsungR};
`;

export {Info, Title, Wrapper};
