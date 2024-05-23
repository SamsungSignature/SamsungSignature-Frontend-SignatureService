import {Dispatch, RefObject, SetStateAction, useState} from 'react';

import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import STYLES from '../../../constants/appStyles';
import useSlideOpenAnimation from '../../../hooks/useSlideOpenAnimation';
import AppInputBorder from '../../common/AppInputBorder';
import {Dot, Dots, Input, InputView, Wrapper} from './ResidentBackNum.style';

interface ResidentBackNumProps {
  back: string;
  setBack: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<TextInput>;
}

const ResidentBackNum = ({back, setBack, inputRef}: ResidentBackNumProps) => {
  const {left, right, open, close} = useSlideOpenAnimation();
  const dots = Array.from({length: 6}, (_, idx) => <Dot key={idx} />);

  // 입력
  const [isValue, setIsValue] = useState(!!back);
  const onChane = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (e.nativeEvent.text.length > 1) {
      return;
    } else if (e.nativeEvent.text) {
      setIsValue(true);
    } else {
      setIsValue(false);
    }
    setBack(e.nativeEvent.text);
  };

  // 포커스
  const onPress = () => {
    inputRef.current?.focus();
  };

  return (
    <Wrapper onPress={onPress}>
      <InputView>
        <Dot $isValue={!isValue} />
        <Input
          ref={inputRef}
          value={back}
          onChange={onChane}
          onFocus={open}
          onBlur={close}
          keyboardType="numeric"
          $isValue={!isValue}
        />
        <Dots>{dots}</Dots>
        <AppInputBorder
          left={left}
          right={right}
          style={STYLES.INPUTS.SIGNUP_INPUT}
        />
      </InputView>
    </Wrapper>
  );
};

export default ResidentBackNum;
