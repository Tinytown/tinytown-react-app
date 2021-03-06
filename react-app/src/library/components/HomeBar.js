
import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import ImageColors from 'react-native-image-colors';
import { connect } from 'react-redux';
import { goToUser, goToTarget } from 'rdx/locationState';
import { signOut } from 'rdx/authState';
import { getLocation } from 'library/apis/geolocation';
import { Config } from 'context';
import { Pressable } from 'library/components/hoc';
import { Menu, MenuDivider, MenuItem } from './Menu';
import IconButton from './IconButton';
import Chip from './Chip';
import { useAnimation } from 'library/hooks';
import { COLORS, SHAPES, IMAGES, normalizeStyles } from 'res';

const HomeBar = ({ signOut, goToUser, goToTarget, userVisible, photoURL, shoutNotifications }) => {
  const TRANSLATE_AMOUNT = 120;
  const { STRINGS } = useContext(Config.Context);
  const [showMenu, setShowMenu] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState(null);
  const [avatarColors, setAvatarColors] = useState(null);
  const [newShout, setNewShout] = useState(null);
  const [alertPressed, setAlertPressed] = useState(false);
  const [showChip, setShowChip] = useState(false);
  const navigation = useNavigation();

  const showLocationBtn = userVisible !== null && !userVisible;
  const showAlertBtn = userVisible !== null && !alertPressed && newShout;
  const [alertBtnAnimation, animateAlertBtn] = useAnimation('shake');
  const [alertChipAnimation] = useAnimation('slide', TRANSLATE_AMOUNT, showAlertBtn && showChip);
  const styles = generateStyles({ avatarColors, TRANSLATE_AMOUNT });

  useEffect(() => {
    if (shoutNotifications && !newShout) {
      setAlertPressed(false);
      setShowChip(true);
      setNewShout(shoutNotifications[shoutNotifications.length - 1]);
      animateAlertBtn();
      setTimeout(() => {
        setShowChip(false);
      }, 5000);
    }
  }, [shoutNotifications]);

  useEffect(() => {
    if (photoURL) {
      ImageColors.getColors(photoURL, { fallback: COLORS.asphaltGray800 })
        .then((colors) => setAvatarColors(colors))
        .catch((err) => console.log(err));
    }
  }, [photoURL]);

  const onAlertPressHandler = () => {
    goToTarget(newShout.coordinates);
    setNewShout(null);
    setAlertPressed(true);
  };

  return (
    <>
      <View style={styles.btnContainer}>
        {showLocationBtn &&
          <IconButton
            icon='crosshairs'
            theme='lt-white-raised'
            onPress={() => getLocation(goToUser)}
            wrapperStyle={styles.locationBtn}
          />
        }
        {showAlertBtn &&
          <View style={styles.alertBtContainer} >
            <Animated.View style={[styles.alertChip, alertChipAnimation]} >
              <Chip
                label='New shout'
                theme='dt-gray-raised'
                onPress={onAlertPressHandler}
              />
            </Animated.View>
            <Animated.View style={alertBtnAnimation}>
              <IconButton
                icon='notifications'
                theme='dt-gray-raised'
                onPress={onAlertPressHandler}
              />
            </Animated.View>
          </View>
        }
      </View>
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

const generateStyles = ({ avatarColors, TRANSLATE_AMOUNT }) => {
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
      btnContainer: {
        position: 'absolute',
        alignItems: 'flex-end',
        right: 16,
        top: 76,
      },
      locationBtn: {
        marginBottom: 12,
      },
      alertBtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      alertChip: {
        marginRight: 8,
        transform: [{ translateX: TRANSLATE_AMOUNT }],
      },
    })
  );
};

const mapStateToProps = (state) => ({
  photoURL: state.auth.user?.photoURL,
  userVisible: state.location.userVisible,
  shoutNotifications: state.shouts.notifications,
});

HomeBar.propTypes = {
  photoURL: PropTypes.string,
  userVisible: PropTypes.bool,
  signOut: PropTypes.func,
  goToUser: PropTypes.func,
};

export default connect(mapStateToProps, { signOut, goToUser, goToTarget })(HomeBar);
