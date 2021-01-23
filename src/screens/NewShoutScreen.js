import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavBar, Scrim } from 'library/components';
import { useAnimation } from 'library/hooks';
import { SHAPES, COLORS, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const ANIMATION_OFFSET = 80;

  const insets = useSafeAreaInsets();
  const [sheetAnimation, scrimAnimation, closeSheet, setSheetLayout] = useAnimation('sheet', ANIMATION_OFFSET);
  const cardStyle = { ...styles.card, ...{ paddingBottom: insets.bottom + ANIMATION_OFFSET } };

  const onLayoutHandler = (event) => {
    event.persist();
    const { height } = event.nativeEvent.layout;
    setSheetLayout({ height });
  };

  const onCloseHandler = () => {
    closeSheet(() => navigation.goBack());
  };

  return (
    <>
      <Scrim onPress={onCloseHandler} animationStyle={scrimAnimation} />
      <Animated.View
        style={[cardStyle, sheetAnimation]}
        onLayout={onLayoutHandler} >
        <NavBar label='' onClose={onCloseHandler} />
        <View style={styles.placeholder} />
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
  placeholder: {
    width: '100%',
    height: 360,
    marginVertical: 24,
    borderRadius: 8,
    backgroundColor: COLORS.snowGray,
  },
});

export default NewShoutScreen;
