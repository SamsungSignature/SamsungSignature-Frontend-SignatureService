import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.Pressable`
  border-radius: ${theme.radii.circle};
  align-items: center;
  justify-content: center;
  padding: ${theme.space[1]};
`;

export {Wrapper};
