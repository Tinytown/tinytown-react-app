import React from 'react';
import { View, Text } from 'react-native';
import { create } from 'library/utils/normalize.js'
import R from 'res/R';
import IconButton from './IconButton';

const NavBar = ({ label = 'Label', onClose, children }) => {
  return (
    <View style={styles.navContainer}>
      <View style={[styles.itemsContainer, { flexDirection: 'row' }]}>
        <IconButton icon='close' color={R.COLORS.graniteGray} onPress={onClose}/>
        <Text style={styles.navLabel}>{label}</Text>
      </View>
      <View style={[styles.itemsContainer, { flexDirection: 'row-reverse' }]}>
        {children}
      </View>
    </View>
  )
}

const styles = create({
  navContainer: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 4,
    backgroundColor: R.COLORS.justWhite,
  },

  itemsContainer: {
    flex: 1,
    alignItems: 'center',
  },

  navLabel: {
    color: R.COLORS.asphaltGray,
    left: 12,
    top: 1,
    ...R.TYPOGRAPHY.headline5,
  },
});

export default NavBar;
