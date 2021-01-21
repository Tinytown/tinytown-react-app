import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scrim from './Scrim';
import { COLORS, normalizeStyles } from 'res';

const ActivityOverlay = ({ showOverlay }) => {
  const insets = useSafeAreaInsets();

  return (
    showOverlay &&
      <View style={[styles.container, { top: -insets.top, bottom: -insets.bottom }]} >
        <Scrim>
          <ActivityIndicator size="large" color={COLORS.skyBlue600} />
        </Scrim>
      </View>
  );
};

const styles = normalizeStyles({
  container: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
});

ActivityOverlay.propTypes = {
  showOverlay: PropTypes.bool,
};

ActivityOverlay.defaultProps = {
  showOverlay: false,
};

export default ActivityOverlay;
