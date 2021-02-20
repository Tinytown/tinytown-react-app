import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from '../hoc/Pressable';
import Chip from '../Chip';
import { COLORS, TYPOGRAPHY, Icon, normalizeStyles } from 'res';

const FeatureItem = ({
  title,
  icon,
  theme,
  activeColor,
  keyColor,
  contentColor,
  borderColor,
  toggle = false,
  onPress = () => console.log('Pass an onPress callback to this component'),
}) => {
  const styles = generateStyles({ keyColor, borderColor });

  return (
    <>
      <View style={styles.divider}/>
      <Pressable containerStyle={styles.content} keyColor={activeColor} onPress={onPress} >
        <View style={styles.icon}>
          <Icon icon={icon} color={activeColor}/>
        </View>
        <Text style={styles.title} >{title}</Text>
        <Chip
          wrapperStyle={styles.chip}
          theme={toggle ? 'elevated' : 'hairline dark'}
          label='on'
          toggle={toggle}
          activeColor={activeColor}
        />
      </Pressable>
    </>
  );
};

const generateStyles = ({ keyColor, borderColor }) => {
  const ICON_SIZE = 24;

  return (
    normalizeStyles({
      divider: {
        height: 2,
        backgroundColor: borderColor,
      },
      content: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 14,
        alignItems: 'center',
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
      },
      title: {
        marginLeft: 12,
        color: keyColor,
        ...TYPOGRAPHY.subheader4,
      },
      chip: {
        position: 'absolute',
        right: 14,
      },
    })
  );
};

FeatureItem.propTypes = {

};

export default FeatureItem;
