
import React, { useState, useRef } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { goToUser } from 'rdx/locationState';
import { signOut } from 'rdx/authState';
import { getLocation } from 'library/apis/geolocation';
import Pressable from './hoc/Pressable';
import { Menu, MenuDivider, MenuItem } from './Menu';
import IconButton from './IconButton';
import { COLORS, SHAPES, STRINGS, normalizeStyles } from 'res';

const HomeBar = ({ signOut, goToUser, userVisible, photoURL }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuTrigger = useRef();

  const signOutHandler = () => {
    auth().signOut()
      .then(() => signOut());
  };

  return (
    <>
      {!userVisible &&
      <IconButton
        icon='crosshairs'
        onPress={() => getLocation(goToUser)}
        wrapperStyle={styles.locationBtn}
      />
      }
      <View style={styles.bar}>
        <Pressable
          onPress={() => setShowMenu(true)}
          containerStyle={styles.avatar}
          keyColor={COLORS.skyBlue600}
          ref={menuTrigger} >
          <Image
            source={{ uri: photoURL }}
            style={styles.image}
          />
        </Pressable>
      </View>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} triggerRef={menuTrigger}>
        <MenuItem label={STRINGS.menuItem.about} icon='info'/>
        <MenuDivider />
        <MenuItem label={STRINGS.menuItem.signOut} icon='signOut' onPress={signOutHandler}/>
      </Menu>
    </>
  );
};

const styles = normalizeStyles({
  bar: {
    position: 'absolute',
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
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
  },

  locationBtn: {
    position: 'absolute',
    right: 16,
    top: 78,
  },
});

const mapStateToProps = (state) => ({
  photoURL: state.auth.user?.photoURL,
  userVisible: state.location.userVisible,
});

HomeBar.propTypes = {
  signOut: PropTypes.func,
  goToUser: PropTypes.func,
  userVisible: PropTypes.bool,
  photoURL: PropTypes.string,
};

export default connect(mapStateToProps, { signOut, goToUser })(HomeBar);
