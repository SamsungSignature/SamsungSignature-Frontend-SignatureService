import {useHeaderHeight} from '@react-navigation/elements';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import Form from '../../../components/account/signup/Form';
import AppHeader from '../../../components/common/appHeader/AppHeader';
import {RootStackParams} from '../../../routes/RootNavigator';
import {RegistData} from '../SignupFunnel';
import {Info, Wrapper} from './Inputs.style';

interface InputsData {
  email: string;
  password: string;
}

interface InputsProps {
  data: RegistData;
  toNext: (data: InputsData) => void;
}

const Inputs = (props: InputsProps) => {
  const headerHeight = useHeaderHeight();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  useEffect(() => {
    navigation.setOptions({header: AppHeader});
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper $headerHeight={headerHeight}>
        <Info>계정으로 사용할 이메일과 전화번호를 입력하세요.</Info>
        <Form {...props} />
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

export type {InputsData, InputsProps};
export default Inputs;
