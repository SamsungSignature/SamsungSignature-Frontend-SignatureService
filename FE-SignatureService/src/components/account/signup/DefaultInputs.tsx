import {RouteProp, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import IconPath from '../../../assets/iconPath';
import parseRegistNums from '../../../functions/parseRegustNums';
import {RootStackParams} from '../../../routes/RootNavigator';
import AppInput from '../../common/AppInput';
import {BirthText, BirthView, IconView} from './DefaultInputs.style';

const DefaultInputs = () => {
  const {lastName, firstName, registNums} =
    useRoute<RouteProp<RootStackParams, 'SignupFunnel'>>().params;
  const {year, month, day} = parseRegistNums(registNums);

  const noService = () => {
    Alert.alert(
      '지원하지 않는 기능입니다.',
      '이메일과 전화번호, 비밀번호를 입력하고 계정을 생성해주세요.',
    );
  };

  return (
    <>
      <BirthView>
        <BirthText>
          {year}년 {month}월 {day}일
        </BirthText>
        <IconView onPress={noService}>
          <IconPath.question />
        </IconView>
      </BirthView>
      <AppInput value={lastName} title="성" type="hoverUp" disabled />
      <AppInput value={firstName} title="이름" type="hoverUp" disabled />
    </>
  );
};

export default DefaultInputs;
