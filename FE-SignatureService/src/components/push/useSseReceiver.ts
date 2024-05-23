// import {NavigationProp, useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import PushNotification, {Importance} from 'react-native-push-notification';
import EventSource from 'react-native-sse';
import useGetDelegatedCards from '../../api/delegated/useGetDelegatedCards';
import getAccessToken from '../../functions/getAccessToken';
import {useAppDispatch} from '../../stores/hooks';
import {setCards} from '../../stores/slices/card';
// import {RootStackParams} from '../../routes/RootNavigator';

const useSseReceiver = () => {
  const dispatch = useAppDispatch();
  const getDelegatedCards = useGetDelegatedCards();

  // 알림 채널 생성
  PushNotification.createChannel(
    {
      channelName: 'Signature',
      channelId: 'Signature',
      importance: Importance.HIGH,
    },
    create => console.log(create),
  );

  const initializeSSE = async () => {
    try {
      // Access token 가져오기
      const {accessToken} = await getAccessToken();
      const UID = await DeviceInfo.getUniqueId();

      // SSE 초기화
      const eventSource = new EventSource(
        'https://samsung-signature.com/signature-service/v1/notifications/subscribe',
        {
          headers: {Authorization: `Bearer ${accessToken}`, UID},
          lineEndingCharacter: '\n',
        },
      );

      // SSE 메시지 수신 핸들러
      eventSource.addEventListener('message', event => {
        try {
          if (event.data === null) {
            console.error('메시지 없음');
            return;
          }
          const eventData = JSON.parse(event.data) as NotificationData;
          const {message, notification_type} = eventData;

          if (notification_type !== null) {
            PushNotification.localNotification({
              channelId: 'Signature',
              message,
              userInfo: {...eventData},
            });
            const UPDATE_DELEGATE = [
              'APPROVED',
              'ISSUED',
              'EXPIRED',
              'OFFON',
              'ONOFF',
            ];
            if (UPDATE_DELEGATE.includes(notification_type)) {
              getDelegatedCards().then(res => {
                dispatch(setCards(res.data.body.cards));
              });
            }
          } else {
            console.log('SSE 연결', message);
          }
        } catch (error) {
          console.error('Error handling event data:', error);
        }
      });

      // SSE 에러 핸들러
      eventSource.addEventListener('error', error => {
        console.error('SSE 에러:', error);
      });
    } catch (error) {
      console.error('SSE 초기화 에러:', error);
    }
  };

  // SSE 초기화 함수 호출
  return initializeSSE;
};

export default useSseReceiver;
