interface Signature {
  [key: string]: string;
  POST: string;
  GET: string;
  GET_ID: string;
}

interface Auth {
  [key: string]: string;
  LOGIN: string;
  SIGNUP: string;
  VALIDATE: string;
}

interface History {
  [key: string]: string;
  LIST: string;
  DETAIL: string;
  NOTI: string;
}

interface Friend {
  [key: string]: string;
  SYNC: string;
}

interface Given {
  [key: string]: string;
  LIST: string;
  DETAIL: string;
  DELETE: string;
}

interface RequestPay {
  [key: string]: string;
  ONCE: string;
  PERIOD: string;
}

interface Delegated {
  [key: string]: string;
  GET: string;
  PATCH_PERMISSION: string;
}

interface Payment {
  POST_PAY_CARD: string;
}

interface ApiPath {
  SIGNATURE: Signature;
  AUTH: Auth;
  HISTORY: History;
  FRIEND: Friend;
  GIVEN: Given;
  REQUESTPAY: RequestPay;
  DELEGATED: Delegated;
  PAYMENT: Payment;
}

export default ApiPath;
