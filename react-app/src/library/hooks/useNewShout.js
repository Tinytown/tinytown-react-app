import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Linking, Keyboard, Platform } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import functions from '@react-native-firebase/functions';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocalShouts, updateShoutsSetting } from 'rdx/shoutState';
import sheetConfig from 'library/components/BottomSheet/config';
import { Config } from 'context';
import { FeatureCard, FeatureItem } from 'library/components';
import  useAnimation  from './useAnimation';
import { normalizeStyles, getListContent } from 'res';

export default (sheetLayout) => {
  const CHAR_LIMIT = 80;
  const CHAR_WARNING = 10;
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.location.user);
  const { STRINGS } = useContext(Config.Context);
  const styles = normalizeStyles({
    feature: {
      marginBottom: 16,
    },
  });

  // --- ANIMATION --- //

  const { ANIMATION_OFFSET } = sheetConfig;
  const [keyboardOpen, setKeyboardOpen] = useState(true);
  const [chipAnimation, animateChip] = useAnimation('bounce');
  const frontSheetTranslateY = useSharedValue(0);
  const [translateY, setTranslateY] = useState(useSharedValue(0));
  const debouncedBounce = useRef(_.debounce(animateChip, 400, { leading: true, trailing: false })); // 10/10 func name
  const translateConfig = {
    mass: 1,
    damping: 32,
    stiffness: 500,
  };

  const frontSheetAnimation = useAnimatedStyle(() => ({ transform: [{ translateY: frontSheetTranslateY.value }] }));

  // --- SHOUT CONTENT --- //

  const [shoutString, setShoutString] = useState('');
  const [showChip, setShowChip] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSubmitHandler = () => {
    let coordinates = [userLocation[0], userLocation[1]];

    if (lann) {
      const MAX = 1.0002;
      const MIN = 0.9998;

      const randLon = Math.random() * (MAX - MIN) + MIN;
      const randLat = Math.random() * (MAX - MIN) + MIN;

      coordinates = [userLocation[0] * randLon, userLocation[1] * randLat];
    }

    const shout = {
      coordinates,
      createdAt: Date.now(),
      localId: Math.floor(Math.random() * 1000),
      sendTo: {
        twitter,
        twitterGeo: twitterGeo.enabled,
      },
      sourcePlatform: Platform.OS,
      text: shoutString,
    };

    dispatch(updateLocalShouts('add', shout));
    onCloseHandler();
  };

  // Limit indicator
  useEffect(() => {
    const charsLeft = CHAR_LIMIT - shoutString.length;
    // set closeConfirmed if there's content in ShoutBox
    shoutString.length ? setCloseConfirmed(false) : setCloseConfirmed(true);

    // change state depending on chars left
    if (charsLeft >= 0 && charsLeft <= CHAR_WARNING) {
      setDisabled(false);
      setShowChip(true);
    } else if (charsLeft < 0) {
      setDisabled(true);
      setShowChip(true);
      debouncedBounce.current();
    } else if (shoutString.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setShowChip(false);
    }
  }, [shoutString]);

  // --- SETTINGS --- //

  const [showSettings, setShowSettings] = useState(false);
  const { twitter, twitterGeo, lann } = useSelector((state) => state.shouts.settings);
  const [settingsChip, setSettingsChip] = useState({
    icon: 'settings',
    label: STRINGS.shouts.settingsChip.default,
    theme: 'lt-white-hairline',
  });
  const megaphoneList = getListContent('megaphone');

  // show and hide Megaphone Settings
  useEffect(() => {
    if (showSettings) {
      Keyboard.dismiss();
      if (!keyboardOpen) {
        frontSheetTranslateY.value = withSpring((sheetLayout.height - ANIMATION_OFFSET), translateConfig);
        translateY.value = withSpring(-24, translateConfig);
      }
    } else {
      frontSheetTranslateY.value = withSpring(0, translateConfig);
      translateY.value = withSpring(ANIMATION_OFFSET, translateConfig);
    }
  }, [showSettings, keyboardOpen]);

  // check Twitter account location settings
  const checkTwitterGeo = async () => {
    if (!twitterGeo.enabled) {
      dispatch(updateShoutsSetting('twitterGeo', { enabled: false, loading: true }));
      try {
        const { data: geoEnabled } = await functions().httpsCallable('checkTwitterGeo')();
        if (geoEnabled) {
          dispatch(updateShoutsSetting('twitterGeo', { enabled: true, loading: false }));
        } else {
          // open dialog to help user enable geo in Twitter
          const {
            dialog: { twitterGeo: { title, body } },
            actions: { cancel },
            navigation: { goToTwitter },
          } = STRINGS;
          Alert.alert(title, body,
            [
              { text: cancel, onPress: () => {} },
              { text: goToTwitter, onPress: () => Linking.openURL(STRINGS.links.twitterGeo) },
            ],
          );
          dispatch(updateShoutsSetting('twitterGeo', { enabled: false, loading: false }));
        }
      } catch (error) {
        console.log(error);
        dispatch(updateShoutsSetting('twitterGeo', { enabled: false, loading: false }));
      }
    } else {
      dispatch(updateShoutsSetting('twitterGeo', { enabled: false, loading: false }));
    }
  };

  // assign state using list item keys
  const assignState = (key, prop) => {
    switch (key) {
    case 'twitter':
      return prop === 'toggle' ? twitter : () => dispatch(updateShoutsSetting('twitter', !twitter));
    case 'geo':
      return prop === 'toggle' ? twitterGeo.enabled : () => checkTwitterGeo();
    case 'lann':
      return prop === 'toggle' ? lann : () => dispatch(updateShoutsSetting('lann', !lann));
    default:
      return;
    }
  };

  // close settings when user leaves view
  useEffect(() => {
    !openSheet && setShowSettings(false);
  }, [openSheet]);

  // change settings chip content
  const getChipContent = () => {
    if (twitterGeo.enabled) {
      return { icon: 'twitter', label: STRINGS.shouts.settingsChip.twitterGeo, theme: 'lt-blue-hairline' };
    } else if (twitter) {
      return { icon: 'twitter', label: STRINGS.shouts.settingsChip.twitter, theme: 'lt-blue-hairline' };
    } else if (lann) {
      return { icon: 'lab', label: STRINGS.shouts.settingsChip.lann, theme: 'lt-red-hairline' };
    } else {
      return { icon: 'settings', label: STRINGS.shouts.settingsChip.default, theme: 'lt-white-hairline' };
    }
  };

  useEffect(() => {
    setSettingsChip(() => getChipContent());
  }, [twitter, twitterGeo, lann]);

  // render settings list
  renderedList = megaphoneList.map(({ key, title, body, icon, theme, activeTheme, children }) => (
    <FeatureCard
      key={key}
      title={title}
      body={body}
      icon={icon}
      theme={theme}
      activeTheme={activeTheme}
      wrapperStyle={styles.feature}
      toggle={assignState(key, 'toggle')}
      onPress={assignState(key, 'onPress')}
    >
      {children?.map(({ key, title, body, icon }) => (
        <FeatureItem
          key={key}
          title={title}
          body={body}
          icon={icon}
          toggle={assignState(key, 'toggle')}
          loading={key === 'geo' && twitterGeo.loading}
          onPress={assignState(key, 'onPress')}
        />
      ))}
    </FeatureCard>
  ));

  // --- NAVIGATION --- //

  const [closeConfirmed, setCloseConfirmed] = useState(true);
  const [openSheet, setOpenSheet] = useState(true);
  const navigation = useNavigation();

  // onClose Handlers
  const onCloseConfirmHandler = () => {
    const {
      dialog: { shout: { title } },
      actions: { cancel, discard },
    } = STRINGS;

    setShowSettings(false);
    Alert.alert(title, '',
      [
        { text: cancel, onPress: () => setOpenSheet(true) },
        { text: discard, onPress: () => setCloseConfirmed(true) },
      ],
    );
  };

  const onCloseHandler = async () => {
    navigation.goBack();
  };

  // first run setup
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return [
    {
      shoutString,
      setShoutString,
      chipString: `${shoutString.length} / ${CHAR_LIMIT}`,
      chipAnimation,
      showChip,
      disabled,
    },
    { settingsChip, renderedList },
    { openSheet, setOpenSheet, showSettings, setShowSettings },
    { frontSheetAnimation, translateY, setTranslateY },
    { closeConfirmed, onCloseConfirmHandler, onCloseHandler, onSubmitHandler },
  ];
};
