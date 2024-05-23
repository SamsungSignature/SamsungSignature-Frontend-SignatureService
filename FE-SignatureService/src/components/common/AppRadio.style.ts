import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import {AppRadioStyle} from './AppRadio';
import ScaleUpView from './ScaleUpView';

interface AppRadioStyleProps {
  $style?: AppRadioStyle;
}

const Wrapper = styled.View`
  gap: ${theme.space[2]};
`;

const Title = styled.Text<AppRadioStyleProps>`
  color: ${({$style}) => $style?.titleColor};
`;

const ItemsView = styled.View``;

const ItemRow = styled.View`
  flex-direction: row;
`;

const ItemView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ItemRadioView = styled.Pressable`
  padding: ${theme.space[2]};
  border-radius: ${theme.radii.circle};
`;

const Radio = styled.View<{$selected: boolean}>`
  width: 22px;
  height: 22px;
  border-radius: ${theme.radii.circle};
  border-width: ${({$selected}) => ($selected ? '2px' : '1px')};
  border-color: ${({$selected}) =>
    $selected ? theme.colors.googleblue : theme.colors.darkgray};
  align-items: center;
  justify-content: center;
`;

const RadioInner = styled(ScaleUpView)`
  width: 12px;
  height: 12px;
  background: ${theme.colors.googleblue};
  border-radius: ${theme.radii.circle};
  transform: scale(1);
`;

const ItemText = styled.Text`
  color: ${theme.colors.darkgray};
  font-size: ${theme.fontSizes[2]};
`;

export {
  ItemRadioView,
  ItemRow,
  ItemText,
  ItemView,
  ItemsView,
  Radio,
  RadioInner,
  Title,
  Wrapper,
};
