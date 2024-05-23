import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const screen = Dimensions.get('screen');

const Wrapper = styled.View`
  position: relative;
`;

const IconView = styled.View`
  border-radius: ${theme.radii.circle};
  overflow: hidden;
`;

const IconButton = styled.Pressable`
  padding: 4px;
  border-radius: ${theme.radii.circle};
`;

const ToggleView = styled.View`
  position: absolute;
  z-index: 1;
  top: -8px;
  right: 0;
  min-width: 170px;
  border-color: ${theme.colors.black};
  border-radius: ${theme.radii.large};
  background-color: ${theme.colors.background};
  overflow: hidden;
`;

const Backdrop = styled.Pressable`
  position: absolute;
  z-index: 0;
  left: -${screen.width}px;
  top: -${screen.height}px;
  width: ${screen.width * 3}px;
  height: ${screen.height * 3}px;
`;

export {Backdrop, IconButton, IconView, ToggleView, Wrapper};
