import {Linking} from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    const data = notification.data as NotificationData;
    if (notification.userInteraction && data) {
      const TO_APPROVE = ['INPROGRESS_SUBMIT'];
      if (TO_APPROVE.includes(data.notification_type) && data.signature_id) {
        const url = `signature://approve/detail/${data.signature_id}`;
        Linking.openURL(url).catch(err =>
          console.error('Failed to open URL:', err),
        );
      }
      const TO_APPLIY = [
        'INPROGRESS_CONSIDER',
        'INPROGRESS_PICKCARD',
        'APPROVED',
        'REJECTED',
      ];
      if (TO_APPLIY.includes(data.notification_type) && data.signature_id) {
        const url = `signature://apply/detail/${data.signature_id}`;
        Linking.openURL(url).catch(err =>
          console.error('Failed to open URL:', err),
        );
      }
    }
  },
  popInitialNotification: true,
  requestPermissions: false,

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
});
