import {useRef} from 'react';
import {Animated} from 'react-native';

const useHoverUpAnimation = (toValue: number = -22, duration: number = 200) => {
  const Y = useRef(new Animated.Value(0)).current;

  const up = () => {
    Animated.timing(Y, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };
  const down = () => {
    Animated.timing(Y, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return {Y, up, down};
};

export default useHoverUpAnimation;
