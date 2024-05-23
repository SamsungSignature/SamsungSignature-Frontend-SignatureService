import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';
import InputWithRef from '../../common/InputWithRef';

interface ResidentBackStyleProps {
  $style?: {
    titleColor?: string;
  };
  $isValue?: boolean;
}

const Wrapper = styled.Pressable`
  width: 100%;
  margin-top: ${theme.space[3]};
`;

const InputView = styled.View<ResidentBackStyleProps>`
  position: relative;
  height: fit-content;
  flex-direction: row;
  border-color: ${({$style}) => $style?.titleColor};
  border-bottom-width: 1px;
  margin-bottom: ${theme.space[1]};
  align-items: center;
`;

const Input = styled(InputWithRef)<ResidentBackStyleProps>`
  width: 2px;
  margin-right: ${({$isValue}) => ($isValue ? '14px' : '0px')};
  padding: 2px 0;
`;

const Dots = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 9px 0;
  justify-content: space-between;
  margin-left: 8px;
`;

const Dot = styled.View<ResidentBackStyleProps>`
  position: ${({$isValue}) => ($isValue ? 'absolute' : 'static')};
  width: 14px;
  height: 14px;
  border-radius: ${theme.radii.circle};
  background: ${({$isValue}) =>
    $isValue ? theme.colors.lightgray : theme.colors.darkgray};
`;

export {Dot, Dots, Input, InputView, Wrapper};
