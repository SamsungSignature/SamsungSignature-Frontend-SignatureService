import {Alert} from 'react-native';
import {Wrapper} from './Help.style';
import {ServicesLink, ServicesText} from './Services.style';

const Help = () => {
  const noService = () => {
    Alert.alert('지원하지 않는 기능입니다.', '로그인을 해주세요.');
  };

  return (
    <Wrapper>
      <ServicesText>
        <ServicesLink onPress={noService}>도움말</ServicesLink>
      </ServicesText>
    </Wrapper>
  );
};

export default Help;
