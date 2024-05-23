import styled from 'styled-components/native';
import {AppHrStyle} from './AppHr';

interface AppHrStyleProps {
  $style: AppHrStyle;
}

const Wrapper = styled.View<AppHrStyleProps>`
  flex-direction: row;
  align-items: center;
  padding: ${({$style}) => $style.padding};
`;

const Line = styled.View<AppHrStyleProps>`
  flex: 1;
  background: ${({$style}) => $style.lineColor};
  height: ${({$style}) => $style.lineThickness};
`;

const Content = styled.Text<AppHrStyleProps>`
  color: ${({$style}) => $style.color};
  margin: ${({$style}) => $style.margin};
`;

export {Content, Line, Wrapper};
