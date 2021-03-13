import React, { useState, useContext } from 'react';
import { Text } from 'react-native';
import { Config } from 'context';
import {
  IconButton,
  NavBar,
  BottomSheet,
  BottomSheetContainer,
  ShoutBox,
  Chip,
} from 'library/components';
import { useNewShout } from 'library/hooks';
import { TYPOGRAPHY, normalizeStyles } from 'res';

const NewShoutScreen = () => {
  const { COLORS, STRINGS } = useContext(Config.Context);
  const [sheetLayout, setSheetLayout] = useState(null);
  const [
    shoutBoxProps,
    content,
    state,
    animations,
    eventHandlers,
  ] = useNewShout(sheetLayout, translateY);
  const { settingsChip, renderedList } = content;
  const { closeConfirmed, onCloseConfirmHandler, onCloseHandler, onSubmitHandler } = eventHandlers;
  const { openSheet, setOpenSheet, showSettings, setShowSettings } = state;
  const { frontSheetAnimation, translateY, setTranslateY } = animations;
  const styles = generateStyles({ COLORS });

  const onLayoutHandler = (event) => {
    event.persist();
    setSheetLayout(event.nativeEvent.layout);
  };

  return (
    <BottomSheet
      translateY={translateY}
      setTranslateY={setTranslateY}
      openSheet={openSheet}
      setOpenSheet={setOpenSheet}
      onClose={onCloseHandler}
      onCloseConfirm={onCloseConfirmHandler}
      closeConfirmed={closeConfirmed}
    >
      <BottomSheetContainer style={styles.settingsContainer} onLayout={onLayoutHandler}>
        <Text style={styles.header}>{STRINGS.shouts.header}</Text>
        {renderedList}
      </BottomSheetContainer>
      <BottomSheetContainer animation={frontSheetAnimation}>
        {showSettings ?
          <IconButton
            wrapperStyle={styles.closeBtn}
            icon='close'
            theme='lt-white-filled'
            onPress={() => setShowSettings(false)}
          />
          :
          <NavBar label='' onClose={() => setOpenSheet(false)}>
            <Chip
              label={settingsChip.label}
              icon={settingsChip.icon}
              theme={settingsChip.theme}
              wrapperStyle={styles.chip}
              onPress={() => setShowSettings(true)}
            />
          </NavBar>
        }
        <ShoutBox
          shoutBoxProps={shoutBoxProps}
          onSubmit={onSubmitHandler}
          onFocus={() => setShowSettings(false)}
        />
      </BottomSheetContainer>
    </BottomSheet>
  );
};

const generateStyles = ({ COLORS }) => {
  return normalizeStyles({
    settingsContainer: {
      position: 'absolute',
      width: '100%',
      backgroundColor: COLORS.asphaltGray[900],
    },
    header: {
      marginVertical: 24,
      textAlign: 'center',
      color: COLORS.basics.justWhite,
      ...TYPOGRAPHY.subheader2,
    },
    chip: {
      marginRight: 16,
    },
    closeBtn: {
      alignSelf: 'center',
    },
  }); };

export default NewShoutScreen;
