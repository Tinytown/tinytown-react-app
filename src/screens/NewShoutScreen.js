import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavBar, Scrim } from 'library/components';
import { useAnimation } from 'library/hooks';
import { SHAPES, COLORS, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [animation] = useAnimation('sheet');

  const cardStyle = { ...styles.card, ...{ paddingBottom: insets.bottom } };
  return (
    <>
      <Scrim onPress={() => navigation.goBack()} />
      <View style={cardStyle} >
        <NavBar label='' onClose={() => navigation.goBack()} />
        <View style={styles.placeholder} />
      </View>
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
    height: 140,
    marginVertical: 24,
    borderRadius: 8,
    backgroundColor: COLORS.snowGray,
  },
});

export default NewShoutScreen;
