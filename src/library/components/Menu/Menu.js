import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Modal from '../Modal';
import { useAnimation } from 'library/hooks';
import { COLORS, SHAPES, normalizeStyles } from 'res';

const Menu = ({
  showMenu = false,
  setShowMenu = () => console.log('Pass a setShowMenu callback to this component'),
  triggerLayout = {},
  children,
}) => {
  const [animation, animateMenu, setTriggerLayout, setMenuLayout] = useAnimation('menu');

  useEffect(() => {
    showMenu ? animateMenu('show') : animateMenu('hide');
  }, [showMenu]);

  useEffect(() => {
    if (triggerLayout) {
      const { width, height, x, y } = triggerLayout.nativeEvent.layout;
      setTriggerLayout({ width, height, x, y });
    }
  }, [triggerLayout]);

  const onLayoutHandler = (menuLayout) => {
    const { width, height } = menuLayout.nativeEvent.layout;
    setMenuLayout({ width, height });
  };

  return (
    <Modal visible={showMenu} setVisible={setShowMenu} >
      <Animated.View style={animation} >
        <View onLayout={onLayoutHandler} style={styles.container}>
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
