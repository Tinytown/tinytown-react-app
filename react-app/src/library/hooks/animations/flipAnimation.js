import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default (flip) => {
  const PERSPECTIVE = 275;
  const frontRotate = useSharedValue(0);
  const backRotate = useSharedValue(180);

  useEffect(() => {
    if (flip) {
      frontRotate.value = withSpring(-180);
      backRotate.value = withSpring(0);
    } else {
      frontRotate.value = withSpring(0);
      backRotate.value = withSpring(180);
    }
  }, [flip]);

  const frontAnimation = useAnimatedStyle(() => (
    {
      position: 'absolute',
      transform: [{ perspective: PERSPECTIVE }, { rotateX: `${frontRotate.value}deg` }],
      backfaceVisibility: 'hidden',
    }
  ));

  const backAnimation = useAnimatedStyle(() => (
    {
      transform: [{ perspective: PERSPECTIVE }, { rotateX: `${backRotate.value}deg` }],
      backfaceVisibility: 'hidden',
    }
  ));

  return [frontAnimation, backAnimation];
};
