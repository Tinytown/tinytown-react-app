import React, { useState } from 'react';
import { NavBar, BottomSheet, ShoutBox } from 'library/components';
import { normalizeStyles } from 'res';

const ShoutLauncher = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  const onSubmitHandler = (shout) => {
    console.log(shout);
  };

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <NavBar label='' onClose={() => setOpenSheet(false)} />
      <ShoutBox onSubmit={onSubmitHandler} />
    </BottomSheet>
  );
};

const styles = normalizeStyles({});

export default ShoutLauncher;
