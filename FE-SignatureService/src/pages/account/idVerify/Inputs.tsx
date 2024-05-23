import {useState} from 'react';
import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Terms from '../../../components/account/common/AllCheckTerms';
import Logo from '../../../components/account/common/Logo';
import MobileCarrier from '../../../components/account/idVerify/MobileCarrier';
import ResidentNums from '../../../components/account/idVerify/ResidentNums';
import AppButton from '../../../components/common/AppButton';
import AppInput from '../../../components/common/AppInput';
import STYLES from '../../../constants/appStyles';
import useTerms from '../../../hooks/useTerms';
import {Title, TitleView} from '../Common.style';
import {Container, Info, Wrapper} from './Inputs.style';

interface InputsData {
  phoneNums: string;
  lastName: string;
  firstName: string;
  residentNums: string;
  mobileCarrier: string;
  termChecks: boolean[];
}

interface InputsProps {
  toNext: (data: InputsData) => void;
}

const Inputs = ({toNext}: InputsProps) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [residentNums, setResidentNums] = useState('');
  const [mobileCarrier, setMobileCarrier] = useState('SKT');
  const [phoneNums, setPhoneNums] = useState('');
  const {setAgreement, termChecks, setTermChecks, checkValid, agree} =
    useTerms('ID_VERIFY');

  // 네비게이션
  const checkAllValid = () => {
    if (!checkValid()) {
      Alert.alert('약관을 동의해주세요.');
      return false;
    } else if (!lastName || !firstName) {
      Alert.alert('이름을 확인해주세요.');
      return false;
    } else if (residentNums.length !== 7) {
      Alert.alert('주민등록번호를 확인해주세요.');
      return false;
    } else if (!mobileCarrier) {
      Alert.alert('이동통신사를 확인해주세요.');
      return false;
    } else if (phoneNums.length !== 11) {
      Alert.alert('휴대폰 번호를 확인해주세요.');
      return false;
    }
    return true;
  };
  const sendVerification = () => {
    if (checkAllValid()) {
      const data: InputsData = {
        lastName,
        firstName,
        residentNums,
        mobileCarrier,
        phoneNums,
        termChecks,
      };
      agree();
      toNext(data);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <Container>
          <TitleView>
            <Logo option={{size: 'small'}} />
            <Title>본인 인증</Title>
          </TitleView>
          <Info>
            계정을 만들려면 전화번호로 본인 인증을 해야합니다. 전화번호는 2단계
            인증과 맞춤형 고객 지원에도 사용됩니다.
          </Info>
          <AppInput
            title="성"
            type="hoverUp"
            style={STYLES.INPUTS.SIGNUP_INPUT}
            value={lastName}
            setValue={setLastName}
          />
          <AppInput
            title="이름"
            type="hoverUp"
            style={STYLES.INPUTS.SIGNUP_INPUT}
            value={firstName}
            setValue={setFirstName}
          />
          <ResidentNums setResidentNums={setResidentNums} />
          <MobileCarrier value={mobileCarrier} setValue={setMobileCarrier} />
          <AppInput
            title="휴대폰 번호 (-없이 숫자만 입력)"
            type="hoverUp"
            style={STYLES.INPUTS.SIGNUP_INPUT}
            value={phoneNums}
            setValue={setPhoneNums}
            maxLength={11}
            keyboardType="numeric"
          />
          <Terms
            setAgreement={setAgreement}
            termChecks={termChecks}
            setTermChecks={setTermChecks}
          />
          <AppButton
            text="인증 요청"
            style={STYLES.BUTTONS.SMALL}
            onPress={sendVerification}
          />
        </Container>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

export type {InputsData};
export default Inputs;
