import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { displayName as appName, version } from 'root/app.json';
import { Dialog } from 'library/components';
import { COLORS, TYPOGRAPHY, SHAPES, IMAGES, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openDialog, setOpenDialog] = useState(true);

  return (
    <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog} onClose={() => navigation.goBack()} >
      <View style={styles.container} >
        <Image source={IMAGES.appIcon} style={styles.image} />
        <Text style={styles.title} >{appName}</Text>
        <Text style={styles.subtitle} >{version}</Text>
      </View>
    </Dialog>
  );
};

const styles = normalizeStyles({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: SHAPES.radiusAll,
  },
  title: {
    marginTop: 12,
    color: COLORS.asphaltGray800,
    ...TYPOGRAPHY.subheader2,
  },
  subtitle: {
    color: COLORS.asphaltGray300,
    ...TYPOGRAPHY.overline2,
  },
});

export default NewShoutScreen;
