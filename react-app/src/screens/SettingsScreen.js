import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Config } from 'context';
import { NavBar } from 'library/components';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} >
      <NavBar label='' onClose={() => navigation.navigate('Home')}/>
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
