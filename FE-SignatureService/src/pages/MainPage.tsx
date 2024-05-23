import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components/native';
import useGetDelegatedCards from '../api/delegated/useGetDelegatedCards';
import {theme} from '../assets/styles/theme';
import Cards from '../components/main/Cards';
import Error from '../components/main/Error';
import Loading from '../components/main/Loading';
import Menus, {Menu} from '../components/main/Menus';
import NoCards from '../components/main/NoCards';
import useSseReceiver from '../components/push/useSseReceiver';
import {useAppDispatch, useAppSelector} from '../stores/hooks';
import {setCards} from '../stores/slices/card';
import {RootState} from '../stores/store';

const Wrapper = styled.View`
  flex: 1;
  background: ${theme.colors.lightbackground};
`;

const MainPage = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state: RootState) => state.card.cards);

  // 카드 목록 불러오기
  const getDelegatedCards = useGetDelegatedCards();
  const {isSuccess, isError, isLoading, data, refetch} = useQuery({
    queryKey: ['getCards'],
    queryFn: getDelegatedCards,
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCards(data.data.body.cards));
    }
  }, [isSuccess, data]);

  // sse 활성화
  const sseReceiver = useSseReceiver();
  useEffect(() => {
    sseReceiver();
  }, []);

  // 로그인 전 받은 Linking 처리
  useEffect(() => {
    // THIS IS THE MAIN POINT OF THIS ANSWER
    const navigateToInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        await Linking.openURL(initialUrl);
      }
    };
    navigateToInitialUrl();
  }, []);

  const menus: Menu[] = [
    {title: '결제 요청', icon: 'request', navigation: 'RequestPage'},
    {title: '카드 주기', icon: 'credit-card', navigation: 'GiveCardPage'},
    {
      title: ['요청/승인', '내역'],
      icon: 'history',
      navigation: 'HistoryTabNavigator',
    },
    {
      title: ['빌려준', '카드목록'],
      icon: 'wallet',
      navigation: 'GivenListPage',
    },
  ];

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error refetch={refetch} />
      ) : cards.length ? (
        <Cards cards={cards} />
      ) : (
        <NoCards />
      )}
      <Menus menus={menus} />
    </Wrapper>
  );
};

export default MainPage;
