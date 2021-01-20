import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Modal from '../Modal';
import { useAnimation } from 'library/hooks';
import { COLORS, SHAPES, normalizeStyles } from 'res';

const Menu = ({
  showMenu = false,
  setShowMenu = () => console.log('Pass a setShowMenu callback to this component'),
  triggerRef = {},
  children }) => {
  const [animation, animateMenu, setTriggerProps, setDimensions] = useAnimation('menu');

  useEffect(() => {
    triggerRef.current?.measureInWindow((left, top, width, height) => setTriggerProps({ left, top, width, height }));
  }, [triggerRef?.current]);

  useEffect(() => {
    showMenu ? animateMenu('show') : animateMenu('hide');
  }, [showMenu]);

  return (
    <Modal visible={showMenu} setVisible={setShowMenu} >
      <Animated.View style={animation} >
        <View onLayout={setDimensions} style={styles.container}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = normalizeStyles({
  container: {
    position: 'absolute',
    backgroundColor: COLORS.justWhite,
    paddingVertical: 8,
    borderRadius: SHAPES.radiusMd,
    ...SHAPES.elevGray2,
  },
});

export default Menu;
