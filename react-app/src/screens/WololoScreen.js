import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { BottomSheet, BottomSheetContainer, SpeechBubble } from 'library/components';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles } from 'res';

const ShoutLauncher = ({ navigation }) => {
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
        <Text
          style={styles.text}
          onPress={() => Linking.openURL(STRINGS.links.wololo)}
          suppressHighlighting
        >
        #wolologang
        </Text>
        <View style={styles.container} >
          <Image source={IMAGES.wololoPriests} style={styles.image} />
          <View style={styles.bubbleContainer} >
            <SpeechBubble
              wrapperStyle={styles.leftBubble}
              elevation={SHAPES.elevGray1}
              content='Wololo! Wololo!' />
            <SpeechBubble
              wrapperStyle={styles.rightBubble}
              elevation={SHAPES.elevGray1}
              content={STRINGS.secrets.wololo} />
          </View>
        </View>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  text: {
    textAlign: 'center',
    marginVertical: 40,
    color: COLORS.asphaltGray50,
    ...TYPOGRAPHY.display3,
  },
  container: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  image: {
    width: '120%',
    height: 240,
    resizeMode: 'contain',
  },
  bubbleContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    transform: [{ translateX: 8 }, { translateY: -48 }],
  },
  leftBubble: {
    maxWidth: 90,
    marginRight: 32,
  },
  rightBubble: {
    maxWidth: 170,
  },
});

export default ShoutLauncher;
