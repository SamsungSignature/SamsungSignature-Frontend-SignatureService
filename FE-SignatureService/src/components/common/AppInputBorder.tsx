import React from 'react';
import {Animated} from 'react-native';
import {
  InputBorder,
  InputBorderContainer,
  Wrapper,
} from './AppInputBorder.style';

interface AppInputBorderStyle {
  focusColor?: string;
}

interface AppInputBorderProps {
  left: Animated.Value;
  right: Animated.Value;
  style: AppInputBorderStyle;
}

const AppInputBorder = ({left, right, style}: AppInputBorderProps) => {
  return (
    <Wrapper>
      <InputBorderContainer>
        <InputBorder
          $style={style}
          $left
          style={{transform: [{translateX: left}]}}
        />
      </InputBorderContainer>
      <InputBorderContainer>
        <InputBorder
          $style={style}
          $left={false}
          style={{transform: [{translateX: right}]}}
        />
      </InputBorderContainer>
    </Wrapper>
  );
};

export type {AppInputBorderStyle};
export default AppInputBorder;
