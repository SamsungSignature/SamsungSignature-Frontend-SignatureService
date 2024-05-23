import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';

const Wrapper = styled.ScrollView`
  flex: 1;
  background: ${theme.colors.white};
  padding: 0 ${theme.space[4]};
`;

const Container = styled.View`
  gap: ${theme.space[3]};
  padding: ${theme.space[3]} 0;
`;

const Info = styled.Text``;

export {Container, Info, Wrapper};
