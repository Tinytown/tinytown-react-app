import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import Modal from '../Modal';
import { useAnimation } from 'library/hooks';
import { Config } from 'context';
import { SHAPES, normalizeStyles } from 'res';

const Menu = ({
  showMenu = false,
  setShowMenu = () => console.log('Pass a setShowMenu callback to this component'),
  triggerLayout = {},
  children,
}) => {
  const { COLORS } = useContext(Config.Context);
  const styles = generateStyles({ COLORS });
  const [animation, animateMenu, setTriggerLayout, setMenuLayout, containerAnimation] = useAnimation('menu');

  useEffect(() => {
    showMenu ? animateMenu('show') : animateMenu('hide');
  }, [showMenu]);

  useEffect(() => {
    if (triggerLayout) {
      const { layout } = triggerLayout.nativeEvent;
      setTriggerLayout(layout);
    }
  }, [triggerLayout]);

  const onLayoutHandler = (event) => {
    event.persist();
    const { width, height } = event.nativeEvent.layout;
    setMenuLayout({ width, height });
  };

  return (
    <Modal visible={showMenu} setVisible={setShowMenu} >
      <Animated.View style={animation}>
        <Animated.View onLayout={onLayoutHandler} style={[styles.container, containerAnimation]}>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const generateStyles = ({ COLORS }) => {
  return normalizeStyles({
    container: {
      position: 'absolute',
      backgroundColor: COLORS.basics.justWhite,
      paddingVertical: 8,
      borderRadius: SHAPES.radiusMd,
      ...SHAPES.elevGray2,
    },
  }); };

Menu.propTypes = {
  showMenu: PropTypes.bool,
  setShowMenu: PropTypes.func,
  triggerLayout: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default Menu;
