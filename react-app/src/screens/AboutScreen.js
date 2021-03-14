import React, { useState, useContext } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { displayName as appName, version } from 'root/app.json';
import { Config } from 'context';
import { BottomSheet, BottomSheetContainer, MenuItem, MenuDivider } from 'library/components';
import { TYPOGRAPHY, SHAPES, IMAGES, normalizeStyles, getListContent } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const { COLORS, STRINGS } = useContext(Config.Context);
  const [openSheet, setOpenSheet] = useState(true);
  const [translateY, setTranslateY] = useState({});
  const styles = generateStyles({ COLORS });
  const aboutList = getListContent('about');

  renderedList = aboutList.map(({ key, label, primaryIcon, secondaryIcon, url }, index) => (
    <View key={key} >
      <MenuDivider margin={0} />
      <MenuItem
        label={label}
        primaryIcon={primaryIcon}
        secondaryIcon={secondaryIcon}
        tall
        onPress={() => Linking.openURL(url)}
      />
      {index === aboutList.length - 1 && <MenuDivider margin={0} />}
    </View>
  ));

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
          {renderedList}
        </View>
        <Text style={styles.tagline} >{STRINGS.core.tagline}</Text>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

const generateStyles = ({ COLORS }) => {
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
        color: COLORS.asphaltGray[800],
        ...TYPOGRAPHY.subheader2,
      },
      version: {
        color: COLORS.asphaltGray[300],
        ...TYPOGRAPHY.overline2,
      },
      tagline: {
        marginTop: 24,
        marginBottom: 16,
        color: COLORS.asphaltGray[900],
        textAlign: 'center',
        opacity: 0.4,
        ...TYPOGRAPHY.overline3,
      },
    })
  );
};

export default NewShoutScreen;
