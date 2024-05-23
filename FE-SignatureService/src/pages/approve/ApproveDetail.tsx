import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Alert, Linking, ToastAndroid, View} from 'react-native';
import styled from 'styled-components/native';
import usePatchPermission from '../../api/delegated/usePatchPermission';
import useGetHistoryDetail from '../../api/history/useGetHistoryDetail';
import {theme} from '../../assets/styles/theme';
import Buttons from '../../components/approve/Buttons';
import Detail from '../../components/approve/Detail';
import Title from '../../components/approve/Title';
import Loading from '../../components/common/Loading';
import encodeData from '../../functions/encodeData';
import parseHistoryDetailData, {
  ParsedHistoryDetailData,
} from '../../functions/parseHistoryDetailData';
import {ApproveStackParams} from '../../routes/ApproveNavigator';
import {RootStackParams} from '../../routes/RootNavigator';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${theme.colors.lightbackground};
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const ApproveDetail = () => {
  // 데이터 불러오기
  const {signature_detail_id} =
    useRoute<RouteProp<ApproveStackParams, 'ApproveDetail'>>().params;
  const getHistoryDetail = useGetHistoryDetail();
  const {isLoading, isError, data, isSuccess, error} = useQuery({
    queryKey: ['getHistoryDetail', signature_detail_id],
    queryFn: () => getHistoryDetail({signature_detail_id}, {type: 'approved'}),
  });
  const [parsedData, setParsedData] = useState<ParsedHistoryDetailData>({
    detail: [],
    signature_detail_id,
    permission_status: 'INPROGRESS',
  });
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.body);

      setParsedData(parseHistoryDetailData(data.data.body));
    }
  }, [isSuccess, data?.data.body]);

  // 네비게이션, 딥 링크
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const patchPermission = usePatchPermission();
  const {mutate} = useMutation({
    mutationKey: ['patchPermission'],
    mutationFn: () =>
      patchPermission({signature_detail_id}, {permission_type: 'REJECTED'}),
    onSuccess: res => {
      Alert.alert(res.data.message);
      navigation.navigate('MainPage');
    },
    onError: err => Alert.alert(err.message),
  });
  const handleNavigation = async (status: 'left' | 'right' | 'center') => {
    if (status === 'right') {
      const linkData: LinkData = {
        origin: 'signature',
        route: 'approve/complete',
        originData: {signature_detail_id},
      };
      const encodedData = encodeData(linkData);
      await Linking.openURL(`fakewallet://wallet/select?data=${encodedData}`);
    } else if (status === 'left') {
      Alert.alert('카드 요청을 거절하시겠습니까?', '', [
        {text: '예', onPress: () => mutate()},
        {text: '아니오'},
      ]);
    } else if (status === 'center') {
      navigation.goBack();
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
    navigation.goBack();

    return <View />;
  }

  return (
    <Wrapper>
      <Scroll>
        <Title from={data?.data.body.signature_name} />
        <Detail parsedData={parsedData} />
      </Scroll>
      <Buttons
        onPress={handleNavigation}
        type={parsedData.permission_status !== 'INPROGRESS'}
      />
    </Wrapper>
  );
};

export default ApproveDetail;
