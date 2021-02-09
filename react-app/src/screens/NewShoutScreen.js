import React, { useState } from 'react';
import { NavBar, BottomSheet, ShoutBox, Chip } from 'library/components';
import { STRINGS, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <NavBar label='' onClose={() => setOpenSheet(false)}>
        <Chip label={STRINGS.chip.lannOff} icon='settings' wrapperStyle={styles.lann} />
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
