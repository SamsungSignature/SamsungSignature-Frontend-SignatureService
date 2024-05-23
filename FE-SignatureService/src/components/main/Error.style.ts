import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const screen = Dimensions.get('screen');

const ReloadView = styled.View`
  width: ${screen.width}px;
  height: ${screen.width * 0.6}px;
`;

const ReloadSkeleton = styled.View`
  top: 7%;
  width: 82%;
  height: 90%;
  align-self: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${theme.colors.lightergray};
  align-items: center;
  justify-content: center;
`;

const ReloadButton = styled.Pressable`
  background: ${theme.colors.samsungblue};
  padding: 4px 16px;
  border-radius: 8px;
`;

const ReloadText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes[0]};
`;

export {ReloadButton, ReloadSkeleton, ReloadText, ReloadView};
