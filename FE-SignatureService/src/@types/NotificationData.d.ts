type NotificationType =
  | 'INPROGRESS_SUBMIT'
  | 'INPROGRESS_CONSIDER'
  | 'INPROGRESS_PICKCARD'
  | 'REJECTED'
  | 'APPROVED'
  | 'ISSUED'
  | 'EXPIRED'
  | 'OFFON'
  | 'ONOFF'
  | 'PAYMENT';

interface NotificationData {
  signature_id?: number;
  notification_type: NotificationType;
  message: string;
}
