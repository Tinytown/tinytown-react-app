import React, { useState, useEffect } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import sheetConfig from 'library/components/BottomSheet/config';
import { IconButton, NavBar, BottomSheet, BottomSheetContainer, ShoutBox, Chip } from 'library/components';
import { COLORS, TYPOGRAPHY, STRINGS, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const { ANIMATION_OFFSET } = sheetConfig;
  const [openSheet, setOpenSheet] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [sheetLayout, setSheetLayout] = useState(null);
  const [keyboardOpen, setKeyboardOpen] = useState(true);
  const frontSheetTranslateY = useSharedValue(0);
  const backSheetTranslateY = useSharedValue(0);

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

  const onLayoutHandler = (event) => {
    event.persist();
    setSheetLayout(event.nativeEvent.layout);
  };

  const onSubmitHandler = (createNewShout) => {
    createNewShout();
    navigation.goBack();
  };

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()}>
      <BottomSheetContainer style={styles.settingsContainer} animation={backSheetAnimation} onLayout={onLayoutHandler}>
        <Text style={styles.header}>{STRINGS.shouts.header}</Text>
      </BottomSheetContainer>
      <BottomSheetContainer animation={frontSheetAnimation}>
        {showSettings ?
          <IconButton
            wrapperStyle={styles.saveBtn}
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
        <ShoutBox onSubmit={onSubmitHandler} onFocus={() => setShowSettings(false)} />
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
  saveBtn: {
    alignSelf: 'center',
  },
});

export default NewShoutScreen;
