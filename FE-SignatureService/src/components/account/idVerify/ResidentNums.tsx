import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import STYLES from '../../../constants/appStyles';
import AppInput from '../../common/AppInput';
import ResidentBackNum from './ResidentBackNum';
import {Hyphen, InputView, Wrapper} from './ResidentNums.style';

interface ResidentNumsProps {
  setResidentNums: Dispatch<SetStateAction<string>>;
}

const ResidentNums = ({setResidentNums}: ResidentNumsProps) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (front.length === 6) {
      inputRef.current?.focus();
    }
  }, [front]);

  useEffect(() => {
    setResidentNums(front + back);
  }, [front, back]);

  return (
    <Wrapper>
      <InputView>
        <AppInput
          title="주민등록번호"
          type="hoverUp"
          style={STYLES.INPUTS.SIGNUP_INPUT}
          value={front}
          setValue={setFront}
          maxLength={6}
          keyboardType="numeric"
        />
      </InputView>
      <Hyphen />
      <InputView>
        <ResidentBackNum back={back} setBack={setBack} inputRef={inputRef} />
      </InputView>
    </Wrapper>
  );
};

export default ResidentNums;
