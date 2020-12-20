import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Animated, Text, View } from 'react-native';
import { create } from 'library/utils/normalize.js';
import RES from 'res';

const getStyles = ({
  theme, branded,
}) => {
  const containerStyles = [styles.container];
  const shadowStyles = [styles.shadowContainer];
  const textStyles = [styles.text];
  let iconColor = RES.COLORS.justWhite;

  if (theme === 'green') {
    containerStyles.push(styles.containerGreen);
    shadowStyles.push({ ...RES.SHAPES.elevGreen5 });
    textStyles.push(styles.textGray);
    iconColor = RES.COLORS.asphaltGray;
  } else if (theme === 'blue') {
    containerStyles.push(styles.containerBlue);
    shadowStyles.push({ ...RES.SHAPES.elevBlue5 });
    textStyles.push(styles.textGray);
    iconColor = RES.COLORS.asphaltGray;
  } else if (theme === 'red') {
    containerStyles.push(styles.containerRed);
    shadowStyles.push({ ...RES.SHAPES.elevRed5 });
  }

  if (branded) {
    textStyles.push(styles.textBranded);
  }

  return { containerStyles, shadowStyles, iconColor, textStyles };
};

class FAB extends React.Component {
  constructor(props) {
    super(props);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
    this.animatedValue = new Animated.Value(1);
  }

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

  handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: 0.93,
      useNativeDriver: true,
    }).start();
  }

  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const {
      label,
      theme,
      branded,
      onPress,
      disabled,
    } = this.props;
    const { containerStyles, shadowStyles, iconColor, textStyles } = getStyles({ theme, branded });
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
      borderRadius: RES.SHAPES.radiusAll,
      overflow: 'hidden',
    };
    return (
      <View style={shadowStyles} pointerEvents='box-none'>
        <Animated.View style={animatedStyle}>
          <Pressable
            onPress={onPress}
            onPressIn={this.handlePressIn}
            onPressOut={this.handlePressOut}
            disabled={disabled}
            android_ripple={{ color: RES.COLORS.steelGray }}
            style={containerStyles}
          >
            <View style={styles.iconContainer}>
              <RES.Icon icon={this.props.icon} color={iconColor} />
            </View>
            <Text style={textStyles}>{label}</Text>
          </Pressable>
        </Animated.View>
      </View>
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

  shadowContainer: {
    position: 'absolute',
    bottom: 24,
    borderRadius: RES.SHAPES.radiusAll,
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
});

export default FAB;
