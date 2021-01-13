import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { COLORS, SHAPES, STRINGS, normalizeStyles } from 'res';
import Pressable from './hoc/Pressable'
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
            <Pressable
              containerStyle={styles.accountButton}
              onPress={() => setShowMenu(true)}>
              <Image
                source={require('res/img/placeholder.png')}
                style={styles.avatarImage}>
              </Image>
            </Pressable>}>
          <MenuItem label={STRINGS.menuItem.about} icon='info' onPress={() => setShowMenu(false)}/>
          <MenuDivider />
          <MenuItem label={STRINGS.menuItem.signOut} icon='signOut' onPress={() => setShowMenu(false)}/>
        </Menu>
      </View>
    </View>
  )
}

const styles = normalizeStyles({
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
    backgroundColor: COLORS.asphaltGray,
    borderRadius: SHAPES.radiusAll,
  },

  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: SHAPES.radiusAll,
  },
});

export default HomeBar;
