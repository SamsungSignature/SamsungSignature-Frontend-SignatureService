import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const DateView = styled.View`
  background-color: ${theme.colors.lightGray};
  margin-top: 2%;
`;

const DateText = styled.Text`
  font-family: ${theme.fonts.samsungB};
  font-size: ${theme.fontSizes[2]};
  color: ${theme.colors.gray};
  padding-left: 4%;
`;

type DateProps = {
  date: string;
};

const DateHeader = ({date}: DateProps) => {
  return (
    <DateView>
      <DateText>{date}</DateText>
    </DateView>
  );
};

export default DateHeader;
