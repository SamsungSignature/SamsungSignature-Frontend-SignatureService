import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import useGetNotiData from '../api/history/getNotiData';
import * as S from './contact/FriendManage.style';
import * as S2 from './NotiPage.style';
import {Linking} from 'react-native';

interface NotificationItem {
  signature_id: number;
  notification_type: string;
  message: string;
  created_at: Date;
}

const NotifyPage = () => {
  const [notiData, setNotiData] = useState<NotificationItem[]>([]);

  const handleNotiPress = (item: NotificationItem) => {
    if (item.notification_type === 'INPROGRESS_SUBMIT') {
      Linking.openURL(`signature://approve/detail/${item.signature_id}`);
      console.log('승인 페이지로 이동');
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await useGetNotiData();
        setNotiData(response.notifications);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    FetchData();
  }, []);

  return (
    <S.FriendView>
      <S.TitleView>
        <S.FriendText>알림내역</S.FriendText>
      </S.TitleView>
      <S2.AlertListView>
        {notiData.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => handleNotiPress(item)}>
            <S2.StyledListItem>
              <S2.StyledText2>
                {new Date(item.created_at).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </S2.StyledText2>
              <S2.StyledText>{item.message}</S2.StyledText>
            </S2.StyledListItem>
          </TouchableOpacity>
        ))}
      </S2.AlertListView>
    </S.FriendView>
  );
};

export default NotifyPage;
