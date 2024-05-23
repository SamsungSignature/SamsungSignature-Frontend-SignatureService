import React, {ReactNode} from 'react';
import parseWithDefault from '../../functions/parseWithDefault';
import {Content, Line, Wrapper} from './AppHr.style';

interface AppHrStyle {
  padding?: string;
  lineColor?: string;
  lineThickness?: string;
  color?: string;
  margin?: string;
}

interface AppHrProps {
  children?: ReactNode;
  style?: AppHrStyle;
}

const AppHr = ({children, style}: AppHrProps) => {
  const defaultStyle: AppHrStyle = {
    padding: '10px',
    lineColor: 'gray',
    lineThickness: '1px',
    color: 'gray',
    margin: '0 10px',
  };
  const parsedStyle = parseWithDefault(style, defaultStyle);

  return (
    <Wrapper $style={parsedStyle}>
      <Line $style={parsedStyle} />
      {children ? <Content $style={parsedStyle}>{children}</Content> : null}
      <Line $style={parsedStyle} />
    </Wrapper>
  );
};

export type {AppHrStyle};
export default AppHr;
