import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { TYPOGRAPHY, SHAPES, Icon, normalizeStyles } from 'res';

const Shout = ({
  label = 'Shout Label',
  onPress,
  wrapperStyle,
}) => {
  const styles = generateStyles({ disabled });

  return (
    <View style={wrapperStyle} >
      <Pressable
        animationType={animationType}
        containerStyle={styles.container}
        keyColor={styles.keyColor}
        disabled={disabled}
        ripple={ripple}
        onPress={onPress}
      >
        {icon &&
        <View style={styles.icon}>
          <Icon icon={icon} color={styles.contentColor} />
        </View>
        }
        <Text style={styles.label}>{label}</Text>

      </Pressable>
    </View>
  );
};

const generateStyles = () => {
  return (
    normalizeStyles({
      container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: SHAPES.radiusAll,
        ...backgroundTheme,
      },
      label: {
        color: contentColor,
        ...TYPOGRAPHY.overline3,
      },
    })
  );
};

Shout.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  wrapperStyle: PropTypes.object,
};

export default Shout;
