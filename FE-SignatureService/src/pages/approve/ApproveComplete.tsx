import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import {useEffect} from 'react';
import {Dimensions, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import usePatchPermission from '../../api/delegated/usePatchPermission';
import Error from '../../assets/lotties/Error.json';
import GiveCard from '../../assets/lotties/GiveCard.json';
import {theme} from '../../assets/styles/theme';
import Buttons from '../../components/approve/Buttons';
import decodeData from '../../functions/decodeData';
import {ApproveStackParams} from '../../routes/ApproveNavigator';
import {RootStackParams} from '../../routes/RootNavigator';

const screen = Dimensions.get('screen');

const Wrapper = styled.View`
  flex: 1;
  background: ${theme.colors.lightbackground};
`;

const Content = styled.View`
  flex: 1;
  padding: ${theme.space[5]} ${theme.space[4]};
  gap: ${theme.space[3]};
`;

const Title = styled.Text`
  width: 100%;
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights.semibold};
`;

const Info = styled.Text`
  width: 100%;
  font-size: ${theme.fontSizes[3]};
`;

const LottieBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Lottie = styled(LottieView)`
  width: ${screen.width * 0.8}px;
  height: ${screen.width * 0.8}px;
`;

const ApproveComplete = () => {
  const {data, originData} =
    useRoute<RouteProp<ApproveStackParams, 'ApproveComplete'>>().params;

  const {signature_detail_id} = decodeData<{signature_detail_id: number}>(
    originData,
  );
  const {card_id} = decodeData<WalletCard>(data);
  const patchPermission = usePatchPermission();
  const {mutate, isError} = useMutation({
    mutationKey: ['patchPermission'],
    mutationFn: () =>
      patchPermission(
        {signature_detail_id},
        {permission_type: 'APPROVED', card_id},
      ),
    onSuccess: res => ToastAndroid.show(res.data.message, ToastAndroid.SHORT),
    onError: err => ToastAndroid.show(err.message, ToastAndroid.SHORT),
  });

  useEffect(() => {
    if (signature_detail_id && card_id) {
      mutate();
    }
  }, [signature_detail_id, card_id]);

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const handleNavigation = (props: 'left' | 'right' | 'center') => {
    if (props === 'center' || props === 'right') {
      navigation.reset({index: 0, routes: [{name: 'MainPage'}]});
    } else if (props === 'left') {
      mutate();
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title>{isError ? '카드 전달 실패!' : '카드가 전달되었어요!'}</Title>
        <Info>
          {isError
            ? '재시도를 눌러 다시 요청하거나 홈으로 돌아가주세요'
            : '상대방이 카드를 사용하면 알람을 받을 수 있습니다!'}
        </Info>
        <LottieBox>
          <Lottie source={isError ? Error : GiveCard} autoPlay loop />
        </LottieBox>
      </Content>
      <Buttons
        onPress={handleNavigation}
        type={!isError}
        text1={isError ? '재시도' : '계속하기'}
        text2="홈으로"
      />
    </Wrapper>
  );
};

export default ApproveComplete;
