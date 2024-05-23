import {ReactNode, useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import imagePath from '../assets/imagePath';
import {
  AfterNextImage,
  AfterPrevImage,
  CardImage,
  LastImage,
  NextImage,
  Nickname,
  NicknameView,
  PrevImage,
  Wrapper,
} from './useCards.style';

interface CardProps {
  card_img: string;
  nickname: string;
}

const useCards = <T extends CardProps>(
  cards: T[],
  onPress?: () => void,
): [T, () => ReactNode] => {
  const [idx, setIdx] = useState(0);
  const left = cards.length - idx;
  const isLeft = left > 2;
  const card = useMemo(() => {
    return cards[idx];
  }, [idx, cards]);

  // 애니메이션 초기값
  const screenWidth = Dimensions.get('screen').width;
  const initialX = -screenWidth * 0.8;
  const initialNextY = isLeft ? -6 : -12;
  const lastOpacity = useSharedValue(0);
  const afterNextOpacity = useSharedValue(0.9);
  const afterNextY = useSharedValue(-12);
  const nextY = useSharedValue(initialNextY);
  const nextOpacity = useSharedValue(0.9);
  const Y = useSharedValue(0);
  const opacity = useSharedValue(1);
  const X = useSharedValue(0);
  const scale = useSharedValue(1);
  const prevOpacity = useSharedValue(0.3);
  const prevX = useSharedValue(initialX);
  const prevScale = useSharedValue(0.8);
  const afterPrevOpacity = useSharedValue(0);

  // 애니메이션 스타일
  const lastAnimatedStyles = useAnimatedStyle(() => ({
    opacity: lastOpacity.value,
  }));
  const afterNextAnimatedStyles = useAnimatedStyle(() => ({
    opacity: afterNextOpacity.value,
    transform: [{translateY: afterNextY.value}],
  }));
  const nextAnimatedStyles = useAnimatedStyle(() => ({
    opacity: nextOpacity.value,
    transform: [{translateY: nextY.value}],
  }));
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {translateY: Y.value},
      {translateX: X.value},
      {scale: scale.value},
    ],
  }));
  const prevAnimatedStyles = useAnimatedStyle(() => ({
    opacity: prevOpacity.value,
    transform: [{translateX: prevX.value}, {scale: prevScale.value}],
  }));
  const afterPrevAnimatedStyles = useAnimatedStyle(() => ({
    opacity: afterPrevOpacity.value,
  }));

  // 애니메이션 실행
  const clamp = (val: number, min: number, max: number) => {
    return Math.min(Math.max(val, min), max);
  };
  const swipe = Gesture.Pan()
    .minDistance(1)
    .onUpdate(event => {
      const progress = clamp(-event.translationX / screenWidth, -1, 1);
      const value = (from: number, to: number) => {
        return from + (to - from) * Math.abs(progress);
      };

      if (progress > 0 && cards.length - 1 > idx) {
        // prev
        prevOpacity.value = value(0.3, 0);
        // card
        X.value = value(0, initialX);
        scale.value = value(1, 0.8);
        opacity.value = value(1, 0.3);
        // next
        if (left > 2) {
          nextY.value = value(-6, 0);
        } else {
          nextY.value = value(-12, 0);
        }
        nextOpacity.value = value(0.9, 1);
        if (left > 3) {
          // afterNext
          afterNextY.value = value(-12, -6);
          // last
          lastOpacity.value = value(0, 0.9);
        }
      } else if (progress <= 0) {
        // afterPrev
        afterPrevOpacity.value = value(0, 0.3);
        // prev
        prevX.value = value(initialX, 1);
        prevScale.value = value(0.8, 1);
        prevOpacity.value = value(0.3, 1);
        // card
        if (left > 1) {
          Y.value = value(0, -6);
        } else {
          Y.value = value(0, -12);
        }
        opacity.value = value(1, 0.9);
        if (left > 2) {
          // next
          nextY.value = value(-6, -12);
          // afterNext
          afterNextOpacity.value = value(0.9, 0);
        }
      }
    })
    .onEnd(event => {
      const progress = clamp(-event.translationX / screenWidth, -1, 1);
      const handleIndexUpdate = () => {
        if (progress > 0.3) {
          if (idx < cards.length - 1) {
            setIdx(idx + 1);
          }
        } else if (progress < -0.3) {
          if (idx > 0) {
            setIdx(idx - 1);
          }
        }
      };

      if (progress > 0.3 && cards.length - 1 > idx) {
        prevOpacity.value = withSequence(
          withTiming(0),
          withTiming(0.3, {duration: 0}),
        );
        X.value = withSequence(
          withTiming(initialX),
          withTiming(0, {duration: 0}),
        );
        scale.value = withSequence(
          withTiming(0.8),
          withTiming(1, {duration: 0}),
        );
        opacity.value = withSequence(
          withTiming(0.3, {}, () => {
            runOnJS(handleIndexUpdate)();
          }),
          withTiming(1, {duration: 0}),
        );
        if (left < 4) {
          nextY.value = withSequence(
            withTiming(0),
            withTiming(-12, {duration: 0}),
          );
        } else {
          nextY.value = withSequence(
            withTiming(0),
            withTiming(initialNextY, {duration: 0}),
          );
        }
        nextOpacity.value = withSequence(
          withTiming(1),
          withTiming(0.9, {duration: 0}),
        );
        if (left > 3) {
          afterNextY.value = withSequence(
            withTiming(-6),
            withTiming(-12, {duration: 0}),
          );
          lastOpacity.value = withSequence(
            withTiming(0.9),
            withTiming(0, {duration: 0}),
          );
        }
      } else if (progress < -0.3 && idx > 0) {
        afterPrevOpacity.value = withSequence(
          withTiming(0.3),
          withTiming(0, {duration: 0}),
        );
        prevX.value = withSequence(
          withTiming(0),
          withTiming(initialX, {duration: 0}),
        );
        prevScale.value = withSequence(
          withTiming(1),
          withTiming(0.8, {duration: 0}),
        );
        prevOpacity.value = withSequence(
          withTiming(1),
          withTiming(0.3, {duration: 0}),
        );
        if (left > 1) {
          Y.value = withSequence(withTiming(-6), withTiming(0, {duration: 0}));
        } else {
          Y.value = withSequence(withTiming(-12), withTiming(0, {duration: 0}));
        }
        opacity.value = withSequence(
          withTiming(0.9, {}, () => {
            runOnJS(handleIndexUpdate)();
          }),
          withTiming(1, {duration: 0}),
        );

        if (left > 1) {
          nextY.value = withSequence(
            withTiming(-12),
            withTiming(-6, {duration: 0}),
          );
          afterNextOpacity.value = withSequence(
            withTiming(0),
            withTiming(0.9, {duration: 0}),
          );
        }
        if (left > 2) {
        }
      } else {
        afterPrevOpacity.value = withTiming(0);
        prevX.value = withTiming(-screenWidth * 0.8);
        prevScale.value = withTiming(0.8);
        prevOpacity.value = withTiming(0.3);
        X.value = withTiming(0);
        Y.value = withTiming(0);
        scale.value = withTiming(1);
        opacity.value = withTiming(1);
        nextY.value = withTiming(initialNextY);
        nextOpacity.value = withTiming(0.9);
        afterNextY.value = withTiming(-12);
        afterNextOpacity.value = withTiming(0.9);
        lastOpacity.value = withTiming(0);
      }
    })
    .runOnJS(true);

  // 컨테이너
  const CardContainer = () => {
    return (
      <GestureDetector gesture={swipe}>
        <Wrapper onPress={onPress}>
          {left > 3 && (
            <LastImage
              source={imagePath[cards[idx + 3].card_img]}
              resizeMode="contain"
              style={lastAnimatedStyles}
            />
          )}
          {left > 2 && (
            <AfterNextImage
              source={imagePath[cards[idx + 2].card_img]}
              resizeMode="contain"
              style={afterNextAnimatedStyles}
            />
          )}
          {left > 1 && (
            <NextImage
              source={imagePath[cards[idx + 1].card_img]}
              resizeMode="contain"
              style={nextAnimatedStyles}
              $isLeft={isLeft}
            />
          )}
          <CardImage
            source={imagePath[cards[idx].card_img]}
            resizeMode="contain"
            style={animatedStyles}
          />
          <NicknameView style={animatedStyles}>
            <Nickname>{card.nickname}</Nickname>
          </NicknameView>
          {idx > 1 && (
            <AfterPrevImage
              source={imagePath[cards[idx - 2].card_img]}
              resizeMode="contain"
              style={afterPrevAnimatedStyles}
            />
          )}
          {idx > 0 && (
            <PrevImage
              source={imagePath[cards[idx - 1].card_img]}
              resizeMode="contain"
              style={prevAnimatedStyles}
            />
          )}
        </Wrapper>
      </GestureDetector>
    );
  };

  return [card, CardContainer];
};

export default useCards;
