import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { create } from 'library/utils/normalize.js'
import { colors, shapes } from 'res'
import Icon from 'res/svg'

const Touchable =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableHighlight;


class IconButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool
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
      <View style={[styles.container, disabled && { opacity: colors.disabled}]}>
        <Touchable
          disabled={disabled}
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(colors.sidewalkGray, true)}
          underlayColor={colors.snowGray}
        >
          <View style={styles.assetContainer}>
            <View style={styles.iconContainer}>
              <Icon icon={this.props.icon} color={colors.graniteGray}></Icon>
            </View>
          </View>
        </Touchable>
      </View>
  );
  }
}

const styles = create({
  
  container: {
    borderRadius: shapes.radiusAll,
    overflow: 'hidden'
  },

  assetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48
  },

  iconContainer: {
    width: 24,
    height: 24
  },

});

export default IconButton;