import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Divider from '../Menu/MenuDivider';
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
}) => {
  const styles = generateStyles({ keyColor, borderColor });

  return (
    <>
      <View style={styles.divider}/>
      <View style={styles.container} >
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
      </View>
    </>
  );
};

const generateStyles = ({ keyColor, borderColor }) => {
  const ICON_SIZE = 24;

  return (
    normalizeStyles({
      divider: {
        height: 2,
        marginLeft: -14,
        marginRight: -14,
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: borderColor,
      },
      container: {
        flexDirection: 'row',
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        right: 0,
      },
    })
  );
};

FeatureItem.propTypes = {

};

export default FeatureItem;
