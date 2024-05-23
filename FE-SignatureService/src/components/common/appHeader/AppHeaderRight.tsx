import {GestureResponderEvent} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';
import AppHeaderMore, {MoreItem} from './AppHeaderMore';
import AppHeaderRightIcon from './AppHeaderRightIcon';

const Wrapper = styled.View`
  flex-direction: row;
  gap: ${theme.space[1]};
`;

interface AppHeaderRightOptions {
  search?: (event?: GestureResponderEvent) => void;
  add?: (event?: GestureResponderEvent) => void;
  noti?: (event?: GestureResponderEvent) => void;
  more?: MoreItem[];
}

const AppHeaderRight = (option: AppHeaderRightOptions) => {
  const {search, add, noti, more} = option;
  return (
    <Wrapper>
      {search && <AppHeaderRightIcon icon={'search'} onPress={search} />}
      {noti && <AppHeaderRightIcon icon={'bell'} onPress={noti} />}
      {add && <AppHeaderRightIcon icon={'plus'} onPress={add} />}
      {more && <AppHeaderMore icon={'more'} items={more} />}
    </Wrapper>
  );
};

export default AppHeaderRight;
