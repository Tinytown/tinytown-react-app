import React, { useState } from 'react';
import { Text } from 'react-native';
import { NavBar, BottomSheet, BottomSheetContainer } from 'library/components';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation, route: { params: { shout } } }) => {
  const [openSheet, setOpenSheet] = useState(true);
  const [translateY, setTranslateY] = useState({});

  return (
    <BottomSheet
      translateY={translateY}
      setTranslateY={setTranslateY}
      openSheet={openSheet}
      setOpenSheet={setOpenSheet}
      onClose={() => navigation.goBack()}
    >
      <BottomSheetContainer>
        <NavBar label='' onClose={() => setOpenSheet(false)}/>
        <Text style={styles.text} >{shout.text}</Text>
      </BottomSheetContainer>
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
