import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import useGetSignature from '../api/signature/useGetSignature';
import usePostSignatureCard, {
  PostSignatureCardRequestData,
} from '../api/signature/usePostSignatureCard';
import imagePath from '../assets/imagePath';
import Loading from '../components/common/Loading';
import {RootStackParams} from '../routes/RootNavigator';
import * as S from './AddToWallet.style';

const AddToWallet = () => {
  const postSignatureCard = usePostSignatureCard();
  const requestData: PostSignatureCardRequestData = {
    card_img: 'signaturecard',
  };
  const {mutate} = useMutation({
    mutationKey: ['postSignature'],
    mutationFn: () => postSignatureCard(requestData),
    onSuccess: () => navigation.reset({index: 0, routes: [{name: 'MainPage'}]}),
    onError: err => {
      Alert.alert('카드 등록 실패', err.message);
    },
  });
  const addToWallet = () => {
    mutate();
  };

  // 시그니쳐 카드 등록 유무 확인
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const getSignature = useGetSignature();
  const {isError, isLoading, isSuccess, data} = useQuery({
    queryKey: ['getSignature'],
    queryFn: getSignature,
  });
  useEffect(() => {
    if (isSuccess && data.data.body.is_exists_signature_card) {
      navigation.reset({index: 0, routes: [{name: 'MainPage'}]});
    }
    if (isError) {
      Alert.alert('앱 카드 등록 정보 불러오기 실패', '앱을 재실행시켜주세요.', [
        {text: '확인', onPress: () => RNExitApp.exitApp()},
      ]);
    }
  }, [isError, isSuccess, data?.data.body.is_exists_signature_card]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Wrapper>
      <S.TitleView>
        <S.Title>SAMSUNG Wallet에</S.Title>
        <S.Title>앱 카드를 등록해주세요</S.Title>
      </S.TitleView>
      <S.Body>
        <S.InfoView>
          <S.SubTitle>앱 카드를 등록해주세요</S.SubTitle>
          <S.Info>앱 카드를 등록하지 않으면 시그니처 이용이 제한됩니다.</S.Info>
        </S.InfoView>
        <S.CardImage source={imagePath.signaturecard} resizeMode="contain" />
        <S.Btn onPress={addToWallet}>
          <S.BtnImage source={imagePath.addtowalletbtn} resizeMode="contain" />
        </S.Btn>
      </S.Body>
    </S.Wrapper>
  );
};

export default AddToWallet;
