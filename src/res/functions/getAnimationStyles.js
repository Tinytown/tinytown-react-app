import { useSpring } from 'react-spring'

export default (animationType) => {
  let animation = null;
  let handlePressIn = null;
  let handlePressOut = null;

  switch (animationType) {
  case 'bounce':
    const [props, set] = useSpring(() => ({
      scale: 1,
      config: { mass: 1, tension: 300, friction: 10 },
    }));

    animation = { transform: [{ scale: props.scale }] };
    handlePressIn = () => set({ scale: 0.93 });
    handlePressOut = () => set({ scale: 1 });

    return { animation, handlePressIn, handlePressOut }
  default:
    return { animation, handlePressIn, handlePressOut };
  }
}
