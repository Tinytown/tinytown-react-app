import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Config } from 'context';
import { useSettings } from 'library/hooks';
import { NavBar } from 'library/components';
import { COLORS, normalizeStyles } from 'res';

const SettingsScreen = ({ navigation, route: { params } }) => {
  const { STRINGS } = useContext(Config.Context);
  const { renderedList } = useSettings(params);

  return (
    <SafeAreaView style={styles.container}>
      <NavBar label={STRINGS.navigation.settings} onClose={() => navigation.navigate('HomeStack', { screen: 'Home' })}/>
      {renderedList}
    </SafeAreaView>
  );
};

const styles = normalizeStyles({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.justWhite,
  },
});

export default SettingsScreen;
