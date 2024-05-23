import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const BirthView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.space[3]};
`;

const BirthText = styled.Text`
  flex: 1;
  background: ${theme.colors.lightergray};
  border-radius: ${theme.radii.circle};
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights.semibold};
  text-align: center;
  padding: ${theme.space[1]};
`;

const IconView = styled.TouchableOpacity``;

export {BirthText, BirthView, IconView};
