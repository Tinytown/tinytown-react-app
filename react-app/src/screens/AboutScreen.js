import React, { useState } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { displayName as appName, version } from 'root/app.json';
import { BottomSheet, MenuItem, MenuDivider } from 'library/components';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <View style={styles.container} >
        <Image source={IMAGES.appIcon} style={styles.image} />
        <Text style={styles.appName} >{appName}</Text>
        <Text style={styles.version} >{version}</Text>

      </View>
      <View style={styles.menuContainer} >
        <MenuDivider margin={0} />
        <MenuItem
          label={STRINGS.menuItem.feature}
          primaryIcon='lightbulb'
          secondaryIcon='openExternal'
          tall
          onPress={() => Linking.openURL(STRINGS.links.feature)}
        />
        <MenuDivider margin={0} />
        <MenuItem
          label={STRINGS.menuItem.help}
          primaryIcon='help'
          secondaryIcon='openExternal'
          tall
          onPress={() => Linking.openURL(STRINGS.links.help)}
        />
        <MenuDivider margin={0} />
        <MenuItem
          label={STRINGS.menuItem.discord}
          primaryIcon='discord'
          secondaryIcon='openExternal'
          tall
          onPress={() => Linking.openURL(STRINGS.links.discord)}
        />
        <MenuDivider margin={0} />
        <MenuItem
          label={STRINGS.menuItem.twitter}
          primaryIcon='twitter'
          secondaryIcon='openExternal'
          tall
          onPress={() => Linking.openURL(STRINGS.links.twitter)}
        />
        <MenuDivider margin={0} />
      </View>
      <Text style={styles.tagline} >{STRINGS.dialog.tagline}</Text>
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  container: {
    alignItems: 'center',
    paddingTop: 24,
  },
  menuContainer: {
    marginVertical: 16,
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
    textAlign: 'center',
    opacity: 0.4,
    ...TYPOGRAPHY.overline3,
  },
});

export default NewShoutScreen;
