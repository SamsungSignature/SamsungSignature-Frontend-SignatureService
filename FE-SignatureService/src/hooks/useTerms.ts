import {useState} from 'react';
import {Alert} from 'react-native';
import TERMS from '../constants/terms';
import createCheckArray from '../functions/createCheckArray';

const useTerms = (type: string) => {
  const [agreement, setAgreement] = useState(false);
  const [termChecks, setTermChecks] = useState<boolean[]>(
    createCheckArray(TERMS[type].length),
  );

  // 유효성 확인
  const checkValid = () => {
    if (!agreement) {
      return false;
    }

    for (let i = 0; i < TERMS[type].length; i++) {
      if (!TERMS[type][i].isOptional && !termChecks[i]) {
        return false;
      }
    }

    return true;
  };

  const agree = async () => {
    if (!checkValid()) {
      Alert.alert('필수 항목을 확인하세요.');
    }
  };

  return {
    agreement,
    setAgreement,
    termChecks,
    setTermChecks,
    checkValid,
    agree,
  };
};

export default useTerms;
