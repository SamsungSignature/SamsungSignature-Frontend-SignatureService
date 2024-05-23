import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../assets/styles/theme';

const {colors, fontSizes} = theme;

export const AlertListView = styled.ScrollView`
  margin: 10px;
`;

export const StyledText = styled.Text`
  color: ${colors.black};
  font-size: ${fontSizes[2]};
`;

export const StyledText2 = styled.Text`
  color: ${colors.black};
  font-size: ${fontSizes[1]};
  margin-bottom: 3px;
`;

export const StyledListItem = styled(TouchableOpacity)`
  margin-bottom: 5px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  background-color: ${colors.lightGray};
`;
