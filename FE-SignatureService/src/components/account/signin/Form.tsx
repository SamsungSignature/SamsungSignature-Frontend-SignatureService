import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import {Alert} from 'react-native';
import useLogin, {LoginRequestData} from '../../../api/member/useLogin';
import STYLES from '../../../constants/appStyles';
import parsePhoneNums from '../../../functions/parsePhoneNums';
import setTokens from '../../../functions/setToken';
import {useAppDispatch} from '../../../stores/hooks';
import {setLogin} from '../../../stores/slices/user';
import AppButton from '../../common/AppButton';
import AppCheckbox from '../../common/AppCheckbox';
import AppInput from '../../common/AppInput';
import {ButtonView, RememberText, RememberView} from './Form.style';

const Form = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [saveId, setSaveId] = useState(false);
  const dispatch = useAppDispatch();

  // API
  const login = useLogin();
  const {mutate} = useMutation({
    mutationFn: login,
    onSuccess: async res => {
      const tokenSaved = await setTokens(res);
      if (tokenSaved) {
        dispatch(setLogin(true));
      }
    },
    onError: err => {
      Alert.alert(err.message);
    },
  });

  const pressLogin = async () => {
    let data: LoginRequestData = {
      id,
      password,
    };
    if (!isNaN(parseInt(id, 10)) && id.length === 11) {
      data.id = parsePhoneNums(id);
    }
    mutate(data);
  };

  return (
    <>
      <AppInput title="이메일 주소 또는 전화번호" value={id} setValue={setId} />
      <AppInput
        title="비밀번호"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />
      <RememberView>
        <AppCheckbox checked={saveId} setChecked={setSaveId} />
        <RememberText>ID 기억하기</RememberText>
      </RememberView>
      <ButtonView>
        <AppButton
          text="로그인"
          style={STYLES.BUTTONS.SERVICE}
          onPress={pressLogin}
        />
      </ButtonView>
    </>
  );
};

export default Form;
