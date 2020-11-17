import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';

import { create } from 'library/utils/normalize.js'
import R from 'res/R';

// Switch styles

const getStyles = ({
  theme, branded,
}) => {
  const containerStyles = [styles.container];
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

  return { containerStyles, iconColor, textStyles };
};

// Foating Action Button (FAB)

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
    const { containerStyles, iconColor, textStyles } = getStyles({ theme, branded });
    return (
      <TouchableOpacity onPress={onPress} style={containerStyles} disabled={disabled}>
        <View style={styles.iconContainer}>
          <R.Icon icon={this.props.icon} color={iconColor}/>
        </View>
        <Text style={textStyles}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

// StyleSheet

const styles = create({

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

  iconContainer: {
    height: 24,
    width: 24,
    marginRight: 12,
  },

  text: {
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

// Export

export default FAB;
