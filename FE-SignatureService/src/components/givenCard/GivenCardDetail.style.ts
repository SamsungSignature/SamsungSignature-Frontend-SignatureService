import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

export const Container = styled.View`
  position: relative;
  top: -100px;
  background-color: ${theme.colors.white};
  /* padding: 45px 10px 0px 10px; */
  padding: 0px 10px 0px 10px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;
`;

export const BorderWrapper = styled(Wrapper)`
  border-bottom-width: 1px;
  border-color: ${theme.colors.lightGray};
`;

export const HeaderWrapper = styled(BorderWrapper)`
  justify-content: space-around;
  padding: 15px 0px;
`;

export const TextContent = styled.Text`
  font-family: ${theme.fonts.samsungR};
  font-size: ${theme.fontSizes[2]};
  color: ${theme.colors.black};
`;

export const UserWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

export const AuthorWrapper = styled(UserWrapper)`
  gap: 15px;
`;

export const ImageBox = styled.Image`
  width: 32px;
  height: 32px;
`;
