import React, { useState, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { updateOnboarding } from 'rdx/appState';
import { Config } from 'context';
import { Countdown, Button, NavBar, BottomSheet, BottomSheetContainer, PromoCard } from 'library/components';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const ShoutOnboardingScreen = ({ navigation, shoutTimestamp, updateOnboarding }) => {
  const { STRINGS } = useContext(Config.Context);
  const [openSheet, setOpenSheet] = useState(true);
  const [translateY, setTranslateY] = useState({});

  const {
    onboarding: { shoutIntro },
    features: { notifications },
    actions: { turnOn },
  } = STRINGS;

  useEffect(() => {
    if (!shoutTimestamp) {
      updateOnboarding('shoutTimestamp', Date.now());
    }
  }, []);

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
          <View style={styles.chipsContainer} >
            <Countdown timestamp={shoutTimestamp ?? Date.now()} />
          </View>
          <PromoCard
            wrapperStyle={styles.card}
            icon='notifications'
            title={notifications.title}
            body={notifications.body}
            theme='hairline cyan'
          >
            <Button
              label={turnOn}
              theme='cyan'
              onPress={onPressHandler}
              wrapperStyle={styles.turnOnbtn}
            />
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
    marginBottom: 120,
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

const mapStateToProps = (state) => ({
  shoutTimestamp: state.app.onboarding.shoutTimestamp,
});

export default connect(mapStateToProps, { updateOnboarding })(ShoutOnboardingScreen);
