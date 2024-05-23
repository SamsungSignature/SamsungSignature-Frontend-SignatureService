import {Alert} from 'react-native';
import imagePath from '../../../assets/imagePath';
import STYLES from '../../../constants/appStyles';
import AppButton from '../../common/AppButton';
import {ButtonView} from './Form.style';

const SocialLogin = () => {
  const noService = () => {
    Alert.alert('지원하지 않는 기능입니다.', '로그인을 해주세요.');
  };

  return (
    <ButtonView>
      <AppButton
        text="Google 계정으로 사용"
        style={STYLES.BUTTONS.SOCIAL_LOGIN}
        image={imagePath.googlelogo}
        onPress={noService}
      />
    </ButtonView>
  );
};

export default SocialLogin;
