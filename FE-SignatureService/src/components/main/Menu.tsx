import {NavigationProp, useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import IconPath from '../../assets/iconPath';
import {theme} from '../../assets/styles/theme';
import {RootStackParams} from '../../routes/RootNavigator';
import {Menu as MenuType} from './Menus';

interface MunuProps {
  menu: MenuType;
}

const Wrapper = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 80px;
  background: ${theme.colors.white};
  border-radius: 10px;
`;

const TextView = styled.View`
  flex: 1;
`;

const MenuText = styled.Text`
  text-align: left;
  color: black;
  font-size: 18px;
  font-weight: bold;
  padding-right: 10px;
`;

const Menu = ({menu}: MunuProps) => {
  const Title =
    typeof menu.title === 'string' ? (
      <TextView>
        <MenuText>{menu.title}</MenuText>
      </TextView>
    ) : (
      <TextView>
        {menu.title.map((text, idx) => (
          <MenuText key={idx}>{text}</MenuText>
        ))}
      </TextView>
    );
  const Icon = IconPath[menu.icon];
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const onPress = () => {
    navigation.navigate(menu.navigation);
  };

  return (
    <Wrapper onPress={onPress}>
      {Title}
      <Icon width={30} height={30} />
    </Wrapper>
  );
};

export type {Menu};
export default Menu;
