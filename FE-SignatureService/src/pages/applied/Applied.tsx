import {RouteProp, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import useGetHistoryDetail, {
  GetHistoryDetailParams,
} from '../../api/history/useGetHistoryDetail';
import {theme} from '../../assets/styles/theme';
import AppliedDetail from '../../components/applied/AppliedDetail';
import AppliedTitle from '../../components/applied/AppliedTitle';
import Loading from '../../components/common/Loading';
import parseHistoryDetailData, {
  ParsedHistoryDetailData,
} from '../../functions/parseHistoryDetailData';
import {AppliedStackParams} from '../../routes/AppliedNavigator';

const Container = styled.View`
  flex-grow: 1;
  background-color: ${theme.colors.lightbackground};
`;

const Applied = () => {
  const route = useRoute<RouteProp<AppliedStackParams, 'Applied'>>();
  const signature_detail_id = route.params.signature_detail_id;
  const [titleName, setTitleName] = useState<string>('');

  const pathParams = {signature_detail_id};
  const params: GetHistoryDetailParams = {type: 'applied'};

  const [parsedData, setParsedData] = useState<ParsedHistoryDetailData>({
    detail: [],
    signature_detail_id,
    permission_status: 'INPROGRESS',
    progress_status: 'INPROGRESS_SUBMIT',
  });

  const getAppliedDetail = useGetHistoryDetail();
  const {isLoading, data, isSuccess} = useQuery({
    queryKey: ['get-applied-detail', route.params.signature_detail_id],
    queryFn: () => getAppliedDetail(pathParams, params),
  });

  useEffect(() => {
    // console.log('너 여기 나와야 해', data?.data.body);
    if (isSuccess && data !== undefined) {
      setTitleName(data.data.body.signature_name);
      setParsedData(parseHistoryDetailData(data.data.body));
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <ScrollView>
        <AppliedTitle from={titleName} />
        <AppliedDetail parsedData={parsedData} />
      </ScrollView>
    </Container>
  );
};

export default Applied;
