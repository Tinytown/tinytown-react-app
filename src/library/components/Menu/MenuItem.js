import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY, Icon, normalizeStyles } from 'res';

const Touchable =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableHighlight;

class MenuItem extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    label: 'Menu item',
    disabled: false,
  };

  render() {
    const {
      label,
      disabled,
      onPress,
    } = this.props;
    return (
      <Touchable
        disabled={disabled}
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(COLORS.sidewalkGray)}
        underlayColor={COLORS.snowGray}
      >
        <View style={[styles.container, disabled && COLORS.opacity40]}>
          <View style={styles.assetContainer}>
            <View style={styles.iconContainer}>
              <Icon icon={this.props.icon} color={COLORS.graniteGray}/>
            </View>
          </View>
          <Text
            numberOfLines={1}
            style={styles.label}
          >
            {label}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = normalizeStyles({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    width: 200,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },

  assetContainer: {
    alignItems: 'center',
    width: 48,
    marginRight: 8,
  },

  iconContainer: {
    width: 24,
    height: 24,
  },

  label: {
    width: 120,
    color: COLORS.graniteGray,
    ...TYPOGRAPHY.subheader3,
  },
});

export default MenuItem;
