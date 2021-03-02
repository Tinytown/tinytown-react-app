import React, { useContext } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Config } from 'context';
import Pressable from '../hoc/Pressable';
import Chip from '../Chip';
import { TYPOGRAPHY, Icon, normalizeStyles, getThemeStyles } from 'res';

const FeatureItem = ({
  title = 'Feature title',
  icon,
  theme = 'lt-white-hairline',
  activeTheme = 'lt-red-hairline',
  disabled = false,
  toggle = false,
  loading = false,
  onPress = () => console.log('Pass an onPress callback to this component'),
}) => {
  const { STRINGS } = useContext(Config.Context);
  const styles = generateStyles({ theme, disabled });
  const { on, off } = STRINGS.core;

  return (
    <>
      <View style={styles.divider}/>
      <Pressable
        containerStyle={styles.content}
        rippleColor={styles.keyColor}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.icon}>
          <Icon icon={icon} color={styles.keyColor}/>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightSide}>
          {loading ?
            <ActivityIndicator size='small' color={styles.keyColor} />
            :
            <Chip
              wrapperStyle={styles.chip}
              theme={toggle ? activeTheme : theme}
              label={toggle ? on : off}
              toggle={toggle}
            />
          }
        </View>
      </Pressable>
    </>
  );
};

const generateStyles = ({ theme, disabled }) => {
  const ICON_SIZE = 24;
  const { backgroundTheme, labelColor }  = getThemeStyles(theme);

  return (
    normalizeStyles({
      divider: {
        height: 2,
        backgroundColor: backgroundTheme.borderColor,
      },
      content: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 14,
        alignItems: 'center',
        ...(disabled && { opacity: 0.4 }),
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
      },
      title: {
        marginLeft: 12,
        color: labelColor,
        ...TYPOGRAPHY.subheader4,
      },
      rightSide: {
        position: 'absolute',
        right: 14,
      },
    })
  );
};

FeatureItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([
    'lt-white-hairline',
    'dt-gray-hairline',
  ]),
  activeTheme: PropTypes.oneOf([
    'dt-blue-hairline',
    'dt-red-hairline',
  ]),
  disabled: PropTypes.bool,
  toggle: PropTypes.bool,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
};

export default FeatureItem;
