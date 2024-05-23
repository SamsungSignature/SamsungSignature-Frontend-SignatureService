import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const screen = Dimensions.get('screen');

const Wrapper = styled.View`
  background: ${theme.colors.background};
  border-radius: 24px;
  padding: ${theme.space[3]};
  gap: ${theme.space[3]};
  margin: ${theme.space[3]} 0;
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights.medium};
`;

const ContentView = styled.View`
  gap: ${theme.space[2]};
`;

const SubView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SubTitle = styled.Text``;

const SubContent = styled.Text`
  color: ${theme.colors.black};
`;

const ItemImage = styled.Image`
  width: 100%;
  height: ${screen.width * 0.7}px;
  border-radius: 24px;
  background-color: ${theme.colors.lightergray};
`;

export {ContentView, ItemImage, SubContent, SubTitle, SubView, Title, Wrapper};
