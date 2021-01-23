import React, { useState } from 'react';
import { View } from 'react-native';
import { NavBar, BottomSheet } from 'library/components';
import { COLORS, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <NavBar label='' onClose={() => setOpenSheet(false)} />
      <View style={styles.placeholder} />
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  placeholder: {
    width: '100%',
    height: 360,
    marginVertical: 24,
    borderRadius: 8,
    backgroundColor: COLORS.snowGray,
  },
});

export default NewShoutScreen;
