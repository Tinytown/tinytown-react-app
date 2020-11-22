import React from 'react';
import { View, Text } from 'react-native';
import { create } from 'library/utils/normalize.js'
import RES from 'res';
import IconButton from './IconButton';

const NavBar = ({ label = 'Label', onClose, children }) => {
  return (
    <View style={styles.navContainer}>
      <View style={[styles.itemsContainer, { flexDirection: 'row' }]}>
        <IconButton icon='close' color={RES.COLORS.graniteGray} onPress={onClose}/>
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
    backgroundColor: RES.COLORS.justWhite,
  },

  itemsContainer: {
    flex: 1,
    alignItems: 'center',
  },

  navLabel: {
    color: RES.COLORS.asphaltGray,
    left: 12,
    top: 1,
    ...RES.TYPOGRAPHY.headline5,
  },
});

export default NavBar;
