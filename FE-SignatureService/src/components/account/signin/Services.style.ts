import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const ServicesText = styled.Text`
  width: 100%;
  font-size: ${theme.fontSizes[2]};
`;

const ServicesLink = styled.Text`
  text-decoration: underline;
`;

export {ServicesLink, ServicesText};
