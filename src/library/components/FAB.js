import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { create } from 'library/utils/normalize.js'
import RES from 'res';

const getStyles = ({
  theme, branded,
}) => {
  const containerStyles = [styles.container];
  const textStyles = [styles.text];
  let iconColor = RES.COLORS.justWhite;

  if (theme === 'green') {
    containerStyles.push(styles.containerGreen);
    textStyles.push(styles.textGray);
    iconColor = RES.COLORS.asphaltGray;
  } else if (theme === 'blue') {
    containerStyles.push(styles.containerBlue);
    textStyles.push(styles.textGray);
    iconColor = RES.COLORS.asphaltGray;
  } else if (theme === 'red') {
    containerStyles.push(styles.containerRed);
  }

  if (branded) {
    textStyles.push(styles.textBranded);
  }

  return { containerStyles, iconColor, textStyles };
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
    const { containerStyles, iconColor, textStyles } = getStyles({ theme, branded });
    return (
      <TouchableOpacity onPress={onPress} style={containerStyles} disabled={disabled}>
        <View style={styles.iconContainer}>
          <RES.Icon icon={this.props.icon} color={iconColor}/>
        </View>
        <Text style={textStyles}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = create({
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 12,
    borderRadius: RES.SHAPES.radiusAll,
    backgroundColor: RES.COLORS.asphaltGray,
    ...RES.SHAPES.elevGray5,
  },

  containerGreen: {
    backgroundColor: RES.COLORS.grassGreen600,
    ...RES.SHAPES.elevGreen5,
  },

  containerBlue: {
    backgroundColor: RES.COLORS.skyBlue600,
    ...RES.SHAPES.elevBlue5,
  },

  containerRed: {
    backgroundColor: RES.COLORS.bubblegumRed600,
    ...RES.SHAPES.elevRed5,
  },

  iconContainer: {
    height: 24,
    width: 24,
    marginRight: 12,
  },

  text: {
    color: RES.COLORS.justWhite,
    ...RES.TYPOGRAPHY.subheader3,
  },

  textGray: {
    color: RES.COLORS.asphaltGray,
  },

  textBranded: {
    ...RES.TYPOGRAPHY.brandedButton,
  },
})

export default FAB;
