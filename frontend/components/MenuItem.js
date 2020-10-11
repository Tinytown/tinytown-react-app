import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { typography, colors } from '../styles'
import Icon from '../assets/svg'

const Touchable =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableHighlight;


class MenuItem extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
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
          background={TouchableNativeFeedback.Ripple(colors.sidewalkGray)}
          underlayColor={colors.snowGray}
        >
          <View style={[styles.container, disabled && { opacity: colors.disabled}]}>
            <View style={styles.assetContainer}>
              <View style={styles.iconContainer}>
                <Icon icon={this.props.icon} color={colors.graniteGray}></Icon>
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


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    width: 200,
    paddingHorizontal: 8,
    overflow: 'hidden'
  },

  assetContainer: {
    alignItems: "center",
    width: 48,
    marginRight: 8
  },

  iconContainer: {
    width: 24,
    height: 24
  },

  label: {
    width: 120,
    color: colors.graniteGray,
    ...typography.subheader3
  },

});

export default MenuItem;