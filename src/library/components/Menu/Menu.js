import React, { useEffect } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import Animated from 'react-native-reanimated';
import { COLORS, SHAPES, normalizeStyles } from 'res';
import { useAnimation } from 'library/hooks';

const Menu = ({
  showMenu = false,
  setShowMenu = () => console.log('Pass a setShowMenu callback to this component'),
  triggerRef = {},
  children }) => {
  const RIPPLE_DURATION = 400;
  const [animation, animateMenu, setTriggerProps, setDimensions] = useAnimation('menu');

  useEffect(() => {
    triggerRef.current?.measureInWindow((left, top, width, height) => setTriggerProps({ left, top, width, height }))
  }, [triggerRef?.current])

  useEffect(() => {
    showMenu ? animateMenu('show') : animateMenu('hide');
  }, [showMenu])

  const backgroundProps = {
    style: [styles.background, !showMenu && {  display: 'none' }],
    pointerEvents: !showMenu ? 'box-none' : 'auto',
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowMenu(false)} >
        <View {...backgroundProps} />
      </TouchableWithoutFeedback>
      <Animated.View style={animation} >
        <View
          onLayout={setDimensions}
          style={styles.container}
          onStartShouldSetResponderCapture={() => {
            setTimeout(() => {
              setShowMenu(false);
            }, RIPPLE_DURATION)
          }}>
          {children}
        </View>
      </Animated.View>
    </>
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
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default Menu
