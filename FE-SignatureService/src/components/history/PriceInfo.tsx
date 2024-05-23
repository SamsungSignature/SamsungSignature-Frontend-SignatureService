import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const PriceView = styled.View`
  padding: 0 4%;
  flex-direction: row;
  justify-content: space-between;
`;

const PriceText = styled.Text`
  font-size: ${theme.fontSizes[2]};
  color: ${theme.colors.gray};
`;

type PriceProps = {
  price: number;
};

const PriceInfo = ({price}: PriceProps) => {
  return (
    <PriceView>
      <PriceText>요청금액</PriceText>
      <PriceText>{price.toLocaleString('ko-KR')}원</PriceText>
    </PriceView>
  );
};

export default PriceInfo;
