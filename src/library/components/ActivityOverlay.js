import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'library/utils/normalize.js';
import Scrim from './Scrim';
import RES from 'res';

const ActivityOverlay = ({ showOverlay }) => {
  const insets = useSafeAreaInsets();

  return (
    showOverlay &&
      <View style={[styles.container, { top: -insets.top, bottom: -insets.bottom }]} >
        <Scrim>
          <ActivityIndicator size="large" color={RES.COLORS.skyBlue600} />
        </Scrim>
      </View>
  );
};

const styles = create({
  container: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
});

export default ActivityOverlay;
