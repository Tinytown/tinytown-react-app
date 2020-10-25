import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({

  // CONTAINER STYLES
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 12,
    borderRadius: R.SHAPES.radiusAll,
    backgroundColor: R.COLORS.asphaltGray,
    ...R.SHAPES.elevGray5,
  },

  containerGreen: {
    backgroundColor: R.COLORS.grassGreen600,
    ...R.SHAPES.elevGreen5,
  },

  containerBlue: {
    backgroundColor: R.COLORS.skyBlue600,
    ...R.SHAPES.elevBlue5,
  },

  containerRed: {
    backgroundColor: R.COLORS.bubblegumRed600,
    ...R.SHAPES.elevRed5,
  },

  // ICON STYLES
  icon: {
    marginRight: 12,
  },

  // TEXT STYLES
  text: {
    bottom: 1,
    color: R.COLORS.justWhite,
    ...R.TYPOGRAPHY.subheader3,
  },

  textGray: {
    color: R.COLORS.asphaltGray,
  },

  textBranded: {
    ...R.TYPOGRAPHY.brandedButton,
  },
})

const getStyles = ({
  theme, branded,
}) => {
  const containerStyles = [styles.container];
  const iconStyles = [styles.icon];
  const textStyles = [styles.text];
  let iconColor = R.COLORS.justWhite;

  if (theme === 'green') {
    containerStyles.push(styles.containerGreen);
    textStyles.push(styles.textGray);
    iconColor = R.COLORS.asphaltGray;
  } else if (theme === 'blue') {
    containerStyles.push(styles.containerBlue);
    textStyles.push(styles.textGray);
    iconColor = R.COLORS.asphaltGray;
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
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    label: 'Button Label',
    theme: 'default',
    branded: false,
    disabled: false,
  };

  render() {
    const {
      label,
      theme,
      branded,
      onPress,
      disabled,
    } = this.props;
    const { containerStyles, iconStyles, iconColor, textStyles } = getStyles({ theme, branded });
    return (
      <TouchableOpacity onPress={onPress} style={containerStyles} disabled={disabled}>
        <R.Icon icon={this.props.icon} style={iconStyles} color={iconColor} />
        <Text style={textStyles}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

export default FAB;
