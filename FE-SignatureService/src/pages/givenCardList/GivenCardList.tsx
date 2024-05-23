import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useRef, useState} from 'react';
import {Animated, TouchableWithoutFeedback} from 'react-native';
import useGetGivenCardList from '../../api/given/useGetGivenCardList';
import imagePath from '../../assets/imagePath';
import MainCard from '../../assets/lotties/MainCard.json';
import Loading from '../../components/common/Loading';
import GivenCardDetail from '../../components/givenCard/GivenCardDetail';
import {RootStackParams} from '../../routes/RootNavigator';
import * as S from './GivenCardList.style';

const GivenCardList = () => {
  const [openCardNumber, setOpenCardNumber] = useState<number>(0);
  const getCardList = useGetGivenCardList();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const translateY = useRef(new Animated.Value(0)).current; // 애니메이션을 위한 변수

  const {isLoading: getCardListLoading, data: getCardListData} = useQuery({
    queryKey: ['get-given-cards'],
    queryFn: getCardList,
  });

  if (getCardListLoading) {
    return <Loading />;
  }

  const goToHistory = () => {
    navigation.navigate('HistoryTabNavigator');
  };

  const goToGiveCard = () => {
    navigation.navigate('GiveCardPage');
  };

  // 애니메이션 수정해야함
  const openCardDetail = (id: number) => {
    if (openCardNumber === id) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setOpenCardNumber(0);
      }, 500);
    } else {
      setOpenCardNumber(id);
      Animated.timing(translateY, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <S.Container>
      {(getCardListData?.given_card_list || []).length === 0 ? (
        <S.LottieWrapper>
          <S.HeaderText>빌려준 카드가 없어요</S.HeaderText>
          <S.LottieImage source={MainCard} autoPlay loop />
          <S.NaviView>
            <S.TouchButton onPress={() => goToHistory()}>
              <S.NaviText>요청 확인하러 가기</S.NaviText>
            </S.TouchButton>
            <S.TouchButton onPress={() => goToGiveCard()}>
              <S.NaviText>카드 빌려주기</S.NaviText>
            </S.TouchButton>
          </S.NaviView>
        </S.LottieWrapper>
      ) : (
        <S.ScrollWrapper>
          <S.CardContainer>
            {getCardListData?.given_card_list.map(card => (
              <S.CardWrapper key={card.card_id}>
                <TouchableWithoutFeedback
                  onPress={() => openCardDetail(card.card_id)}>
                  <S.CardImage source={imagePath[card.card_img]} />
                </TouchableWithoutFeedback>
                <Animated.View style={{transform: [{translateY}]}}>
                  {openCardNumber === card.card_id && (
                    <GivenCardDetail cardNum={card.card_id} />
                  )}
                </Animated.View>
              </S.CardWrapper>
            ))}
          </S.CardContainer>
        </S.ScrollWrapper>
      )}
    </S.Container>
  );
};

export default GivenCardList;
