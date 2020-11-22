import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { create } from 'library/utils/normalize.js'
import RES from 'res';
import { Menu, MenuDivider, MenuItem } from './Menu';

const HomeBar = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <View style={[styles.homeContainer]}>
      <View style={[styles.itemsContainer, { flexDirection: 'row-reverse' }]}>
        <Menu
          showing={showMenu}
          hideMenu={() => setShowMenu(false)}
          button={
            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => setShowMenu(true)}>
              <Image
                source={require('res/img/placeholder.png')}
                style={styles.avatarImage}>
              </Image>
            </TouchableOpacity>}>
          <MenuItem label={RES.STRINGS.menuItem.about} icon='info' onPress={() => setShowMenu(false)}/>
          <MenuDivider />
          <MenuItem label={RES.STRINGS.menuItem.signOut} icon='signOut' onPress={() => setShowMenu(false)}/>
        </Menu>
      </View>
    </View>
  )
}

const styles = create({
  homeContainer: {
    flexDirection: 'row',
    height: 72,
    paddingHorizontal: 16,
  },

  itemsContainer: {
    flex: 1,
    alignItems: 'center',
  },

  accountButton: {
    width: 44,
    height: 44,
    marginRight: -2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RES.COLORS.asphaltGray,
    borderRadius: RES.SHAPES.radiusAll,
  },

  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: RES.SHAPES.radiusAll,
  },
});

export default HomeBar;
