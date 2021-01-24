import React from 'react';
import { View, TextInput } from 'react-native';
import IconButton from './IconButton';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const ShoutBox = () => {
  return (
    <View style={styles.container} >
      <TextInput
        style={styles.input}
        multiline
        textAlignVertical='top'
      />
      <IconButton wrapperStyle={styles.shoutBtn} icon='megaphone' theme='super red' />
    </View>
  );
};

const styles = normalizeStyles({
  container: {
    paddingTop: 16,
    paddingBottom: 50,
  },
  input: {
    width: '100%',
    height: 158,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 8,
    backgroundColor: COLORS.snowGray,
    ...TYPOGRAPHY.subheader2,
  },
  shoutBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});

export default ShoutBox;
