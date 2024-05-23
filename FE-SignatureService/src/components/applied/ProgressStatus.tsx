import {useEffect, useRef, useState} from 'react';
import {Animated, Text, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {theme} from '../../assets/styles/theme';
import CurrentStep from './CurrentStep';

interface StatusProps {
  status: {
    permission_status: 'INPROGRESS' | 'APPROVED' | 'REJECTED';
    progress_status:
      | 'INPROGRESS_SUBMIT'
      | 'INPROGRESS_CONSIDER'
      | 'INPROGRESS_PICKCARD';
  };
}

const ProgressStatus = ({status}: StatusProps) => {
  const {permission_status, progress_status} = status;

  const labels = ['요청 접수', '요청서 확인 중', '카드 선택 중', '완료'];
  const [step, setStep] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    if (permission_status === 'INPROGRESS') {
      switch (progress_status) {
        case 'INPROGRESS_SUBMIT':
          setStep(0);
          break;
        case 'INPROGRESS_CONSIDER':
          setStep(1);
          break;
        case 'INPROGRESS_PICKCARD':
          setStep(2);
          break;
      }
    } else {
      setStep(3);
      if (permission_status === 'APPROVED') {
        setResult('승인');
      } else if (permission_status === 'REJECTED') {
        setResult('거절');
      }
    }
  }, [permission_status, progress_status]);

  const progress = {step, permission_status};

  // 깜빡거리는 효과
  const opacity = useRef(new Animated.Value(1)).current;
  const animateOpacity = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  // 현재 스텝의 라벨
  const currentLabel = (index: number) => {
    if (index === step) {
      animateOpacity();

      if (result !== '') {
        return (
          <View>
            <Animated.Text style={{opacity}}>{result}</Animated.Text>
          </View>
        );
      } else {
        return (
          <View>
            <Animated.Text style={{opacity}}>{labels[index]}</Animated.Text>
          </View>
        );
      }
    } else {
      return (
        <View>
          <Text>{labels[index]}</Text>
        </View>
      );
    }
  };

  return (
    <StepIndicator
      stepCount={4}
      labels={labels}
      currentPosition={step}
      customStyles={{
        currentStepLabelColor: theme.colors.samsungBlue, // 현재 스텝 라벨 색깔
        stepStrokeCurrentColor: theme.colors.samsungBlue, // 현재 스텝 테두리 색깔
        separatorFinishedColor: theme.colors.samsungBlue, // 현재 스텝까지 가로줄 색깔
        separatorUnFinishedColor: theme.colors.blue, // 현재 스텝 이후의 가로줄 색깔
        stepIndicatorFinishedColor: theme.colors.samsungBlue, // 끝난 스텝의 색깔
        stepIndicatorUnFinishedColor: theme.colors.blue, // 남아있는 스텝의 색깔
        stepIndicatorLabelCurrentColor: theme.colors.samsungBlue, // 현재 스텝의 숫자 색깔
        stepIndicatorLabelUnFinishedColor: theme.colors.white, // 남아있는 스텝의 숫자 색깔
      }}
      renderStepIndicator={props => CurrentStep(props.position, progress)}
      renderLabel={props => currentLabel(props.position)}
    />
  );
};

export default ProgressStatus;
