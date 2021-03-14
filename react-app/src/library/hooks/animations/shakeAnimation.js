import { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate } from 'react-native-reanimated';
import { normalizeValue } from 'res';

export default () => {
  const TRANSLATE_AMOUNT = normalizeValue(8);
  const timing = useSharedValue(0);

  const config = {
    easing: Easing.bounce,
    duration: 500,
  };

  const animation = useAnimatedStyle(() => (
    { transform: [{
      translateX: interpolate(
        timing.value,
        [0, 0.5, 1, 1.5, 2, 2.5, 3],
        [0, -TRANSLATE_AMOUNT, 0, TRANSLATE_AMOUNT, 0, -TRANSLATE_AMOUNT, 0],
      ) }] }
  ));

  const animate = () => {
    timing.value = 0;
    timing.value = withTiming(3, config);
  };

  return [animation, animate];
};
