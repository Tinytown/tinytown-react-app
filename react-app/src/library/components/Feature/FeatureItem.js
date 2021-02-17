import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { normalizeStyles } from 'res';

const FeatureItem = () => {
  const styles = generateStyles();

  return (
    <View>
      <Text>Boo</Text>
    </View>
  );
};

const generateStyles = () => (normalizeStyles({}));

FeatureItem.propTypes = {

};

export default FeatureItem;
