import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { signOut, goToUser } from 'rdx/actions';
import { getLocation } from 'library/apis/geolocation';
import { create } from 'library/utils/normalize.js';
import { Menu, MenuDivider, MenuItem } from './Menu';
import IconButton from './IconButton';
import RES from 'res';

const HomeBar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const signOutHandler = () => {
    auth().signOut()
      .then(() => props.signOut());
    setShowMenu(false);
  };

  return (
    <View style={styles.container}>
      {!props.userVisible ?
        <IconButton
          icon="crosshairs"
          color={RES.COLORS.justWhite}
          style={styles.locationButton}
          onPress={() => getLocation(props.goToUser)}/>
        : null }
      <Menu
        showing={showMenu}
        hideMenu={() => setShowMenu(false)}
        button={
          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => setShowMenu(true)}>
            <Image
              source={{ uri: props.photoURL }}
              style={styles.avatarImage}>
            </Image>
          </TouchableOpacity>}>
        <MenuItem label={RES.STRINGS.menuItem.about} icon='info' onPress={() => setShowMenu(false)}/>
        <MenuDivider />
        <MenuItem label={RES.STRINGS.menuItem.signOut} icon='signOut' onPress={signOutHandler}/>
      </Menu>

    </View>
  );
};

const styles = create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 72,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  accountButton: {
    width: 44,
    height: 44,
    marginRight: -2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RES.COLORS.graniteGray,
    borderRadius: RES.SHAPES.radiusAll,
  },

  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: RES.SHAPES.radiusAll,
  },

  locationButton: {
    width: 44,
    height: 44,
    position: 'absolute',
    right: 14,
    top: 78,
    backgroundColor: RES.COLORS.asphaltGray,
    borderWidth: 2,
    borderColor: RES.COLORS.graniteGray,
  },
});

const mapStateToProps = (state) => ({
  photoURL: state.auth.user?.photoURL,
  userVisible: state.location.userVisible,
});

export default connect(mapStateToProps, { signOut, goToUser })(HomeBar);
