import React, { useEffect } from 'react'
import { View, Modal, TouchableWithoutFeedback } from 'react-native'
import Animated from 'react-native-reanimated';
import { COLORS, SHAPES, normalizeStyles } from 'res';
import { useAnimation } from 'library/hooks';

const Menu = ({
  showMenu = false,
  setShowMenu = () => console.log('Pass a setShowMenu callback to this component'),
  triggerRef = {},
  children }) => {
  const [animation, flip, animateMenu, setTriggerProps, setDimensions] = useAnimation('menu');

  useEffect(() => {
    triggerRef.current?.measureInWindow((left, top, width, height) => setTriggerProps({ left, top, width, height }))
  }, [triggerRef?.current])

  const hide = () => {
    animateMenu('hide', () => setShowMenu(false))
  };

  const show = () => {
    animateMenu('show', () => setShowMenu(true))
  };

  return (
    <Modal
      transparent
      visible={showMenu}
      onShow={show}
      onDismiss={() => console.log('hiding menu')}
      onRequestClose={hide}
    >
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={hide} >
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View style={animation} >
          <View onLayout={setDimensions} style={[styles.container, flip && { transform: [{ scaleX: -1 }] }]} >
            {children}
          </View>
        </Animated.View>
      </View>

    </Modal>
  )
}

const styles = normalizeStyles({
  container: {
    position: 'absolute',
    backgroundColor: COLORS.justWhite,
    paddingVertical: 8,
    borderRadius: SHAPES.radiusMd,
    ...SHAPES.elevGray2,
  },
  background: {
    width: '100%',
    height: '100%',
  },
});

export default Menu
