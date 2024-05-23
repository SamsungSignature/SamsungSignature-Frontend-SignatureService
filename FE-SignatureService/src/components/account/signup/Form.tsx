import {useState} from 'react';
import STYLES from '../../../constants/appStyles';
import {InputsData, InputsProps} from '../../../pages/account/signup/Inputs';
import AppButton from '../../common/AppButton';
import AppInput from '../../common/AppInput';
import DefaultInputs from './DefaultInputs';
import {ButtonView, Content, Wrapper} from './Form.style';

const Form = ({data, toNext}: InputsProps) => {
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState('');

  const pressSignup = () => {
    const inputsData: InputsData = {
      email,
      password,
    };
    toNext(inputsData);
  };

  return (
    <Wrapper>
      <Content>
        <AppInput
          value={email}
          setValue={setEmail}
          title="이메일"
          type="hoverUp"
        />
        <AppInput
          value={password}
          setValue={setPassword}
          title="비밀번호"
          type="hoverUp"
          secureTextEntry
        />
        <DefaultInputs />
      </Content>
      <ButtonView>
        <AppButton
          text="계정만들기"
          style={STYLES.BUTTONS.TRANSPARENT}
          type="pressable"
          onPress={pressSignup}
        />
      </ButtonView>
    </Wrapper>
  );
};

export default Form;
