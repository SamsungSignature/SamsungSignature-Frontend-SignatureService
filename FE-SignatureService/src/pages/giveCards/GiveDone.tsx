import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {useEffect} from 'react';
import useLongTerm, {
  LongTermRequestData,
} from '../../api/delegated/useLongTerm';
import Error from '../../assets/lotties/Error.json';
import GiveCard from '../../assets/lotties/GiveCard.json';
import Buttons from '../../components/approve/Buttons';
import decodeData from '../../functions/decodeData';
import {RootStackParams} from '../../routes/RootNavigator';
import * as S from '../requestPayment/RequestDone.style';

const GiveDone = () => {
  const {data, originData} =
    useRoute<RouteProp<RootStackParams, 'GiveDone'>>().params;
  const {card_id} = decodeData<WalletCard>(data);
  const {to_ids, limit_amount, limit_date} =
    decodeData<Omit<LongTermRequestData, 'card_id'>>(originData);

  const longTerm = useLongTerm();
  const requestData: LongTermRequestData = {
    card_id,
    to_ids,
    limit_amount,
    limit_date,
  };
  const {mutate, isError} = useMutation({
    mutationKey: ['LongTerm'],
    mutationFn: longTerm,
  });

  useEffect(() => {
    longTerm(requestData);
  }, []);

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const handlePress = (props: 'left' | 'right' | 'center') => {
    if (props === 'center' || props === 'right') {
      navigation.reset({index: 0, routes: [{name: 'MainPage'}]});
    } else if (props === 'left') {
      mutate(requestData);
    }
  };

  return (
    <S.Wrpper>
      <S.CompleteView>
        <S.TextArea>
          <S.BoldText>
            {isError ? '카드 전달 실패!' : '카드 전달이 완료되었습니다'}
          </S.BoldText>
          <S.NormalText>
            {!isError
              ? '재시도를 눌러 다시 요청하거나 홈으로 돌아가주세요'
              : '상대방이 카드를 사용하면 알람을 받을 수 있어요'}
          </S.NormalText>
        </S.TextArea>
        <S.Lottie source={isError ? Error : GiveCard} autoPlay loop />
      </S.CompleteView>
      <Buttons
        onPress={handlePress}
        type={!isError}
        text1={isError ? '재시도' : '계속하기'}
        text2="홈으로"
      />
    </S.Wrpper>
  );
};

export default GiveDone;
