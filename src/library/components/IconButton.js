import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { create } from 'library/utils/normalize.js';
import RES from 'res';

const Touchable =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableHighlight;

class IconButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const {
      disabled,
      onPress,
      icon,
      color,
      style,
    } = this.props;
    return (
      <View
        style={[styles.container,
          disabled && { opacity: RES.COLORS.opacity40 },
          style]}>
        <Touchable
          disabled={disabled}
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(RES.COLORS.sidewalkGray, true)}
          underlayColor={RES.COLORS.sidewalkGray}
        >
          <View style={styles.assetContainer}>
            <View style={styles.iconContainer}>
              <RES.Icon icon={icon} color={color}/>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: RES.SHAPES.radiusAll,
    overflow: 'hidden',
  },

  assetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  iconContainer: {
    width: 24,
    height: 24,
  },

});

export default IconButton;
