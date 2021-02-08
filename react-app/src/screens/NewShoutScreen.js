import React, { useState } from 'react';
import { NavBar, BottomSheet, ShoutBox } from 'library/components';

const NewShoutScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <NavBar label='New Shout' onClose={() => setOpenSheet(false)} />
      <ShoutBox onSubmit={() => navigation.goBack()} />
    </BottomSheet>
  );
};

export default NewShoutScreen;
