import React, { useContext } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Config } from 'context';
import Pressable from '../hoc/Pressable';
import Chip from '../Chip';
import { SHAPES, TYPOGRAPHY, Icon, normalizeStyles, getThemeStyles, resolveTheme, translateElevation } from 'res';

const FeatureCard = ({
  title = 'Feature Title',
  body = 'Feature description',
  icon,
  theme = 'lt-white-hairline',
  activeTheme = 'lt-red-hairline',
  wrapperStyle,
  disabled = false,
  toggle = false,
  loading = false,
  onPress = () => console.log('Pass an onPress callback to this component'),
  children,
}) => {
  const { STRINGS } = useContext(Config.Context);
  const styles = generateStyles({ theme, activeTheme, disabled, toggle });
  const translatedActiveTheme = translateElevation(activeTheme, 'raised');
  const { on, off } = STRINGS.core;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { theme, activeTheme, disabled: !toggle });
    }
    return child;
  });

  return (
    <View style={wrapperStyle}>
      <View style={styles.card} >
        <Pressable containerStyle={styles.content} rippleColor={styles.rippleColor} onPress={onPress}>
          <View style={styles.icon}>
            <Icon icon={icon} color={styles.iconColor}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
          <View style={styles.rightSide}>
            {loading ?
              <ActivityIndicator size='small' color={styles.iconColor} />
              :
              <Chip
                wrapperStyle={styles.chip}
                theme={toggle ? translatedActiveTheme : theme}
                label={toggle ? on : off}
                toggle={toggle}
              />
            }
          </View>
        </Pressable>
        {childrenWithProps}
      </View>
    </View>
  );
};

const generateStyles = ({ theme, activeTheme, disabled, toggle }) => {
  const ICON_SIZE = 24;
  const resolvedTheme = resolveTheme(theme, disabled, activeTheme, toggle);
  const { backgroundTheme, labelColor, auxColor1 } = getThemeStyles(resolvedTheme);
  const { iconColor, rippleColor } = getThemeStyles(activeTheme);

  return (
    { ...normalizeStyles({
      card: {
        borderRadius: SHAPES.radiusMd,
        ...backgroundTheme,
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
        color: labelColor,
        ...TYPOGRAPHY.subheader3,
      },
      body: {
        marginTop: 2,
        color: auxColor1,
        ...TYPOGRAPHY.body3,
      },
      rightSide: {
        position: 'absolute',
        top: 14,
        right: 14,
      },
    }), iconColor, rippleColor }
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([
    'lt-white-hairline',
    'dt-gray-hairline',
  ]),
  activeTheme: PropTypes.oneOf([
    'dt-twitter-hairline',
    'dt-red-hairline',
    'lt-cyan-hairline',
  ]),
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
