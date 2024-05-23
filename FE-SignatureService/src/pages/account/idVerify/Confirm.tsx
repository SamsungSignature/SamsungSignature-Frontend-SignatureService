import {useState} from 'react';
import {Alert, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import Logo from '../../../components/account/common/Logo';
import AppButton from '../../../components/common/AppButton';
import AppInput from '../../../components/common/AppInput';
import STYLES from '../../../constants/appStyles';
import {Title} from '../Common.style';
import {InputView, PhoneNums, Wrapper} from './Confirm.style';

interface ConfirmData {
  verifyNums: string;
}

interface ConfirmProps {
  toNext: (data: ConfirmData) => void;
  phoneNums: string;
}

const Confirm = ({toNext, phoneNums}: ConfirmProps) => {
  const [verifyNums, setVerifyNums] = useState('000000');

  const confirmVerification = () => {
    if (!verifyNums) {
      Alert.alert(
        '인증번호를 확인하세요.',
        '데모 버전에서는 아무 번호나 입력해도 인증이 완료됩니다.',
      );
      return;
    }
    const data: ConfirmData = {
      verifyNums,
    };
    toNext(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <Logo option={{size: 'small'}} />
        <Title>휴대전화로 전송된 인증 코드를 입력하세요</Title>
        <PhoneNums>{phoneNums}</PhoneNums>
        <InputView>
          <AppInput
            value={verifyNums}
            setValue={setVerifyNums}
            style={STYLES.INPUTS.SIGNUP_INPUT}
            title="인증번호"
            type="hoverUp"
            maxLength={6}
            keyboardType="numeric"
          />
          <View />
        </InputView>
        <AppButton text="인증" onPress={confirmVerification} />
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

export type {ConfirmData};
export default Confirm;
