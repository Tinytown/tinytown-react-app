import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import R from 'res/R'

const styles = StyleSheet.create({
  
  // CONTAINER STYLES
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 12,
    borderRadius: R.shapes.radiusAll,
    backgroundColor: R.colors.asphaltGray,
    ...R.shapes.elevGray5
  },

  containerGreen: {
    backgroundColor: R.colors.grassGreen600,
    ...R.shapes.elevGreen5
  },

  containerBlue: {
    backgroundColor: R.colors.skyBlue600,
    ...R.shapes.elevBlue5
  },

  containerRed: {
    backgroundColor: R.colors.bubblegumRed600,
    ...R.shapes.elevRed5
  },

  // ICON STYLES
  icon: {
    marginRight: 12,
  },

  // TEXT STYLES
  text: {
    bottom: 1,
    color: R.colors.justWhite,
    ...R.typography.subheader3
  },

  textGray: {
    color: R.colors.asphaltGray,
  },

  textBranded: {
    ...R.typography.brandedButton
  }
})

const getStyles = ({
  theme, branded
}) => {
  const containerStyles = [styles.container];
  const iconStyles = [styles.icon];
  const textStyles = [styles.text];
  let iconColor = R.colors.justWhite;

  if (theme === 'green') {
    containerStyles.push(styles.containerGreen);
    textStyles.push(styles.textGray);
    iconColor = R.colors.asphaltGray;
  } else if (theme === 'blue') {
    containerStyles.push(styles.containerBlue);
    textStyles.push(styles.textGray);
    iconColor = R.colors.asphaltGray;
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
          <R.Icon icon={this.props.icon} style={iconStyles} color={iconColor} />
          <Text style={textStyles}>{label}</Text>
        </TouchableOpacity>
    );
  }
}

export default FAB;