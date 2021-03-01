import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Config } from 'context';
import { NavBar, FeatureCard } from 'library/components';
import { COLORS, STRINGS, normalizeStyles } from 'res';

const SettingsScreen = ({ navigation, route: { params } }) => {
  // const { STRINGS } = useContext(Config.Context);

  const [pushNotif, setPushNotif] = useState(false);
  const [backGeo, setBackGeo] = useState(false);

  const { features: { notifications, backgroundGeo } } = STRINGS;

  useEffect(() => {
    if (params?.onboarding) {
      setPushNotif(true);
      // TODO show permissisions dialog
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} >
      <NavBar label='Settings' onClose={() => navigation.navigate('Home')}/>
      <FeatureCard
        activeColor={COLORS.poolCyan600}
        title={notifications.title}
        body={notifications.body}
        icon='notifications'
        wrapperStyle={styles.card}
        toggle={pushNotif}
        onPress={() => setPushNotif(!pushNotif)}
      />
      <FeatureCard
        activeColor={COLORS.poolCyan600}
        title={backgroundGeo.title}
        body={backgroundGeo.body}
        icon='crosshairs'
        wrapperStyle={styles.card}
        toggle={backGeo}
        onPress={() => setBackGeo(!backGeo)}
      />
    </SafeAreaView>
  );
};

const styles = normalizeStyles({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.justWhite,
  },
  card: {
    marginTop: 16,
  },
});

export default SettingsScreen;
