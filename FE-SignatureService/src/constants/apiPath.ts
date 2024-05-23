import ApiPath from './apiPath.interface';

const API_PATH: ApiPath = {
  SIGNATURE: {
    POST: '/signature-service/v1/signature-cards',
    GET: '/signature-service/v1/signature',
    GET_ID: '/wallet-service/v1/signature-card',
  },
  AUTH: {
    LOGIN: '/auth-service/v1/members/signin',
    SIGNUP: '/auth-service/v1/members',
    VALIDATE: '/auth-service/v1/members/validate',
  },
  HISTORY: {
    LIST: '/signature-service/v1/signatures/history',
    DETAIL: '/signature-service/v1/signatures/history/:signature_detail_id',
    NOTI: '/signature-service/v1/notifications',
  },
  FRIEND: {
    SYNC: '/signature-service/v1/friends',
  },
  GIVEN: {
    LIST: '/signature-service/v1/given-cards',
    DETAIL: '/signature-service/v1/given-cards/:card_id', // 이 주소는 빌려준 카드 세부내역 조회할 때만 사용
    DELETE: '/signature-service/v1/given-cards/:given_card_id', // 이 주소는 빌려준 카드 권한 on/off와 삭제할 때 사용
  },
  REQUESTPAY: {
    ONCE: '/signature-service/v1/delegated-cards/one-time',
    PERIOD: '/signature-service/v1/delegated-cards/long-term',
  },
  DELEGATED: {
    GET: '/signature-service/v1/delegated-cards',
    PATCH_PERMISSION:
      '/signature-service/v1/delegated-cards/:signature_detail_id/permission',
  },
  PAYMENT: {
    POST_PAY_CARD: '/signature-service/v1/payments/:signature_detail_card_id',
  },
};

export default API_PATH;
