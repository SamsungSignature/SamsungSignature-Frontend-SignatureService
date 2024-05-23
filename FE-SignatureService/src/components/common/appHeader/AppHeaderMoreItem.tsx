import {Dispatch, SetStateAction} from 'react';
import styled from 'styled-components/native';
import {theme} from '../../../assets/styles/theme';
import {MoreItem} from './AppHeaderMore';

const Wrapper = styled.Pressable`
  padding: 14px 24px;
`;

const Title = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights.medium};
`;

interface AppHeaderMoreItemProps {
  item: MoreItem;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

const AppHeaderMoreItem = ({item, setToggle}: AppHeaderMoreItemProps) => {
  const {title, onPress} = item;
  const onPressed = ({pressed}: {pressed: boolean}) => ({
    backgroundColor: pressed
      ? theme.colors.lightergray
      : theme.colors.transparent,
  });
  const handlePress = () => {
    setToggle(false);
    onPress();
  };

  return (
    <Wrapper
      onPress={handlePress}
      style={onPressed}
      android_ripple={{color: theme.colors.lightgray}}>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default AppHeaderMoreItem;
