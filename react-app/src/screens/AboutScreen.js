import React, { useState } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { displayName as appName, version } from 'root/app.json';
import { BottomSheet, BottomSheetContainer, MenuItem, MenuDivider } from 'library/components';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);
  const [translateY, setTranslateY] = useState({});
  const styles = generateStyles();

  return (
    <BottomSheet
      translateY={translateY}
      setTranslateY={setTranslateY}
      openSheet={openSheet}
      setOpenSheet={setOpenSheet}
      onClose={() => navigation.goBack()}
    >
      <BottomSheetContainer >
        <View style={styles.appDetails} >
          <Image source={IMAGES.appIcon} style={styles.image} />
          <Text style={styles.appName} >{appName}</Text>
          <Text style={styles.version} >{version}</Text>
        </View>
        <View style={styles.menuContainer} >
          <MenuDivider margin={0} />
          <MenuItem
            label={STRINGS.social.feature}
            primaryIcon='lightbulb'
            secondaryIcon='openExternal'
            tall
            onPress={() => Linking.openURL(STRINGS.links.feature)}
          />
          <MenuDivider margin={0} />
          <MenuItem
            label={STRINGS.social.help}
            primaryIcon='help'
            secondaryIcon='openExternal'
            tall
            onPress={() => Linking.openURL(STRINGS.links.help)}
          />
          <MenuDivider margin={0} />
          <MenuItem
            label={STRINGS.social.discord}
            primaryIcon='discord'
            secondaryIcon='openExternal'
            tall
            onPress={() => Linking.openURL(STRINGS.links.discord)}
          />
          <MenuDivider margin={0} />
          <MenuItem
            label={STRINGS.social.twitter}
            primaryIcon='twitter'
            secondaryIcon='openExternal'
            tall
            onPress={() => Linking.openURL(STRINGS.links.twitter)}
          />
          <MenuDivider margin={0} />
        </View>
        <Text style={styles.tagline} >{STRINGS.core.tagline}</Text>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

const generateStyles = () => {
  return (
    normalizeStyles({
      appDetails: {
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
        marginBottom: 16,
        color: COLORS.asphaltGray900,
        textAlign: 'center',
        opacity: 0.4,
        ...TYPOGRAPHY.overline3,
      },
    })
  );
};

export default NewShoutScreen;
