import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { mapConfig } from 'library/components/Map';
import { Countdown, NavBar, BottomSheet, BottomSheetContainer } from 'library/components';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const NotificationsScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);
  const [translateY, setTranslateY] = useState({});
  const { DAY_IN_MS, EXPIRATION_LENGTH } = mapConfig;

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
        <View style={styles.container}>
          <Text style={styles.text}>Text</Text>
          <View style={styles.chipsContainer} >
            <Countdown timestamp={Date.now() - EXPIRATION_LENGTH + DAY_IN_MS } />
          </View>
        </View>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  container: {
    marginTop: 24,
    marginBottom: 160,
  },
  chipsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  text: {
    color: COLORS.asphaltGray800,
    ...TYPOGRAPHY.display3,
  },
});

export default NotificationsScreen;
