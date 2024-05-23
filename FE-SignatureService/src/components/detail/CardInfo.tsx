import dayjs from 'dayjs';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import AppHr from '../common/AppHr';
import {Card} from '../main/Cards';

const Wrapper = styled.View`
  background: white;
  border-radius: 0 0 24px 24px;
  padding: ${theme.space[3]} 0;
  gap: ${theme.space[2]};
`;

const Row = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  flex: 1;
  text-align: center;
  color: ${theme.colors.darkgray};
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights.medium};
`;

const Info = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${theme.fontSizes[3]};
`;

interface CardInfoProps {
  card: Card;
}

const CardInfo = ({card}: CardInfoProps) => {
  const {card_owner, expired_in} = card;
  const expireFromNow = dayjs(expired_in).fromNow();

  return (
    <Wrapper>
      <Row>
        <Title>카드 소유자</Title>
        <Title>만료시간</Title>
      </Row>
      <AppHr />
      <Row>
        <Info>{card_owner ?? '김태규'}</Info>
        <Info>{expireFromNow}</Info>
      </Row>
    </Wrapper>
  );
};

export default CardInfo;
