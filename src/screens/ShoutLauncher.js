import React, { useState } from 'react';
import { NavBar, BottomSheet, ShoutBox } from 'library/components';
import { normalizeStyles } from 'res';

const ShoutLauncher = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <NavBar label='' onClose={() => setOpenSheet(false)} />
      <ShoutBox />
    </BottomSheet>
  );
};

const styles = normalizeStyles({});

export default ShoutLauncher;
