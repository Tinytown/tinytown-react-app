import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { displayName as appName, version } from 'root/app.json';
import { BottomSheet } from 'library/components';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <View style={styles.container} >
        <Image source={IMAGES.appIcon} style={styles.image} />
        <Text style={styles.appName} >{appName}</Text>
        <Text style={styles.version} >{version}</Text>
        <Text style={styles.tagline} >{STRINGS.dialog.tagline}</Text>
      </View>
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  container: {
    alignItems: 'center',
    paddingTop: 24,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: SHAPES.radiusAll,
  },
  appName: {
    marginTop: 12,
    color: COLORS.asphaltGray800,
    ...TYPOGRAPHY.subheader2,
  },
  version: {
    color: COLORS.asphaltGray300,
    ...TYPOGRAPHY.overline2,
  },
  tagline: {
    marginTop: 24,
    marginBottom: 8,
    color: COLORS.asphaltGray900,
    opacity: 0.4,
    ...TYPOGRAPHY.overline3,
  },
});

export default NewShoutScreen;
