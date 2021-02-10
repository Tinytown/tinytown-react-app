import React, { useState } from 'react';
import { Text } from 'react-native';
import { NavBar, BottomSheet } from 'library/components';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation, route: { params: { shout } } }) => {
  const [openSheet, setOpenSheet] = useState(true);

  console.log(shout);

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <NavBar label='' onClose={() => setOpenSheet(false)}/>
      <Text style={styles.text} >{shout.text}</Text>
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  text: {
    color: COLORS.asphaltGray800,
    marginTop: 24,
    marginBottom: 160,
    ...TYPOGRAPHY.display3,
  },
});

export default NewShoutScreen;
