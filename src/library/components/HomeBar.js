import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { COLORS, SHAPES, STRINGS, normalizeStyles } from 'res';
import Pressable from './hoc/Pressable'
import { Menu, MenuDivider, MenuItem } from './Menu';

const HomeBar = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <View style={styles.container}>
      <Menu
        showing={showMenu}
        hideMenu={() => setShowMenu(false)}
        button={
          <Pressable onPress={() => setShowMenu(true)} >
            <Image
              source={require('res/img/placeholder.png')}
              style={styles.avatar}/>
          </Pressable>}>
        <MenuItem label={STRINGS.menuItem.about} icon='info' onPress={() => setShowMenu(false)}/>
        <MenuDivider />
        <MenuItem label={STRINGS.menuItem.signOut} icon='signOut' onPress={() => setShowMenu(false)}/>
      </Menu>
    </View>
  )
}

const styles = normalizeStyles({
  container: {
    flexDirection: 'row-reverse',
    width: '100%',
    height: 72,
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: SHAPES.radiusAll,
    borderWidth: 2,
    borderColor: COLORS.asphaltGray,
  },
});

export default HomeBar;
