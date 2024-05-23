import {NavigationProp, useNavigation} from '@react-navigation/native';
import useCards from '../../hooks/useCards';
import {RootStackParams} from '../../routes/RootNavigator';
import {Title, Wrapper} from './Common.stlye';

interface Card {
  id: number;
  nickname: string;
  company: string;
  card_img: string;
  expired_in: number;
  card_owner: string;
  signature_detail_card_id: number;
  signature_detail_id: number;
}

interface CardsProps {
  cards: Card[];
}

const Cards = ({cards}: CardsProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const handleNavigation = () => {
    navigation.navigate('CardDetail', {card});
  };

  const [card, CardContainer] = useCards(cards, handleNavigation);

  return (
    <Wrapper>
      <Title>사용하고 싶은 카드를 선택해주세요</Title>
      <CardContainer />
    </Wrapper>
  );
};

export type {Card};
export default Cards;
