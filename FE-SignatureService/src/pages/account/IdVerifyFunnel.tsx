import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import TERMS from '../../constants/terms';
import createCheckArray from '../../functions/createCheckArray';
import useFunnel from '../../hooks/useFunnel';
import {SignupFunnelParams} from '../../routes/AccountNavigatior';
import {RootStackParams} from '../../routes/RootNavigator';
import Confirm, {ConfirmData} from './idVerify/Confirm';
import Inputs, {InputsData} from './idVerify/Inputs';

type IdVerifyData = InputsData & ConfirmData;

const IdVerifyFunnel = () => {
  const [idVerifyData, setIdVerifyData] = useState<IdVerifyData>({
    phoneNums: '',
    lastName: '',
    firstName: '',
    residentNums: '',
    mobileCarrier: '',
    termChecks: createCheckArray(TERMS.ID_VERIFY.length),
    verifyNums: '',
  });
  const [Funnel, Step, setSteps] = useFunnel(['inputs', 'confirm'] as const);

  // 네비게이션
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const toConfirm = (data: InputsData) => {
    setIdVerifyData(prev => ({...prev, ...data}));
    // 통신사 확인번호 요청 API가 있어야 하는 곳
    setSteps('confirm');
  };
  const toSignup = (data: ConfirmData) => {
    setIdVerifyData(prev => ({...prev, ...data}));
    // 통신사 확인번호 확인 API가 있어야 하는 곳
    const params: SignupFunnelParams = {
      lastName: idVerifyData.lastName,
      firstName: idVerifyData.firstName,
      registNums: idVerifyData.residentNums,
      phoneNums: idVerifyData.phoneNums,
    };
    navigation.navigate('SignupFunnel', params);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Funnel>
        <Step name="inputs">
          <Inputs toNext={toConfirm} />
        </Step>
        <Step name="confirm">
          <Confirm toNext={toSignup} phoneNums={idVerifyData.phoneNums} />
        </Step>
      </Funnel>
    </TouchableWithoutFeedback>
  );
};

export default IdVerifyFunnel;
