import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

interface HistoryContentsStyleProps {
  $isLine?: boolean;
}

export const ContentsBox = styled.View<HistoryContentsStyleProps>`
  margin: 0 2%;
  padding: 5% 0;
  border-style: solid;
  border-bottom-width: ${({$isLine}) => ($isLine ? '1px' : '0px')};
  /* padding-bottom: 3%; */
  border-color: ${theme.colors.lightGray};
`;

export const Name = styled.Text`
  font-family: ${theme.fonts.samsungB};
  font-size: ${theme.fontSizes[2]};
  color: ${theme.colors.black};
`;

export const NameTail = styled.Text`
  font-family: ${theme.fonts.samsungR};
  font-size: ${theme.fontSizes[2]};
  color: ${theme.colors.black};
`;

export const NameWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const ContentsView = styled.View`
  padding: 0 4%;
  margin-bottom: 2%;
  flex-direction: row;
  justify-content: space-between;
`;

export const StatusWrapper = styled.View`
  justify-content: flex-end;
  margin-left: 10%;
`;
