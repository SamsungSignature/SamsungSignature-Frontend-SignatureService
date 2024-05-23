import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import groupByRow from '../../functions/groupByRow';
import Menu from './Menu';

interface Menu {
  title: string | string[];
  icon: string;
  navigation: string;
}

interface MunusProps {
  menus: Menu[];
}

const Wrapper = styled.View`
  flex: 1;
  padding: ${theme.space[3]};
  gap: ${theme.space[3]};
  margin-bottom: 10%;
`;

const Row = styled.View`
  flex-direction: row;
  gap: ${theme.space[3]};
`;

const Menus = ({menus}: MunusProps) => {
  const groupedMenu = groupByRow(menus, 2);

  return (
    <Wrapper>
      {groupedMenu.map((row, idx) => (
        <Row key={idx}>
          {row.map((menu, index) => (
            <Menu key={index} menu={menu} />
          ))}
        </Row>
      ))}
    </Wrapper>
  );
};

export type {Menu};
export default Menus;
