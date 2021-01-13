import { useSpring } from 'react-spring'

export default (animationType) => {
  const bounceAnimation = () => {
    const [props, set] = useSpring(() => ({
      scale: 1,
      config: { mass: 1, tension: 300, friction: 10 },
    }));

    const animation = { transform: [{ scale: props.scale }] };
    const handlePressIn = () => set({ scale: 0.93 });
    const handlePressOut = () => set({ scale: 1 });

    return [animation, handlePressIn, handlePressOut]
  }

  switch (animationType) {
  case 'bounce':
    return bounceAnimation();
  default:
    return [];
  }
}
