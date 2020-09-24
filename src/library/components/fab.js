import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { typography, colors, shapes } from '../../../frontend/styles'
import Icon from '../../res/svg'

const styles = StyleSheet.create({
  
  // CONTAINER STYLES
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 12,
    borderRadius: shapes.radiusAll,
    backgroundColor: colors.asphaltGray,
    ...shapes.elevGray5
  },

  containerGreen: {
    backgroundColor: colors.grassGreen600,
    ...shapes.elevGreen5
  },

  containerBlue: {
    backgroundColor: colors.skyBlue600,
    ...shapes.elevBlue5
  },

  containerRed: {
    backgroundColor: colors.bubblegumRed600,
    ...shapes.elevRed5
  },

  // ICON STYLES
  icon: {
    marginRight: 12,
  },

  // TEXT STYLES
  text: {
    bottom: 1,
    color: colors.justWhite,
    ...typography.subheader3
  },

  textGray: {
    color: colors.asphaltGray,
  },

  textBranded: {
    ...typography.brandedButton
  }
})

const getStyles = ({
  theme, branded
}) => {
  const containerStyles = [styles.container];
  const iconStyles = [styles.icon];
  const textStyles = [styles.text];
  let iconColor = colors.justWhite;

  if (theme === 'green') {
    containerStyles.push(styles.containerGreen);
    textStyles.push(styles.textGray);
    iconColor = colors.asphaltGray;
  } else if (theme === 'blue') {
    containerStyles.push(styles.containerBlue);
    textStyles.push(styles.textGray);
    iconColor = colors.asphaltGray;
  } else if (theme === 'red') {
    containerStyles.push(styles.containerRed);
  }

  if (branded) {
    textStyles.push(styles.textBranded);
  }

  return { containerStyles, iconStyles, iconColor, textStyles };
};


class FAB extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['green', 'blue', 'red']),
    branded: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    label: 'Button Label',
    theme: 'default',
    branded: false,
    disabled: false
  };

  render() {
    const {
      label,
      theme,
      branded,
      onPress,
      disabled
    } = this.props;
    const { containerStyles, iconStyles, iconColor, textStyles } = getStyles({ theme, branded });
    return (
        <TouchableOpacity onPress={onPress} style={containerStyles} disabled={disabled}>
          <Icon icon={this.props.icon} style={iconStyles} color={iconColor} />
          <Text style={textStyles}>{label}</Text>
        </TouchableOpacity>
    );
  }
}

export default FAB;