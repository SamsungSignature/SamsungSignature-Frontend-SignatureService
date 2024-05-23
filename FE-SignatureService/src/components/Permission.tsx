import IconPath from '../assets/iconPath';
import {Permission as PermissionType} from '../constants/permissions';
import {Content, IconBox, TextBox, Title, Wrapper} from './Permission.style';

interface PermissionProps {
  permission: PermissionType;
}

const Permission = ({permission}: PermissionProps) => {
  const Icon = IconPath[permission.icon];

  return (
    <Wrapper>
      <IconBox>
        <Icon />
      </IconBox>
      <TextBox>
        <Title>{permission.title}</Title>
        <Content>{permission.content}</Content>
      </TextBox>
    </Wrapper>
  );
};

export default Permission;
