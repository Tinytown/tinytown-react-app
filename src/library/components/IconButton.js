import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { create } from 'library/utils/normalize.js'
import R from 'res/R';

const Touchable =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableHighlight;

// Icon Button

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
      <View style={[styles.container, disabled && { opacity: R.COLORS.opacity40 }]}>
        <Touchable
          disabled={disabled}
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(R.COLORS.sidewalkGray, true)}
          underlayColor={R.COLORS.snowGray}
        >
          <View style={styles.assetContainer}>
            <View style={styles.iconContainer}>
              <R.Icon icon={this.props.icon} color={R.COLORS.graniteGray}/>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}

// StyleSheet

const styles = create({

  container: {
    borderRadius: R.SHAPES.radiusAll,
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

// Export

export default IconButton;
