import React, { useState, useEffect } from 'react';
import { Alert, Text, Keyboard } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
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
  const [twitterToggle, setTwitterToggle] = useState(false);
  const [twitterLocToggle, setTwitterLocToggle] = useState(false);
  const [lannToggle, setLannToggle] = useState(false);
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

  // Keyboard event listeners
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

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

  // Event Handlers
  const onLayoutHandler = (event) => {
    event.persist();
    setSheetLayout(event.nativeEvent.layout);
  };

  const onSubmitHandler = () => {
    createNewShout({ shoutContent }); // TODO: add megaphone settings
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

  // Render settings list
  const assignState = (key, prop) => {
    switch (key) {
    case 'twitter':
      return prop === 'toggle' ? twitterToggle : () => setTwitterToggle(!twitterToggle);
    case 'location':
      return prop === 'toggle' ? twitterLocToggle : () => setTwitterLocToggle(!twitterLocToggle);
    case 'lann':
      return prop === 'toggle' ? lannToggle : () => setLannToggle(!lannToggle);
    default:
      return;
    }
  };

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
