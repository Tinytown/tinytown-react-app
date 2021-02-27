import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Linking, Keyboard, Platform } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import functions from '@react-native-firebase/functions';
import { useDispatch, useSelector } from 'react-redux';
import { createShout } from 'rdx/shoutState';
import { storeData, getData } from 'library/apis/storage';
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
      text: shoutString,
      sourcePlatform: Platform.OS,
      coordinates,
      sendTo: {
        twitter,
        twitterGeo: twitterGeo.enabled,
      },
    };

    dispatch(createShout(shout));
    onCloseHandler();
  };

  // Limit indicator
  useEffect(() => {
    const charsLeft = CHAR_LIMIT - shoutString.length;
    // Set closeConfirmed if there's content in ShoutBox
    shoutString.length ? setCloseConfirmed(false) : setCloseConfirmed(true);

    // Change state depending on chars left
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
  const [twitter, setTwitter] = useState(false);
  const [twitterGeo, setTwitterGeo] = useState({ enabled: false, loading: false });
  const [lann, setLann] = useState(false);
  const [settingsChip, setSettingsChip] = useState({
    icon: 'settings',
    label: STRINGS.shouts.settingsChip.default,
    theme: 'hairline',
  });
  const megaphoneList = getListContent('megaphone');

  // Show and hide Megaphone Settings
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

  // Check Twitter account location settings
  const checkTwitterGeo = async () => {
    if (!twitterGeo.enabled) {
      setTwitterGeo({ enabled: false, loading: true });
      try {
        const { data: geoEnabled } = await functions().httpsCallable('checkTwitterGeo')();
        if (geoEnabled) {
          setTwitterGeo({ enabled: true, loading: false });
        } else {
          // Open dialog to help user enable geo in Twitter
          const {
            dialog: { twitterGeo: { title, body } },
            actions: { cancel },
            navigation: { twitterSettings },
          } = STRINGS;
          Alert.alert(title, body,
            [
              { text: cancel, onPress: () => {} },
              { text: twitterSettings, onPress: () => Linking.openURL(STRINGS.links.twitterGeo) },
            ],
          );
          setTwitterGeo({ enabled: false, loading: false });
        }
      } catch (error) {
        console.log(error);
        setTwitterGeo({ enabled: false, loading: false });
      }
    } else {
      setTwitterGeo({ enabled: false, loading: false });
    }
  };

  // Assign state using list item keys
  const assignState = (key, prop) => {
    switch (key) {
    case 'twitter':
      return prop === 'toggle' ? twitter : () => setTwitter(!twitter);
    case 'geo':
      return prop === 'toggle' ? twitterGeo.enabled : () => checkTwitterGeo();
    case 'lann':
      return prop === 'toggle' ? lann : () => setLann(!lann);
    default:
      return;
    }
  };

  // Close settings when user leaves view
  useEffect(() => {
    !openSheet && setShowSettings(false);
  }, [openSheet]);

  // Change settings chip content
  const getChipContent = () => {
    if (twitterGeo.enabled) {
      return { icon: 'twitter', label: STRINGS.shouts.settingsChip.twitterGeo, theme: 'hairline blue' };
    } else if (twitter) {
      return { icon: 'twitter', label: STRINGS.shouts.settingsChip.twitter, theme: 'hairline blue' };
    } else if (lann) {
      return { icon: 'lab', label: STRINGS.shouts.settingsChip.lann, theme: 'hairline red' };
    } else {
      return { icon: 'settings', label: STRINGS.shouts.settingsChip.default, theme: 'hairline' };
    }
  };

  useEffect(() => {
    setSettingsChip(() => getChipContent());
  }, [twitter, twitterGeo, lann]);

  // Render settings list
  renderedList = megaphoneList.map(({ key, title, body, icon, theme, activeColor, children }) => (
    <FeatureCard
      key={key}
      title={title}
      body={body}
      icon={icon}
      theme={theme}
      activeColor={activeColor}
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

    Alert.alert(title, '',
      [
        { text: cancel, onPress: () => setOpenSheet(true) },
        { text: discard, onPress: () => setCloseConfirmed(true) },
      ],
    );
  };

  const onCloseHandler = async () => {
    await storeData('megaphone', { twitter, twitterGeo, lann });
    navigation.goBack();
  };

  // First run setup
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

    // Retrieve megaphone settings
    (async function () {
      const localSettings = await getData('megaphone');
      if (localSettings) {
        setTwitter(localSettings.twitter);
        setLann(localSettings.lann);
      }

      if (localSettings?.twitterGeo.enabled) {
        const { data: geoEnabled } = await functions().httpsCallable('checkTwitterGeo')();
        if (geoEnabled) {
          setTwitterGeo(localSettings.twitterGeo);
        } else {
          setTwitterGeo({ enabled: false, loading: false });
        }
      }
    })();

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
