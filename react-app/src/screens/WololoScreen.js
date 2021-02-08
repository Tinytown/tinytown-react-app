import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { NavBar, BottomSheet, SpeechBubble } from 'library/components';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles } from 'res';

const ShoutLauncher = ({ navigation }) => {
  const [openSheet, setOpenSheet] = useState(true);

  return (
    <BottomSheet openSheet={openSheet} setOpenSheet={setOpenSheet} onClose={() => navigation.goBack()} >
      <NavBar label='' onClose={() => setOpenSheet(false)} />
      <Text
        style={styles.text}
        onPress={() => Linking.openURL('https://twitter.com/search?q=wolologang')}
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
    marginTop: 80,
    marginBottom: 40,
  },
  image: {
    left: -16,
    width: '120%',
    height: 240,
    resizeMode: 'contain',
  },
  bubbleContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    transform: [{ translateY: -48 }, { translateX: 72 }],
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
