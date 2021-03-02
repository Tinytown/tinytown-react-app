import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { updateAppSetting } from 'rdx/appState';
import { Config } from 'context';
import { NavBar, FeatureCard } from 'library/components';
import { COLORS, STRINGS, normalizeStyles } from 'res';

const SettingsScreen = ({
  navigation, route: { params },
  pushNotif,
  backGeo,
  updateAppSetting,
}) => {
  // const { STRINGS } = useContext(Config.Context);
  const { features: { notifications, backgroundGeo } } = STRINGS;

  useEffect(() => {
    if (params?.onboarding) {
      updateAppSetting('notifications', true);
      // TODO show permissisions dialog
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} >
      <NavBar label='Settings' onClose={() => navigation.navigate('Home')}/>
      <FeatureCard
        title={notifications.title}
        body={notifications.body}
        icon='notifications'
        activeTheme='lt-cyan-hairline'
        wrapperStyle={styles.card}
        toggle={pushNotif}
        onPress={() => updateAppSetting('notifications', !pushNotif)}
      />
      <FeatureCard
        title={backgroundGeo.title}
        body={backgroundGeo.body}
        icon='crosshairs'
        activeTheme='lt-cyan-hairline'
        wrapperStyle={styles.card}
        toggle={backGeo}
        onPress={() => updateAppSetting('backgroundGeo', !backGeo)}
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

const mapStateToProps = (state) => ({
  pushNotif: state.app.settings.notifications,
  backGeo: state.app.settings.backgroundGeo,
});

export default connect(mapStateToProps, { updateAppSetting })(SettingsScreen);
