import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InputView = styled.View`
  flex: 1;
`;

const Hyphen = styled.View`
  height: 2px;
  width: 8px;
  background: ${theme.colors.black};
  border-radius: ${theme.radii.circle};
  margin: ${theme.space[3]};
  margin-top: ${theme.space[4]};
`;

export {Hyphen, InputView, Wrapper};
