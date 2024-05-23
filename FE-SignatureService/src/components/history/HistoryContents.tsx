import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import useGetHistory from '../../api/history/useGetHistory';
import groupDataByDate, {GroupDataProps} from '../../functions/groupDataByDate';
import {RootStackParams} from '../../routes/RootNavigator';
import Loading from '../common/Loading';
import DateHeader from './DateHeader';
import * as S from './HistoryContents.style';
import PriceInfo from './PriceInfo';
import StatusTag from './StatusTag';

type QueryProps = {
  historyQuery: 'approved' | 'applied';
};

const HistoryContents = (props: QueryProps) => {
  const {historyQuery} = props;
  const [particle, setParticle] = useState<string>('님에게 요청');
  const getHistory = useGetHistory(historyQuery);
  const navigate = useNavigation<NavigationProp<RootStackParams>>();

  const {isLoading: getHistoryLoading, data: getHistoryData} = useQuery({
    queryKey: ['get-history', historyQuery],
    queryFn: () => getHistory(),
  });

  useEffect(() => {
    if (historyQuery === 'applied') {
      setParticle('님에게 요청');
    } else if (historyQuery === 'approved') {
      setParticle('님으로부터 요청');
    }
  }, [historyQuery]);

  if (getHistoryLoading) {
    return <Loading />;
  }

  let groupList: Array<GroupDataProps> = [];
  if (getHistoryData) {
    groupList = groupDataByDate(getHistoryData);
  }

  const goToDetail = (id: number) => {
    if (historyQuery === 'approved') {
      navigate.navigate('Approve', {
        screen: 'ApproveDetail',
        params: {signature_detail_id: id},
      });
    } else if (historyQuery === 'applied') {
      navigate.navigate('Applied', {
        screen: 'AppliedDetail',
        params: {signature_detail_id: id},
      });
    }
  };
  const isLine = (dataIdx: number, item: GroupDataProps) => {
    return dataIdx !== item.history.length - 1;
  };

  return (
    <FlatList
      data={groupList}
      renderItem={({item, index}) => (
        <View key={index}>
          <DateHeader date={item.date} />
          {item.history.map((historyData, dataIdx) => (
            <View key={historyData.signature_detail_id}>
              <S.ContentsBox
                key={historyData.signature_detail_id}
                $isLine={isLine(dataIdx, item)}>
                <TouchableOpacity
                  onPress={() => goToDetail(historyData.signature_detail_id)}>
                  <S.ContentsView>
                    <S.NameWrapper>
                      <S.Name>{historyData.signature_name}</S.Name>
                      <S.NameTail>{particle}</S.NameTail>
                      <S.StatusWrapper>
                        <StatusTag status={historyData.permission_status} />
                      </S.StatusWrapper>
                    </S.NameWrapper>
                  </S.ContentsView>
                  <PriceInfo price={historyData.limit_amount} />
                </TouchableOpacity>
              </S.ContentsBox>
            </View>
          ))}
        </View>
      )}
    />
  );
};

export default HistoryContents;
