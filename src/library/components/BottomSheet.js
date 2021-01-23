import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scrim from './Scrim';
import { useAnimation } from 'library/hooks';
import { SHAPES, COLORS, normalizeStyles } from 'res';

const BottomSheet = ({
  openSheet = true,
  setOpenSheet = () => console.log('Pass a setOpenSheet callback to this component'),
  onClose = () => console.log('Pass an onClose callback to this component'),
  children,
}) => {
  const ANIMATION_OFFSET = 80;
  const insets = useSafeAreaInsets();
  const [sheetAnimation, scrimAnimation, closeSheet, setSheetLayout] = useAnimation('sheet', ANIMATION_OFFSET);
  const cardStyle = { ...styles.card, ...{ paddingBottom: insets.bottom + ANIMATION_OFFSET } };

  const onLayoutHandler = (event) => {
    event.persist();
    const { height } = event.nativeEvent.layout;
    setSheetLayout({ height });
  };

  useEffect(() => {
    !openSheet && closeSheet(onClose);
  }, [openSheet]);

  return (
    <>
      <Scrim onPress={() => setOpenSheet(false)} animationStyle={scrimAnimation} />
      <Animated.View
        style={[cardStyle, sheetAnimation]}
        onLayout={onLayoutHandler}
      >
        {children}
      </Animated.View>
    </>
  );
};

const styles = normalizeStyles({
  card: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: COLORS.justWhite,
    ...SHAPES.elevGray2,
  },
});

BottomSheet.propTypes = {
  openSheet: PropTypes.bool,
  setOpenSheet: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.element,
};

export default BottomSheet;
