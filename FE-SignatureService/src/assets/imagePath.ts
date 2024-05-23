import {ImageSourcePropType} from 'react-native';

/**
 * 이미지 등록시 주의사항
 * 1. android 가 대문자와 일부 특수문자를 인식하지 못하기 때문에 "이미지 파일명은 소문자로만 이루어지게 한다."
 * 2. 컴포넌트에서 사용 시 사용에 편리하게 하기 위해 "이미지 경로 인터페이스에 등록 후 사용한다."
 * 3. 잘못 입력할 시 앱이 실행되지 않으므로, "png, jpg 등 확장자 명을 명확히 입력한다."
 */

interface ImagePath {
  [key: string]: ImageSourcePropType;
  addtowalletbtn: ImageSourcePropType;
  apple: ImageSourcePropType;
  back: ImageSourcePropType;
  bcwooricheck: ImageSourcePropType;
  bcwooricredit: ImageSourcePropType;
  bottomarrow: ImageSourcePropType;
  creditcard: ImageSourcePropType;
  defaultcard: ImageSourcePropType;
  googlelogo: ImageSourcePropType;
  logo: ImageSourcePropType;
  more: ImageSourcePropType;
  noti: ImageSourcePropType;
  profile: ImageSourcePropType;
  qr: ImageSourcePropType;
  search: ImageSourcePropType;
  signaturecard: ImageSourcePropType;
  toparrow: ImageSourcePropType;
  trash: ImageSourcePropType;
  redtrash: ImageSourcePropType;
  request: ImageSourcePropType;
  check: ImageSourcePropType;
  choose: ImageSourcePropType;
  complete: ImageSourcePropType;
}

const imagePath: ImagePath = {
  addtowalletbtn: require('./images/addtowalletbtn.png'),
  apple: require('./images/apple.jpg'),
  back: require('./images/back.png'),
  bcwooricheck: require('./images/bcwooricheck.png'),
  bcwooricredit: require('./images/bcwooricredit.png'),
  bottomarrow: require('./images/bottomarrow.png'),
  creditcard: require('./images/creditcard.png'),
  defaultcard: require('./images/defaultcard.png'),
  googlelogo: require('./images/googlelogo.png'),
  logo: require('./images/logo.png'),
  more: require('./images/more.png'),
  noti: require('./images/noti.png'),
  profile: require('./images/profile.png'),
  qr: require('./images/qr.png'),
  search: require('./images/search.png'),
  signaturecard: require('./images/signaturecard.png'),
  toparrow: require('./images/toparrow.png'),
  trash: require('./images/trash.png'),
  redtrash: require('./images/redtrash.png'),
  request: require('./images/request.png'),
  check: require('./images/check.png'),
  choose: require('./images/choose.png'),
  complete: require('./images/complete.png'),
};

export default imagePath;
