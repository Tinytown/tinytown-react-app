import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Divider from '../Menu/MenuDivider';
import { COLORS, TYPOGRAPHY, Icon, normalizeStyles } from 'res';

const FeatureItem = ({
  title,
  icon,
  activeColor,
  keyColor,
  contentColor,
  borderColor,
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
    })
  );
};

FeatureItem.propTypes = {

};

export default FeatureItem;
