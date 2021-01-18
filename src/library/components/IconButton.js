import React from 'react';
import PropTypes from 'prop-types';
import {  View } from 'react-native';
import Pressable from './hoc/Pressable';
import { SHAPES, Icon, normalizeStyles } from 'res';

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
    } = this.props;
    return (
      <Pressable disabled={disabled} onPress={onPress} containerStyle={styles.container}>
        <View style={styles.iconContainer}>
          <Icon icon={icon} color={color} />
        </View>
      </Pressable>
    );
  }
}

const styles = normalizeStyles({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: SHAPES.radiusAll,
    overflow: 'hidden',
  },

  iconContainer: {
    width: 24,
    height: 24,
  },

});

export default IconButton;
