import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { create } from 'library/utils/normalize.js'
import RES from 'res';

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
        background={TouchableNativeFeedback.Ripple(RES.COLORS.sidewalkGray)}
        underlayColor={RES.COLORS.snowGray}
      >
        <View style={[styles.container, disabled && RES.COLORS.opacity40]}>
          <View style={styles.assetContainer}>
            <View style={styles.iconContainer}>
              <RES.Icon icon={this.props.icon} color={RES.COLORS.graniteGray}/>
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

const styles = create({
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
    color: RES.COLORS.graniteGray,
    ...RES.TYPOGRAPHY.subheader3,
  },
});

export default MenuItem;
