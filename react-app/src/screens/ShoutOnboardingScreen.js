import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { Config, Settings } from 'context';
import { Countdown, Button, NavBar, BottomSheet, BottomSheetContainer, PromoCard } from 'library/components';
import { TYPOGRAPHY, normalizeStyles } from 'res';

const ShoutOnboardingScreen = ({ navigation, route: { params: { shout } } }) => {
  const { COLORS, STRINGS } = useContext(Config.Context);
  const { createdAt, text } = shout;
  const { settings: { notifications: notificationsEnabled } } = useContext(Settings.Context);
  const [openSheet, setOpenSheet] = useState(true);
  const [translateY, setTranslateY] = useState({});
  const styles = generateStyles({ COLORS });

  const {
    onboarding: { shoutIntro: { body } },
    features: { notifications },
    actions: { turnOn },
  } = STRINGS;

  const onPressHandler = () => {
    setOpenSheet(false);
    navigation.navigate('Settings', { onboarding: true });
  };

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
          <Text style={styles.title}>{text}</Text>
          <Text style={styles.body}>{body}</Text>
          <View style={styles.chipsContainer}>
            <Countdown timestamp={createdAt} />
          </View>
          {!notificationsEnabled &&
            <PromoCard
              wrapperStyle={styles.card}
              icon='notifications'
              title={notifications.title}
              body={notifications.body}
              theme='lt-cyan-hairline'
            >
              <Button
                label={turnOn}
                theme='lt-cyan-raised'
                onPress={onPressHandler}
                wrapperStyle={styles.turnOnbtn}
              />
            </PromoCard>}
        </View>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

const generateStyles = ({ COLORS }) => {
  return normalizeStyles({
    card: {
      marginTop: 32,
    },
    container: {
      marginTop: 24,
      marginBottom: 120,
    },
    title: {
      color: COLORS.asphaltGray[800],
      ...TYPOGRAPHY.subheader1,
    },
    body: {
      marginTop: 8,
      color: COLORS.asphaltGray[600],
      ...TYPOGRAPHY.subheader3,
    },
    chipsContainer: {
      flexDirection: 'row',
      marginTop: 24,
    },
    turnOnbtn: {
      alignSelf: 'flex-end',
      marginBottom: 16,
      marginRight: 16,
    },
  });
};

export default ShoutOnboardingScreen;
