import {useRef} from 'react';
import {Animated} from 'react-native';

const useSlideOpenAnimation = (
  toValue: number = 180,
  duration: number = 200,
) => {
  const left = useRef(new Animated.Value(toValue)).current;
  const right = useRef(new Animated.Value(-toValue)).current;

  const open = () => {
    Animated.timing(left, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(right, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };
  const close = () => {
    Animated.timing(left, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(right, {
      toValue: -toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return {left, right, open, close};
};

export default useSlideOpenAnimation;
