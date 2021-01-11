import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { COLORS, SHAPES, Icon, normalizeStyles } from 'res';

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
    } = this.props;
    return (
      <View style={[styles.container, disabled && { opacity: COLORS.opacity40 }]}>
        <Touchable
          disabled={disabled}
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(COLORS.sidewalkGray, true)}
          underlayColor={COLORS.snowGray}
        >
          <View style={styles.assetContainer}>
            <View style={styles.iconContainer}>
              <Icon icon={this.props.icon} color={COLORS.graniteGray}/>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = normalizeStyles({
  container: {
    borderRadius: SHAPES.radiusAll,
    overflow: 'hidden',
  },

  assetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
  },

  iconContainer: {
    width: 24,
    height: 24,
  },

});

export default IconButton;
