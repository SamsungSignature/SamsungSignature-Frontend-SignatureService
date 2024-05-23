import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Keyboard,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import useSignup, {SignupRequestData} from '../../api/member/useSignup';
import useValidate, {ValidateParams} from '../../api/member/useValidate';
import TERMS from '../../constants/terms';
import createCheckArray from '../../functions/createCheckArray';
import parsePhoneNums from '../../functions/parsePhoneNums';
import useFunnel from '../../hooks/useFunnel';
import {RootStackParams} from '../../routes/RootNavigator';
import Confirm from './signup/Confirm';
import Inputs, {InputsData} from './signup/Inputs';
import Terms, {TermsData} from './signup/Terms';

type RegistData = TermsData & InputsData;

const SignupFunnel = () => {
  const [registData, setRegistData] = useState<RegistData>({
    termChecks: createCheckArray(TERMS.SIGNUP.length),
    email: '',
    password: '',
  });
  const [Funnel, Step, setSteps] = useFunnel([
    'terms',
    'inputs',
    'confirm',
  ] as const);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, 'SignupFunnel'>>();
  const parsedPhoneNums = parsePhoneNums(route.params.phoneNums);

  // API
  const validate = useValidate();
  const signup = useSignup();
  const {mutate} = useMutation({
    mutationFn: signup,
    onSuccess: res => {
      navigation.navigate('AccountMain');
      ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
    },
    onError: err => {
      Alert.alert(err.message);
    },
  });

  // 네비게이션
  const toPrevInput = () => {
    setSteps('inputs');
  };
  const toInputs = (data: TermsData) => {
    setRegistData(prev => ({...prev, ...data}));
    setSteps('inputs');
  };
  const toConfirm = async (data: InputsData) => {
    setRegistData(prev => ({...prev, ...data}));
    const params: ValidateParams = {
      email: data.email,
      phone_number: parsedPhoneNums,
    };
    if (await validate(params)) {
      setSteps('confirm');
    }
  };
  const regist = () => {
    const data: SignupRequestData = {
      email: registData.email,
      password: registData.password,
      phone_number: parsedPhoneNums,
      username: route.params.lastName + route.params.firstName,
    };
    Alert.alert(
      '데모 버전에서는 인증 없이 진행됩니다.',
      '해당 이메일로 가입하시겠습니까?',
      [{text: '예', onPress: () => mutate(data)}, {text: '아니오'}],
    );
  };

  // 디바이스 뒤로가기 버튼
  useEffect(() => {
    const backAction = () => {
      Alert.alert('정보가 저장되지 않을 수 있습니다.', '뒤로 가시겠습니까?', [
        {text: '예', onPress: () => navigation.navigate('AccountMain')},
        {text: '아니오'},
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Funnel>
        <Step name="terms">
          <Terms toNext={toInputs} />
        </Step>
        <Step name="inputs">
          <Inputs data={registData} toNext={toConfirm} />
        </Step>
        <Step name="confirm">
          <Confirm data={registData} toNext={regist} toPrev={toPrevInput} />
        </Step>
      </Funnel>
    </TouchableWithoutFeedback>
  );
};

export type {RegistData};
export default SignupFunnel;
