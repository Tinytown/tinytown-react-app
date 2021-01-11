import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles } from 'res';
import IconButton from './IconButton';

const NavBar = ({ label = 'Label', onClose, children }) => {
  return (
    <View style={styles.navContainer}>
      <View style={[styles.itemsContainer, { flexDirection: 'row' }]}>
        <IconButton icon='close' color={COLORS.graniteGray} onPress={onClose}/>
        <Text style={styles.navLabel}>{label}</Text>
      </View>
      <View style={[styles.itemsContainer, { flexDirection: 'row-reverse' }]}>
        {children}
      </View>
    </View>
  )
}

const styles = normalizeStyles({
  navContainer: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 4,
    backgroundColor: COLORS.justWhite,
  },

  itemsContainer: {
    flex: 1,
    alignItems: 'center',
  },

  navLabel: {
    color: COLORS.asphaltGray,
    left: 12,
    top: 1,
    ...TYPOGRAPHY.headline5,
  },
});

export default NavBar;
