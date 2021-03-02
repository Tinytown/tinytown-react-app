
import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import ImageColors from 'react-native-image-colors';
import { connect } from 'react-redux';
import { goToUser } from 'rdx/locationState';
import { signOut } from 'rdx/authState';
import { getLocation } from 'library/apis/geolocation';
import { Config } from 'context';
import { Pressable } from 'library/components/hoc';
import { Menu, MenuDivider, MenuItem } from './Menu';
import IconButton from './IconButton';
import { useAnimation } from 'library/hooks';
import { COLORS, SHAPES, IMAGES, normalizeStyles } from 'res';

const HomeBar = ({ signOut, goToUser, userVisible, photoURL }) => {
  const { STRINGS } = useContext(Config.Context);
  const [showMenu, setShowMenu] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState(null);
  const [avatarColors, setAvatarColors] = useState(null);
  const navigation = useNavigation();

  const showButton = userVisible !== null && !userVisible;
  const [showAnimation] = useAnimation('show', showButton);
  const styles = generateStyles({ avatarColors });

  useEffect(() => {
    if (photoURL) {
      ImageColors.getColors(photoURL, { fallback: COLORS.asphaltGray800 })
        .then((colors) => setAvatarColors(colors))
        .catch((err) => console.log(err));
    }
  }, [photoURL]);

  return (
    <>
      <Animated.View style={[styles.locationBtn, showAnimation]} >
        <IconButton
          icon='crosshairs'
          theme='lt-white-raised'
          onPress={() => getLocation(goToUser)}
          disabled={!showButton}
        />
      </Animated.View>
      <View style={styles.bar}>
        <Pressable
          onPress={() => setShowMenu(true)}
          containerStyle={styles.avatar}
          rippleColor={COLORS.skyBlue400}
          onLayout={(event) => {
            event.persist();
            setTriggerLayout(event);
          }}
        >
          <Image
            source={(photoURL ? { uri: photoURL } : IMAGES.placeholder)}
            style={styles.image}
          />
        </Pressable>
      </View>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} triggerLayout={triggerLayout}>
        <MenuItem label={STRINGS.navigation.settings} primaryIcon='settings' onPress={() => {
          setShowMenu(false);
          navigation.navigate('Settings');
        }}
        />
        <MenuItem label={STRINGS.core.about} primaryIcon='info' onPress={() => {
          setShowMenu(false);
          navigation.navigate('About');
        }}
        />
        <MenuDivider />
        <MenuItem label={STRINGS.auth.signOut} primaryIcon='signOut' onPress={signOut}/>
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
  photoURL: PropTypes.string,
  userVisible: PropTypes.bool,
  signOut: PropTypes.func,
  goToUser: PropTypes.func,
};

export default connect(mapStateToProps, { signOut, goToUser })(HomeBar);
