import React, { useState, useRef } from 'react';
import { View, Image } from 'react-native';
import { COLORS, SHAPES, STRINGS, normalizeStyles } from 'res';
import Pressable from './hoc/Pressable'
import { Menu, MenuDivider, MenuItem } from './Menu';

const HomeBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuTrigger = useRef();

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => setShowMenu(true)} ref={menuTrigger} >
          <Image
            source={require('res/img/placeholder.png')}
            style={styles.avatar}/>
        </Pressable>
      </View>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} triggerRef={menuTrigger}>
        <MenuItem label={STRINGS.menuItem.about} icon='info'/>
        <MenuDivider />
        <MenuItem label={STRINGS.menuItem.signOut} icon='signOut'/>
      </Menu>
    </>
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
