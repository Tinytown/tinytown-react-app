import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { Config } from 'context';
import { Button, NavBar, BottomSheet, BottomSheetContainer, PromoCard } from 'library/components';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const NotificationsScreen = ({ navigation }) => {
  const { STRINGS } = useContext(Config.Context);
  const [openSheet, setOpenSheet] = useState(true);
  const [translateY, setTranslateY] = useState({});

  const { onboarding: { shoutIntro, notifications }, actions: { turnOn } } = STRINGS;

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
          <Text style={styles.title}>{shoutIntro.title}</Text>
          <Text style={styles.body}>{shoutIntro.body}</Text>
          <PromoCard
            wrapperStyle={styles.card}
            icon='notifications'
            title={notifications.title}
            body={notifications.body}
            theme='hairline blue'
          >
            <View style={styles.buttonContainer}>
              <Button
                label={turnOn}
                theme='blue'
                wrapperStyle={styles.button}
                onPress={onPressHandler}
              />
            </View>
          </PromoCard>

        </View>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

const styles = normalizeStyles({
  card: {
    marginTop: 32,
  },
  container: {
    marginTop: 24,
    marginBottom: 160,
  },
  title: {
    color: COLORS.asphaltGray800,
    ...TYPOGRAPHY.subheader1,
  },
  body: {
    marginTop: 8,
    color: COLORS.asphaltGray600,
    ...TYPOGRAPHY.subheader3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 16,
  },
  button: {
    marginLeft: 8,
  },
});

export default NotificationsScreen;
