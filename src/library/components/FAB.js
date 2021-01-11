import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from './hoc/Pressable';
import { SHAPES, COLORS, TYPOGRAPHY, Icon, normalizeStyles } from 'res';

const FAB = ({ icon, label, theme, branded, disabled, onPress }) => {
  const getStyles = () => {
    const pressableStyles = [styles.pressable];
    const shadowStyles = [styles.shadow];
    const labelStyles = [styles.label];
    let iconColor = COLORS.justWhite;

    if (theme === 'green') {
      pressableStyles.push(styles.containerGreen);
      shadowStyles.push({ ...SHAPES.elevGreen5 });
      labelStyles.push(styles.labelGray);
      iconColor = COLORS.asphaltGray;
    } else if (theme === 'blue') {
      pressableStyles.push(styles.containerBlue);
      shadowStyles.push({ ...SHAPES.elevBlue5 });
      labelStyles.push(styles.labelGray);
      iconColor = COLORS.asphaltGray;
    } else if (theme === 'red') {
      pressableStyles.push(styles.containerRed);
      shadowStyles.push({ ...SHAPES.elevRed5 });
    }

    if (branded) {
      labelStyles.push(styles.labelBranded);
    }

    return { pressableStyles, shadowStyles, iconColor, labelStyles };
  };

  const { pressableStyles, shadowStyles, iconColor, labelStyles } = getStyles();

  return (
    <Pressable
      animationType='bounce'
      containerStyle={styles.container}
      pressableStyle={pressableStyles}
      shadowStyle={shadowStyles}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Icon icon={icon} color={iconColor} />
      </View>
      <Text style={labelStyles}>{label}</Text>
    </Pressable>
  )
}

const styles = normalizeStyles({
  pressable: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.asphaltGray,
  },

  container: {
    borderRadius: SHAPES.radiusAll,
    overflow: 'hidden',
  },

  containerGreen: {
    backgroundColor: COLORS.grassGreen600,
    ...SHAPES.elevGreen5,
  },

  containerBlue: {
    backgroundColor: COLORS.skyBlue600,
    ...SHAPES.elevBlue5,
  },

  containerRed: {
    backgroundColor: COLORS.bubblegumRed600,
    ...SHAPES.elevRed5,
  },

  shadow: {
    borderRadius: SHAPES.radiusAll,
    ...SHAPES.elevGray5,
  },

  label: {
    color: COLORS.justWhite,
    ...TYPOGRAPHY.subheader3,
  },

  labelGray: {
    color: COLORS.asphaltGray,
  },

  labelBranded: {
    ...TYPOGRAPHY.brandedButton,
  },

  iconContainer: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
});

FAB.propTypes = {
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['default', 'green', 'blue', 'red']),
  branded: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

FAB.defaultProps = {
  label: 'Button Label',
  theme: 'default',
  branded: false,
  onPress: () => console.log('Pass an onPress callback to this component'),
  disabled: false,
};

export default FAB;
