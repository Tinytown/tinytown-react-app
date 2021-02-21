import React, { useState, useEffect } from 'react';
import { Alert, Linking, Text, Keyboard } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import functions from '@react-native-firebase/functions';
import sheetConfig from 'library/components/BottomSheet/config';
import {
  IconButton,
  NavBar,
  BottomSheet,
  BottomSheetContainer,
  ShoutBox,
  Chip,
  FeatureCard,
  FeatureItem,
} from 'library/components';
import { useNewShout } from 'library/hooks';
import { COLORS, TYPOGRAPHY, STRINGS, LISTS, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const { ANIMATION_OFFSET } = sheetConfig;
  const [openSheet, setOpenSheet] = useState(true);
  const [confirmClose, setConfirmClose] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [sheetLayout, setSheetLayout] = useState(null);
  const [keyboardOpen, setKeyboardOpen] = useState(true);
  const [twitter, setTwitter] = useState(false);
  const [twitterGeo, setTwitterGeo] = useState({ enabled: false, loading: false });
  const [lann, setLann] = useState(false);
  const frontSheetTranslateY = useSharedValue(0);
  const backSheetTranslateY = useSharedValue(0);
  const [shoutContent, setShoutContent, limitIndicator, createNewShout] = useNewShout();

  const translateConfig = {
    mass: 1,
    damping: 32,
    stiffness: 500,
  };

  const frontSheetAnimation = useAnimatedStyle(() => ({ transform: [{ translateY: frontSheetTranslateY.value }] }));
  const backSheetAnimation = useAnimatedStyle(() => ({ transform: [{ translateY: backSheetTranslateY.value }] }));

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

    if (twitterGeo.enabled) {
      (async function () {
        const { data: geoEnabled } = await functions().httpsCallable('checkTwitterGeo')();
        if (!geoEnabled) {
          setTwitterGeo({ enabled: false, loading: false });
        }
      })();
    }

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  // Show and hide Megaphone Settings
  useEffect(() => {
    if (showSettings) {
      Keyboard.dismiss();
      if (!keyboardOpen) {
        frontSheetTranslateY.value = withSpring((sheetLayout.height - ANIMATION_OFFSET) / 2, translateConfig);
        backSheetTranslateY.value = withSpring((-sheetLayout.height + ANIMATION_OFFSET) / 2, translateConfig);
      }
    } else {
      frontSheetTranslateY.value = withSpring(0, translateConfig);
      backSheetTranslateY.value = withSpring(0, translateConfig);
    }
  }, [showSettings, keyboardOpen]);

  // Close settings when user leaves view
  useEffect(() => {
    !openSheet && setShowSettings(false);
  }, [openSheet]);

  // Set confirmClose if there's content in ShoutBox
  useEffect(() => {
    shoutContent.length ? setConfirmClose(false) : setConfirmClose(true);
  }, [shoutContent]);

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

  // Event Handlers
  const onLayoutHandler = (event) => {
    event.persist();
    setSheetLayout(event.nativeEvent.layout);
  };

  const onSubmitHandler = () => {
    const settings = {
      sendTo: {
        twitter,
        twitterGeo: twitterGeo.enabled,
      },
      lann,
    };
    createNewShout(settings);
    navigation.goBack();
  };

  const onCloseConfirmHandler = () => {
    const {
      dialog: { shout: { title } },
      actions: { cancel, discard },
    } = STRINGS;

    Alert.alert(title, '',
      [
        { text: cancel, onPress: () => setOpenSheet(true) },
        { text: discard, onPress: () => setConfirmClose(true) },
      ],
    );
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

  // Render settings list
  renderedList = LISTS.megaphone.map(({ key, title, body, icon, theme, activeColor, children }) => (
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

  return (
    <BottomSheet
      openSheet={openSheet}
      setOpenSheet={setOpenSheet}
      onClose={() => navigation.goBack()}
      onCloseConfirm={onCloseConfirmHandler}
      confirmClose={confirmClose}
    >
      <BottomSheetContainer style={styles.settingsContainer} animation={backSheetAnimation} onLayout={onLayoutHandler}>
        <Text style={styles.header}>{STRINGS.shouts.header}</Text>
        {renderedList}
      </BottomSheetContainer>
      <BottomSheetContainer animation={frontSheetAnimation}>
        {showSettings ?
          <IconButton
            wrapperStyle={styles.closeBtn}
            icon='close'
            theme='white'
            onPress={() => setShowSettings(false)}
          />
          :
          <NavBar label='' onClose={() => setOpenSheet(false)}>
            <Chip
              label={STRINGS.shouts.settingsChip.default}
              icon='settings'
              wrapperStyle={styles.chip}
              onPress={() => setShowSettings(true)}
            />
          </NavBar>
        }
        <ShoutBox
          value={shoutContent}
          setValue={setShoutContent}
          limitIndicator={limitIndicator}
          onSubmit={onSubmitHandler}
          onFocus={() => setShowSettings(false)}
        />
      </BottomSheetContainer>
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  settingsContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: COLORS.asphaltGray900,
  },
  header: {
    marginVertical: 24,
    textAlign: 'center',
    color: COLORS.justWhite,
    ...TYPOGRAPHY.subheader2,
  },
  chip: {
    marginRight: 16,
  },
  closeBtn: {
    alignSelf: 'center',
  },
  feature: {
    marginBottom: 16,
  },
});

export default NewShoutScreen;
