import {GestureResponderEvent} from 'react-native';
import styled from 'styled-components/native';
import IconPath from '../../../assets/iconPath';
import {theme} from '../../../assets/styles/theme';

const IconView = styled.View`
  border-radius: ${theme.radii.circle};
  overflow: hidden;
`;

const IconButton = styled.Pressable`
  padding: 4px;
  border-radius: ${theme.radii.circle};
`;

interface AppHeaderRightIconProps {
  icon: string;
  onPress?: (event?: GestureResponderEvent) => void;
}

const AppHeaderRightIcon = ({icon, onPress}: AppHeaderRightIconProps) => {
  const onPressed = ({pressed}: {pressed: boolean}) => ({
    backgroundColor: pressed
      ? theme.colors.lightergray
      : theme.colors.transparent,
  });

  const Icon = IconPath[icon];

  return (
    <IconView>
      <IconButton
        onPress={onPress}
        style={onPressed}
        android_ripple={{color: theme.colors.lightgray}}>
        <Icon />
      </IconButton>
    </IconView>
  );
};

export default AppHeaderRightIcon;
