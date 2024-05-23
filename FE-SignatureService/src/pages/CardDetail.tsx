import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Alert, Dimensions, Linking, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import usePostPayCard, {
  PostPayCardPathParams,
} from '../api/payment/usePostPayCard';
import useGetSignatureCardId from '../api/signature/useGetSignatureCardId';
import imagePath from '../assets/imagePath';
import {theme} from '../assets/styles/theme';
import Buttons from '../components/approve/Buttons';
import Loading from '../components/common/Loading';
import CardInfo from '../components/detail/CardInfo';
import encodeData from '../functions/encodeData';
import {RootStackParams} from '../routes/RootNavigator';

const Wrapper = styled.View`
  flex: 1;
  background: ${theme.colors.lightbackground};
`;

const screen = Dimensions.get('screen');

const CardView = styled.View`
  flex: 1;
  padding: 0 ${screen.width * 0.09}px;
  padding-top: 64px;
`;

const CardImage = styled.Image`
  width: ${screen.width * 0.82}px;
  height: ${screen.width * 0.52}px;
  align-self: center;
  background: white;
  border-radius: 10px 10px 0 0;
`;

const CardDetail = () => {
  const {card} = useRoute<RouteProp<RootStackParams, 'CardDetail'>>().params;
  const {signature_detail_card_id} = card;

  // 월렛 카드 아이디
  const getSignatureCardId = useGetSignatureCardId();
  const {isLoading, isError, data} = useQuery({
    queryKey: ['getSignatureCardId'],
    queryFn: getSignatureCardId,
  });

  // 네비게이션
  const postPayCard = usePostPayCard();
  const pathParams: PostPayCardPathParams = {
    signature_detail_card_id,
  };
  const {mutate} = useMutation({
    mutationKey: ['postPayCard'],
    mutationFn: () => postPayCard(pathParams),
    onSuccess: async () => {
      const linkData = {
        origin: 'signature',
        route: 'main',
        originData: {},
      };
      const encodedData = encodeData(linkData);
      const linkCard = {
        card_company: 'SIGNATURE',
        card_id: data?.data.body.signature_card_id,
        card_img: 'signaturecard',
        card_name: '*** 님의 SIGNATURE 카드',
      };
      const encodedCard = encodeData(linkCard);
      await Linking.openURL(
        `fakewallet://wallet/payment?data=${encodedData}&card=${encodedCard}`,
      );
    },
    onError: err => {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    },
  });
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const handleNavigate = (props: 'left' | 'right' | 'center') => {
    if (props === 'left') {
      navigation.goBack();
    } else if (props === 'right') {
      mutate();
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    Alert.alert('카드 정보 불러오기 실패', '', [
      {text: '돌아가기', onPress: () => navigation.navigate('MainPage')},
    ]);
    return <></>;
  }

  return (
    <Wrapper>
      <CardView>
        <CardImage source={imagePath[card.card_img]} resizeMode="contain" />
        <CardInfo card={card} />
      </CardView>
      <Buttons onPress={handleNavigate} text1="취소" text2="결제하기" />
    </Wrapper>
  );
};

export default CardDetail;
