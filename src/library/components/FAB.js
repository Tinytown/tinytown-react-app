import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from './hoc/Pressable';
import { create } from 'library/utils/normalize.js';
import RES from 'res';

const FAB = ({ icon, label, theme, branded, disabled, onPress }) => {
  const getStyles = () => {
    const pressableStyles = [styles.pressable];
    const shadowStyles = [styles.shadow];
    const labelStyles = [styles.label];
    let iconColor = RES.COLORS.justWhite;

    if (theme === 'green') {
      pressableStyles.push(styles.containerGreen);
      shadowStyles.push({ ...RES.SHAPES.elevGreen5 });
      labelStyles.push(styles.labelGray);
      iconColor = RES.COLORS.asphaltGray;
    } else if (theme === 'blue') {
      pressableStyles.push(styles.containerBlue);
      shadowStyles.push({ ...RES.SHAPES.elevBlue5 });
      labelStyles.push(styles.labelGray);
      iconColor = RES.COLORS.asphaltGray;
    } else if (theme === 'red') {
      pressableStyles.push(styles.containerRed);
      shadowStyles.push({ ...RES.SHAPES.elevRed5 });
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
        <RES.Icon icon={icon} color={iconColor} />
      </View>
      <Text style={labelStyles}>{label}</Text>
    </Pressable>
  )
}

const styles = create({
  pressable: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 12,
    backgroundColor: RES.COLORS.asphaltGray,
  },

  container: {
    borderRadius: RES.SHAPES.radiusAll,
    overflow: 'hidden',
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

  shadow: {
    borderRadius: RES.SHAPES.radiusAll,
    ...RES.SHAPES.elevGray5,
  },

  label: {
    color: RES.COLORS.justWhite,
    ...RES.TYPOGRAPHY.subheader3,
  },

  labelGray: {
    color: RES.COLORS.asphaltGray,
  },

  labelBranded: {
    ...RES.TYPOGRAPHY.brandedButton,
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
