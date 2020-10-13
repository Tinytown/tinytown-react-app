/* Floating Action Button (FAB) Component
Usage: <FAB label={strings.button.gotoLocation} theme='green' icon='crosshairs' onPress={this.goToLocation} disabled={goingToLocation}/>
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Animated, Text, View } from 'react-native';
import { create } from 'library/utils/normalize.js'
import { typography, colors, shapes } from 'res';
import Icon from 'res/svg';

/* Switch styles
============================================================================= */

const getStyles = ({
  theme, branded
}) => {
  // Default Styles
  const containerStyles = [styles.container];
  const shadowStyles = [styles.shadowContainer];
  let iconColor = colors.justWhite;
  const textStyles = [styles.text];

  // Color Styles
  if (theme === 'green') {
    containerStyles.push({backgroundColor: colors.grassGreen600});
    shadowStyles.push({...shapes.elevGreen5});
    textStyles.push({color: colors.asphaltGray});
    iconColor = colors.asphaltGray;
  } else if (theme === 'blue') {
    containerStyles.push({backgroundColor: colors.skyBlue600});
    shadowStyles.push({...shapes.elevBlue5});
    textStyles.push({color: colors.asphaltGray});
    iconColor = colors.asphaltGray;
  } else if (theme === 'red') {
    containerStyles.push({backgroundColor: colors.bubblegumRed600});
    shadowStyles.push({...shapes.elevRed5});
  }

  if (branded) {
    textStyles.push({...typography.brandedButton});
  }

  return { containerStyles, shadowStyles, iconColor, textStyles };
};

/* FAB
============================================================================= */

class FAB extends React.Component {
  constructor(props) {
    super(props);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
    this.animatedValue = new Animated.Value(1);
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['green', 'blue', 'red', 'default']),
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

  handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: 0.93,
      useNativeDriver: true
    }).start()
  }
  
  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 120,
      useNativeDriver: true
    }).start()
  }

  render() {
    const {
      label,
      theme,
      branded,
      onPress,
      disabled
    } = this.props;
    const { containerStyles, shadowStyles, iconColor, textStyles } = getStyles({ theme, branded });
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
      borderRadius: shapes.radiusAll,
      overflow: 'hidden'
    }
    return (
      <View style={shadowStyles} pointerEvents='box-none'>
        <Animated.View style={animatedStyle}>
          <Pressable 
          onPress={onPress}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          disabled={disabled}
          android_ripple={{color: colors.steelGray}}
          style={containerStyles}
          >
            <View style={styles.iconContainer}>
              <Icon icon={this.props.icon} color={iconColor} />
            </View>
            <Text style={textStyles}>{label}</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */

const styles = create({
  
  // Containers
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 12,
    borderRadius: shapes.radiusAll,
    backgroundColor: colors.asphaltGray,
  },

  shadowContainer: {
    borderRadius: shapes.radiusAll,
    ...shapes.elevGray5
  },

  // Icon
  iconContainer: {
    height: 24,
    width: 24,
    marginRight: 12
  },

  // Text
  text: {
    color: colors.justWhite,
    ...typography.subheader3
  },
})

/* Export
============================================================================= */

export default FAB;