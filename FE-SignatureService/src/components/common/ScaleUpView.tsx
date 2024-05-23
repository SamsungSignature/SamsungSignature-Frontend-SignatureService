import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {Animated, ViewStyle} from 'react-native';

type ScaleUpViewProps = PropsWithChildren<{style?: ViewStyle}>;

const ScaleUpView = (props: ScaleUpViewProps) => {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{...props.style, transform: [{scale: scale}]}}>
      {props.children}
    </Animated.View>
  );
};

export default ScaleUpView;
