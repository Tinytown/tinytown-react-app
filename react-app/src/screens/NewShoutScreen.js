import React, { useState, useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import { NavBar, BottomSheet, ShoutBox, Chip } from 'library/components';
import { STRINGS, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  // Scramble coordinates for testing purposes (remove for prod build)
  const [lannMode, setLannMode] = useState(false);

  const chipProps = {
    label: lannMode ? STRINGS.chip.lannOn : STRINGS.chip.lannOff,
    theme: lannMode ? 'hairline red' : 'hairline',
  };

  useEffect(() => {
    lannMode && Toast.show(STRINGS.toast.lannMode);
  }, [lannMode]);

  const onSubmitHandler = (shout) => {

  };

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <NavBar label='' onClose={() => setOpenSheet(false)}>
        <Chip
          {...chipProps}
          icon='settings'
          wrapperStyle={styles.lann}
          onPress={() => setLannMode(!lannMode)}
        />
      </NavBar>
      <ShoutBox onSubmit={() => navigation.goBack()} />
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  lann: {
    marginRight: 16,
  },
});

export default NewShoutScreen;
