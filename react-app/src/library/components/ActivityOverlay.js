import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scrim from './Scrim';
import { Config } from 'context';
import { normalizeStyles } from 'res';

const ActivityOverlay = ({ showOverlay = false }) => {
  const { COLORS } = useContext(Config.Context);

  const insets = useSafeAreaInsets();

  return (
    showOverlay &&
      <View style={[styles.container, { top: -insets.top, bottom: -insets.bottom }]} >
        <Scrim>
          <ActivityIndicator size='large' color={COLORS.skyBlue[400]} />
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

export default ActivityOverlay;
