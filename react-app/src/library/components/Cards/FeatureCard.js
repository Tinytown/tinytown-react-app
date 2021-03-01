import React, { useContext } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Config } from 'context';
import Pressable from '../hoc/Pressable';
import Chip from '../Chip';
import { COLORS, SHAPES, TYPOGRAPHY, Icon, normalizeStyles, getThemeStyles } from 'res';

const FeatureCard = ({
  title = 'Feature Title',
  body = 'Feature description',
  icon,
  theme = 'hairline',
  activeColor = COLORS.justWhite,
  wrapperStyle,
  disabled = false,
  toggle = false,
  loading = false,
  onPress = () => console.log('Pass an onPress callback to this component'),
  children,
}) => {
  const { STRINGS } = useContext(Config.Context);
  const styles = generateStyles({ theme, activeColor, disabled, toggle });
  const { on, off } = STRINGS.core;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { theme, activeColor, disabled: !toggle });
    }
    return child;
  });

  return (
    <View style={wrapperStyle}>
      <View style={styles.card} >
        <Pressable containerStyle={styles.content} rippleColor={activeColor} onPress={onPress}>
          <View style={styles.icon}>
            <Icon icon={icon} color={activeColor}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
          <View style={styles.rightSide}>
            {loading ?
              <ActivityIndicator size='small' color={activeColor} />
              :
              <Chip
                wrapperStyle={styles.chip}
                theme={toggle ? 'elevated' : theme}
                label={toggle ? on : off}
                toggle={toggle}
                activeColor={activeColor}
              />
            }
          </View>
        </Pressable>
        {childrenWithProps}
      </View>
    </View>
  );
};

const generateStyles = ({ theme, activeColor, disabled, toggle }) => {
  const ICON_SIZE = 24;
  const [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      card: {
        borderRadius: SHAPES.radiusMd,
        ...backgroundTheme,
        ...(toggle && { borderColor: activeColor }),
      },
      content: {
        padding: 14,
        flexDirection: 'row',
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
      },
      textContainer: {
        marginLeft: 12,
        marginRight: 80,
      },
      title: {
        color: keyColor,
        ...TYPOGRAPHY.subheader3,
      },
      body: {
        marginTop: 2,
        color: contentColor,
        ...TYPOGRAPHY.body3,
      },
      rightSide: {
        position: 'absolute',
        top: 14,
        right: 14,
      },
    }) }
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['hairline', 'hairline dark']),
  activeColor: PropTypes.string,
  disabled: PropTypes.bool,
  toggle: PropTypes.bool,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default FeatureCard;
