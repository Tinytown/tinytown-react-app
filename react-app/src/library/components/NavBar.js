import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { Config } from 'context';
import { TYPOGRAPHY, normalizeStyles } from 'res';

const NavBar = ({
  label = 'Label',
  onClose = () => console.log('Pass an onClose callback to this component'),
  children,
}) => {
  const { COLORS } = useContext(Config.Context);
  const styles = generateStyles({ COLORS });

  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <IconButton icon='close' theme='lt-white-filled' onPress={onClose} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.rightSide}>
        {children}
      </View>
    </View>
  );
};

const generateStyles = ({ COLORS }) => {
  return normalizeStyles({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 56,
      marginHorizontal: -16,
    },
    leftSide: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    rightSide: {
      alignItems: 'center',
      flexDirection: 'row-reverse',
    },
    label: {
      marginLeft: 8,
      marginTop: 6,
      color: COLORS.asphaltGray[900],
      ...TYPOGRAPHY.headline5,
    },
  });
};

NavBar.propTypes = {
  label: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default NavBar;
