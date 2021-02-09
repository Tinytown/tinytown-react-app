import React, { useState } from 'react';
import { NavBar, BottomSheet, ShoutBox, Chip } from 'library/components';
import { STRINGS, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);
  const [lannMode, setLannMode] = useState(false);

  const chipProps = {
    label: lannMode ? STRINGS.chip.lannOn : STRINGS.chip.lannOff,
    theme: lannMode ? 'hairline red' : 'hairline',
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
