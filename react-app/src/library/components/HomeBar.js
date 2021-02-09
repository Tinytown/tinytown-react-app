
import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import ImageColors from 'react-native-image-colors';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { goToUser } from 'rdx/locationState';
import { signOut } from 'rdx/authState';
import { getLocation } from 'library/apis/geolocation';
import { Pressable } from 'library/components/hoc';
import { Menu, MenuDivider, MenuItem } from './Menu';
import IconButton from './IconButton';
import { useAnimation } from 'library/hooks';
import { COLORS, SHAPES, STRINGS, normalizeStyles } from 'res';

const HomeBar = ({ signOut, goToUser, userVisible, photoURL }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState(null);
  const [avatarColors, setAvatarColors] = useState(null);
  const showButton = userVisible !== null && !userVisible;
  const [showAnimation] = useAnimation('show', showButton);
  const styles = generateStyles({ avatarColors });

  useEffect(() => {
    ImageColors.getColors(photoURL, { fallback: COLORS.asphaltGray800 })
      .then((colors) => setAvatarColors(colors))
      .catch((err) => console.log(err));
  }, []);

  const signOutHandler = () => {
    auth().signOut()
      .then(() => signOut());
  };

  return (
    <>
      <Animated.View style={[styles.locationBtn, showAnimation]} >
        <IconButton
          icon='crosshairs'
          onPress={() => getLocation(goToUser)}
        />
      </Animated.View>
      <View style={styles.bar}>
        <Pressable
          onPress={() => setShowMenu(true)}
          containerStyle={styles.avatar}
          keyColor={COLORS.skyBlue400}
          onLayout={(event) => {
            event.persist();
            setTriggerLayout(event);
          }}
        >
          <Image
            source={{ uri: photoURL }}
            style={styles.image}
          />
        </Pressable>
      </View>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} triggerLayout={triggerLayout}>
        <MenuItem label={STRINGS.menuItem.about} icon='info'/>
        <MenuDivider />
        <MenuItem label={STRINGS.menuItem.signOut} icon='signOut' onPress={signOutHandler}/>
      </Menu>
    </>
  );
};

const generateStyles = ({ avatarColors }) => {
  return (
    normalizeStyles({
      bar: {
        position: 'absolute',
        flexDirection: 'row-reverse',
        width: '100%',
        height: 72,
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      avatar: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SHAPES.radiusAll,
        borderWidth: 2,
        borderColor: COLORS.justWhite,
        backgroundColor: COLORS.justWhite,
        ...(avatarColors && SHAPES.elevGray5),
        shadowColor: avatarColors?.background,
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: SHAPES.radiusAll,
      },
      locationBtn: {
        position: 'absolute',
        right: 16,
        top: 76,
      },
    })
  );
};

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
